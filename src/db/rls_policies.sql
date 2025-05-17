
-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users can read and update their own profiles
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" 
  ON profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles" 
  ON profiles FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Users can view their own admin requests
CREATE POLICY "Users can view own admin requests" 
  ON admin_requests FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can create their own admin requests
CREATE POLICY "Users can insert own admin requests" 
  ON admin_requests FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all admin requests
CREATE POLICY "Admins can view all admin requests" 
  ON admin_requests FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update admin requests
CREATE POLICY "Admins can update admin requests" 
  ON admin_requests FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Audit logs are read-only for admins
CREATE POLICY "Admins can view all audit logs" 
  ON audit_logs FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create a function to record audit logs
CREATE OR REPLACE FUNCTION public.record_audit_log(
  action TEXT,
  entity TEXT,
  entity_id TEXT,
  details JSONB
) RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO audit_logs (user_id, action, entity, entity_id, details)
  VALUES (auth.uid(), action, entity, entity_id, details)
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$;

-- Create profile update trigger for auditing
CREATE OR REPLACE FUNCTION profile_update_audit() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  PERFORM record_audit_log(
    'update',
    'profile',
    NEW.id::text,
    jsonb_build_object('changes', jsonb_diff_val(row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb))
  );
  RETURN NEW;
END;
$$;

-- Add audit trigger to profiles table
DROP TRIGGER IF EXISTS profile_audit ON profiles;

CREATE TRIGGER profile_audit
  AFTER UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION profile_update_audit();

-- Function for jsonb diff (helper for audit)
CREATE OR REPLACE FUNCTION jsonb_diff_val(val1 JSONB, val2 JSONB)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
  v RECORD;
BEGIN
  result = '{}'::JSONB;
  
  FOR v IN SELECT * FROM jsonb_each(val2)
  LOOP
    IF NOT val1 ? v.key OR val1 -> v.key <> val2 -> v.key THEN
      result = result || jsonb_build_object(v.key, v.value);
    END IF;
  END LOOP;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

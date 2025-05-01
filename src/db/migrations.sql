
-- Create a profiles table to store user profile information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  subscription_tier TEXT NOT NULL DEFAULT 'free',
  trial_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create secured policies
-- Users can read their own profile
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Only admins can view all profiles
CREATE POLICY "Admins can view all profiles" 
  ON profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to record audit logs
CREATE OR REPLACE FUNCTION record_audit_log(
  action TEXT,
  entity TEXT,
  entity_id TEXT,
  details JSONB
) RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO audit_logs (user_id, action, entity, entity_id, details)
  VALUES (auth.uid(), action, entity, entity_id, details)
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create database triggers for automatic audit logging
CREATE OR REPLACE FUNCTION profile_update_trigger() RETURNS TRIGGER AS $$
BEGIN
  PERFORM record_audit_log(
    'update',
    'profile',
    NEW.id::text,
    jsonb_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply the trigger to the profiles table
DROP TRIGGER IF EXISTS profile_audit_trigger ON profiles;
CREATE TRIGGER profile_audit_trigger
  AFTER UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION profile_update_trigger();

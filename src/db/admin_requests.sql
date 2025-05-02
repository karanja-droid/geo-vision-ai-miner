
-- Create admin_requests table to track admin access requests
CREATE TABLE IF NOT EXISTS admin_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  user_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES auth.users(id),
  notes TEXT
);

-- Enable Row Level Security
ALTER TABLE admin_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can view their own requests
CREATE POLICY "Users can view their own admin requests" 
  ON admin_requests FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can create their own requests but not edit them
CREATE POLICY "Users can create their own admin requests" 
  ON admin_requests FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Only admins can update request status
CREATE POLICY "Only admins can update admin requests" 
  ON admin_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Only admins can view all requests
CREATE POLICY "Admins can view all admin requests" 
  ON admin_requests FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Add trigger to log admin request status changes
CREATE OR REPLACE FUNCTION admin_request_audit_trigger() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status != OLD.status THEN
    PERFORM record_audit_log(
      'update',
      'admin_request',
      NEW.id::text,
      jsonb_build_object(
        'user_id', NEW.user_id,
        'old_status', OLD.status,
        'new_status', NEW.status
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER admin_request_audit
  AFTER UPDATE ON admin_requests
  FOR EACH ROW
  EXECUTE FUNCTION admin_request_audit_trigger();

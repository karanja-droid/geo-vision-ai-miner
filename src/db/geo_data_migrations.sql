
-- Enable the PostGIS extension for spatial data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create datasets table for storing metadata about uploaded geological datasets
CREATE TABLE IF NOT EXISTS datasets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  size INTEGER NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT,
  source TEXT,
  organization TEXT,
  validated BOOLEAN DEFAULT false,
  owner_id UUID REFERENCES auth.users(id),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for dataset files (can be multiple files per dataset)
CREATE TABLE IF NOT EXISTS dataset_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create geo_points table for storing geographical points
CREATE TABLE IF NOT EXISTS geo_points (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  elevation DOUBLE PRECISION,
  properties JSONB,
  geom GEOGRAPHY(POINT) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography) STORED,
  dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create data_layers table for map visualizations
CREATE TABLE IF NOT EXISTS data_layers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  visible BOOLEAN DEFAULT true,
  opacity DECIMAL(3,2) DEFAULT 1.0,
  data JSONB,
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analysis_results table
CREATE TABLE IF NOT EXISTS analysis_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  type TEXT NOT NULL,
  features JSONB,
  metadata JSONB,
  summary JSONB,
  result JSONB,
  dataset_id UUID REFERENCES datasets(id) ON DELETE SET NULL,
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mineral_prospectivity_maps table
CREATE TABLE IF NOT EXISTS mineral_prospectivity_maps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  mineral_type TEXT NOT NULL,
  confidence DECIMAL(5,2) NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  features JSONB NOT NULL,
  model_type TEXT NOT NULL,
  data_source_ids TEXT[],
  owner_id UUID REFERENCES auth.users(id),
  geom GEOGRAPHY(POLYGON)
);

-- Create organization table
CREATE TABLE IF NOT EXISTS organizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  website TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add organization_id to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);

-- Create communication channels table
CREATE TABLE IF NOT EXISTS channels (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  slack_channel TEXT,
  teams_channel TEXT
);

-- Create channel members junction table
CREATE TABLE IF NOT EXISTS channel_members (
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (channel_id, user_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content TEXT NOT NULL,
  sender_id UUID REFERENCES auth.users(id),
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  attachments TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT false,
  sent_to_slack BOOLEAN DEFAULT false,
  sent_to_teams BOOLEAN DEFAULT false
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  related_task UUID,
  workflow_triggered BOOLEAN DEFAULT false,
  sent_to_slack BOOLEAN DEFAULT false,
  sent_to_teams BOOLEAN DEFAULT false
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ai_triggered BOOLEAN DEFAULT false,
  triggered_by UUID REFERENCES auth.users(id),
  conflict_status TEXT DEFAULT 'none'
);

-- Create task assignments junction table
CREATE TABLE IF NOT EXISTS task_assignments (
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (task_id, user_id)
);

-- Create task stakeholders junction table
CREATE TABLE IF NOT EXISTS task_stakeholders (
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  organization TEXT NOT NULL,
  PRIMARY KEY (task_id, organization)
);

-- Create conflicts table
CREATE TABLE IF NOT EXISTS conflicts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'identified',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conflict stakeholders junction table
CREATE TABLE IF NOT EXISTS conflict_stakeholders (
  conflict_id UUID REFERENCES conflicts(id) ON DELETE CASCADE,
  organization TEXT NOT NULL,
  PRIMARY KEY (conflict_id, organization)
);

-- Create risk assessments table
CREATE TABLE IF NOT EXISTS risk_assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT NOT NULL,
  affected_area_id UUID REFERENCES geo_points(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create risk mitigation suggestions
CREATE TABLE IF NOT EXISTS risk_mitigation_suggestions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  risk_id UUID REFERENCES risk_assessments(id) ON DELETE CASCADE,
  suggestion TEXT NOT NULL
);

-- Create risk stakeholders junction table
CREATE TABLE IF NOT EXISTS risk_stakeholders (
  risk_id UUID REFERENCES risk_assessments(id) ON DELETE CASCADE,
  organization TEXT NOT NULL,
  PRIMARY KEY (risk_id, organization)
);

-- Create AI models table
CREATE TABLE IF NOT EXISTS models (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  target TEXT NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  last_trained TIMESTAMP WITH TIME ZONE,
  description TEXT,
  feedback_incorporated BOOLEAN DEFAULT false,
  region_specialization TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create model mineral types junction table
CREATE TABLE IF NOT EXISTS model_mineral_types (
  model_id UUID REFERENCES models(id) ON DELETE CASCADE,
  mineral_type TEXT NOT NULL,
  PRIMARY KEY (model_id, mineral_type)
);

-- Create african deposit signatures table
CREATE TABLE IF NOT EXISTS african_deposit_signatures (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  mineral_type TEXT NOT NULL,
  spectral_signature TEXT[],
  geological_indicators TEXT[],
  confidence_threshold DECIMAL(5,2) NOT NULL
);

-- Create workflows table
CREATE TABLE IF NOT EXISTS workflows (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  triggered_by TEXT NOT NULL
);

-- Create workflow steps table
CREATE TABLE IF NOT EXISTS workflow_steps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workflow step dependencies
CREATE TABLE IF NOT EXISTS workflow_step_dependencies (
  step_id UUID REFERENCES workflow_steps(id) ON DELETE CASCADE,
  depends_on_id UUID REFERENCES workflow_steps(id) ON DELETE CASCADE,
  PRIMARY KEY (step_id, depends_on_id)
);

-- Create workflow stakeholders junction table
CREATE TABLE IF NOT EXISTS workflow_stakeholders (
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
  organization TEXT NOT NULL,
  PRIMARY KEY (workflow_id, organization)
);

-- Create workflow step assignments
CREATE TABLE IF NOT EXISTS workflow_step_assignments (
  step_id UUID REFERENCES workflow_steps(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (step_id, user_id)
);

-- Create drill recommendations table
CREATE TABLE IF NOT EXISTS drill_recommendations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  location_id UUID REFERENCES geo_points(id),
  priority TEXT NOT NULL,
  expected_mineral_type TEXT NOT NULL,
  expected_grade DECIMAL(5,2) NOT NULL,
  depth INTEGER NOT NULL,
  cost_estimate DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ai_confidence DECIMAL(5,2) NOT NULL
);

-- Create shapefile validation results
CREATE TABLE IF NOT EXISTS shapefile_validation_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  file_id UUID REFERENCES dataset_files(id) ON DELETE CASCADE,
  is_valid BOOLEAN NOT NULL,
  errors TEXT[],
  warnings TEXT[],
  features INTEGER,
  crs TEXT,
  validated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE dataset_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE geo_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_layers ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE mineral_prospectivity_maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE channel_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE conflicts ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE drill_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE shapefile_validation_results ENABLE ROW LEVEL SECURITY;

-- Basic Row Level Security policies
-- Users can view their own datasets and public datasets
CREATE POLICY "Users can view own datasets and public datasets"
  ON datasets FOR SELECT
  USING (owner_id = auth.uid() OR is_public = true);

-- Users can insert their own datasets
CREATE POLICY "Users can insert own datasets"
  ON datasets FOR INSERT
  WITH CHECK (owner_id = auth.uid());

-- Users can update their own datasets
CREATE POLICY "Users can update own datasets"
  ON datasets FOR UPDATE
  USING (owner_id = auth.uid());

-- Users can delete their own datasets
CREATE POLICY "Users can delete own datasets"
  ON datasets FOR DELETE
  USING (owner_id = auth.uid());

-- Similar policies for other tables
CREATE POLICY "Users can view own data layers and those of their org"
  ON data_layers FOR SELECT
  USING (owner_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.organization_id = (
      SELECT organization_id FROM profiles WHERE id = data_layers.owner_id
    )
  ));

-- Create custom types for enums
CREATE TYPE user_role AS ENUM (
  'geologist', 
  'drill-team', 
  'government', 
  'investor', 
  'admin',
  'geological-survey',
  'mining-company',
  'remote-sensing',
  'environmental',
  'academic'
);

CREATE TYPE subscription_tier AS ENUM ('free', 'basic', 'premium');

-- Create indexes for performance optimization
CREATE INDEX idx_dataset_files_dataset_id ON dataset_files(dataset_id);
CREATE INDEX idx_geo_points_dataset_id ON geo_points(dataset_id);
CREATE INDEX idx_analysis_results_dataset_id ON analysis_results(dataset_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_messages_channel_id ON messages(channel_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);

-- Create spatial index on geo_points
CREATE INDEX idx_geo_points_geom ON geo_points USING GIST(geom);

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types for demographics
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE age_range_type AS ENUM ('18-24', '25-34', '35-44', '45-54', '55+');
CREATE TYPE industry_type AS ENUM (
  'technology',
  'marketing_advertising',
  'healthcare',
  'finance',
  'education',
  'retail',
  'manufacturing',
  'other'
);

-- Update projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS target_demographics jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS target_region text,
ADD COLUMN IF NOT EXISTS target_languages text[],
ADD COLUMN IF NOT EXISTS services text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active',
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Add validation check for demographics JSON structure
ALTER TABLE projects 
ADD CONSTRAINT valid_demographics_json 
CHECK (
  jsonb_typeof(target_demographics) = 'object' 
  AND (
    target_demographics ? 'age_ranges' 
    AND target_demographics ? 'genders'
    AND target_demographics ? 'industries'
  )
);

-- Create demographics_history table for tracking changes
CREATE TABLE IF NOT EXISTS demographics_history (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  previous_demographics jsonb,
  new_demographics jsonb,
  changed_by uuid REFERENCES auth.users(id),
  changed_at timestamptz DEFAULT now()
);

-- Create function to update projects.updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for tracking demographics changes
CREATE OR REPLACE FUNCTION log_demographics_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.target_demographics IS DISTINCT FROM NEW.target_demographics THEN
    INSERT INTO demographics_history (
      project_id,
      previous_demographics,
      new_demographics,
      changed_by
    ) VALUES (
      NEW.id,
      OLD.target_demographics,
      NEW.target_demographics,
      auth.uid()
    );
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for demographics history
CREATE TRIGGER track_demographics_changes
  AFTER UPDATE OF target_demographics ON projects
  FOR EACH ROW
  EXECUTE FUNCTION log_demographics_changes();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_target_region ON projects(target_region);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_demographics_history_project_id ON demographics_history(project_id);

-- Add RLS (Row Level Security) policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);

-- Add RLS for demographics_history
ALTER TABLE demographics_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view demographics history of their projects"
  ON demographics_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = demographics_history.project_id
      AND projects.user_id = auth.uid()
    )
  );

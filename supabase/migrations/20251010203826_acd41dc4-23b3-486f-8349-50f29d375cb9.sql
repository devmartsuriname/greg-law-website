-- Create function to update timestamps (if it doesn't exist)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create integrations_config table for storing API configurations
CREATE TABLE public.integrations_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  integration_type text NOT NULL UNIQUE,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Add comment for documentation
COMMENT ON TABLE public.integrations_config IS 'Stores configuration for external integrations (YouTube, Google Calendar, etc.)';
COMMENT ON COLUMN public.integrations_config.integration_type IS 'Type of integration: youtube, google_calendar';
COMMENT ON COLUMN public.integrations_config.config IS 'JSON configuration object containing API keys and settings';

-- Enable Row Level Security
ALTER TABLE public.integrations_config ENABLE ROW LEVEL SECURITY;

-- Admins can manage all integrations
CREATE POLICY "Admins can manage integrations"
  ON public.integrations_config
  FOR ALL
  TO authenticated
  USING (has_role('admin'::app_role))
  WITH CHECK (has_role('admin'::app_role));

-- Staff can view integrations (read-only)
CREATE POLICY "Staff can view integrations"
  ON public.integrations_config
  FOR SELECT
  TO authenticated
  USING (
    has_role('admin'::app_role) OR 
    has_role('editor'::app_role) OR 
    has_role('viewer'::app_role)
  );

-- Create trigger for updated_at
CREATE TRIGGER update_integrations_config_updated_at
  BEFORE UPDATE ON public.integrations_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_integrations_config_type ON public.integrations_config(integration_type);
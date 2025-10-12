-- Enable RLS on the backup table that was missing it
ALTER TABLE pages_backup_20251010 ENABLE ROW LEVEL SECURITY;

-- Add restrictive policy - only admins can access backup data
CREATE POLICY "Only admins can access backup data"
ON pages_backup_20251010
FOR ALL
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));
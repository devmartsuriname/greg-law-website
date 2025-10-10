-- Phase 6A: User Management - Database Schema Updates

-- Add status column to profiles (if not exists)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active' 
CHECK (status IN ('active', 'inactive'));

-- Add last_login tracking (if not exists)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_login timestamptz;

-- Drop existing limited admin policies and create comprehensive one
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Comprehensive admin policy for all operations
CREATE POLICY "Admins have full access to all profiles"
ON public.profiles
FOR ALL
TO authenticated
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

-- Prevent admin self-demotion in user_roles
CREATE POLICY "Prevent admin self-demotion"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (
  NOT (user_id = auth.uid() AND role = 'admin'::app_role)
);
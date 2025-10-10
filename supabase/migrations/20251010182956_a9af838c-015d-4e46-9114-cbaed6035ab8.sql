-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  photo_url TEXT,
  bio TEXT,
  social_links JSONB,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create policies for team_members
CREATE POLICY "Public can view published team members"
ON public.team_members
FOR SELECT
USING (published = true);

CREATE POLICY "Editors can manage team members"
ON public.team_members
FOR ALL
USING (has_role('editor'::app_role) OR has_role('admin'::app_role));

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_company TEXT,
  client_photo_url TEXT,
  testimonial_text TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for testimonials
CREATE POLICY "Public can view published testimonials"
ON public.testimonials
FOR SELECT
USING (published = true);

CREATE POLICY "Editors can manage testimonials"
ON public.testimonials
FOR ALL
USING (has_role('editor'::app_role) OR has_role('admin'::app_role));

-- Add indexes for better performance
CREATE INDEX idx_team_members_display_order ON public.team_members(display_order) WHERE published = true;
CREATE INDEX idx_testimonials_display_order ON public.testimonials(display_order) WHERE published = true;
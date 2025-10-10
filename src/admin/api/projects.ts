import { supabase } from '@/integrations/supabase/client';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  category: string;
  start_date?: string;
  end_date?: string;
  status: string;
  featured_image?: string;
  image_gallery?: string[];
  progress: number;
  featured: boolean;
  published: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const projectsService = {
  list: async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Project[];
  },

  get: async (slugOrId: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  create: async (projectData: Partial<Project>) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('projects')
      .insert({
        ...projectData,
        created_by: user?.id,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  update: async (id: string, projectData: Partial<Project>) => {
    const { data, error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  remove: async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  uploadImage: async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media-uploads')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('media-uploads')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  uploadGalleryImages: async (files: File[]) => {
    const uploadPromises = files.map(file => projectsService.uploadImage(file));
    return await Promise.all(uploadPromises);
  },
};

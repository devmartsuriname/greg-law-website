import { supabase } from '@/integrations/supabase/client';

export interface Speech {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  location?: string;
  date: string;
  category?: string;
  tags?: string[];
  youtube_url?: string;
  document_url?: string;
  featured: boolean;
  published: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const speechesService = {
  list: async () => {
    const { data, error } = await supabase
      .from('speeches')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data as Speech[];
  },

  get: async (slugOrId: string) => {
    const { data, error } = await supabase
      .from('speeches')
      .select('*')
      .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
      .single();
    
    if (error) throw error;
    return data as Speech;
  },

  create: async (speechData: Partial<Speech>) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('speeches')
      .insert({
        ...speechData,
        created_by: user?.id,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Speech;
  },

  update: async (id: string, speechData: Partial<Speech>) => {
    const { data, error } = await supabase
      .from('speeches')
      .update(speechData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Speech;
  },

  remove: async (id: string) => {
    const { error } = await supabase
      .from('speeches')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  uploadDocument: async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `speeches/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  search: async (query: string) => {
    const { data, error } = await supabase
      .from('speeches')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,content.ilike.%${query}%`)
      .eq('published', true)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data as Speech[];
  },
};

import { supabase } from '@/integrations/supabase/client';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featured_image?: string;
  category?: string;
  tags?: string[];
  published: boolean;
  featured: boolean;
  published_at?: string;
  author_id?: string;
  created_at: string;
  updated_at: string;
}

export const newsService = {
  list: async (searchTerm?: string, category?: string) => {
    let query = supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as NewsItem[];
  },

  get: async (id: string) => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as NewsItem;
  },

  create: async (newsData: Partial<NewsItem>) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    const slug = newsData.title
      ? newsData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : '';

    const { data, error } = await supabase
      .from('news')
      .insert({
        ...newsData,
        slug,
        author_id: user?.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data as NewsItem;
  },

  update: async (id: string, newsData: Partial<NewsItem>) => {
    const updateData: any = { ...newsData };
    
    if (newsData.title) {
      updateData.slug = newsData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const { data, error } = await supabase
      .from('news')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as NewsItem;
  },

  remove: async (id: string) => {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  uploadImage: async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `news/${fileName}`;

    const { data, error } = await supabase.storage
      .from('media-uploads')
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('media-uploads')
      .getPublicUrl(filePath);

    return publicUrl;
  },
};

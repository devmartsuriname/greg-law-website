import { supabase } from '@/integrations/supabase/client';

export interface PageSection {
  id: string;
  type: 'hero' | 'about' | 'services_grid' | 'features' | 'testimonials' | 'team' | 'news' | 'contact_cta' | 'text' | 'image' | 'video';
  data: Record<string, any>;
  order: number;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  sections: PageSection[];
  meta_title?: string;
  meta_description?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export const pagesService = {
  // Get all pages
  async getAll() {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data as Page[];
  },

  // Get single page by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Page;
  },

  // Get single page by slug (for frontend)
  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    return data as Page;
  },

  // Create new page
  async create(page: Partial<Page>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('pages')
      .insert({
        ...page,
        created_by: user?.id,
        updated_by: user?.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Page;
  },

  // Update existing page
  async update(id: string, updates: Partial<Page>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('pages')
      .update({
        ...updates,
        updated_by: user?.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Page;
  },

  // Delete page
  async delete(id: string) {
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Toggle publish status
  async togglePublish(id: string, published: boolean) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('pages')
      .update({
        published,
        updated_by: user?.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Page;
  },
};

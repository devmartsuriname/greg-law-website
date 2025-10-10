import { supabase } from '@/integrations/supabase/client';

export interface MediaItem {
  id: string;
  title: string;
  caption?: string;
  alt_text?: string;
  type: 'image' | 'video' | 'youtube';
  file_url?: string;
  file_path?: string;
  thumbnail_url?: string;
  youtube_id?: string;
  youtube_title?: string;
  youtube_description?: string;
  youtube_thumbnail?: string;
  youtube_published_at?: string;
  category?: string;
  tags?: string[];
  published: boolean;
  featured: boolean;
  display_order: number;
  uploaded_by?: string;
  uploaded_at: string;
}

export const mediaService = {
  list: async (type?: string, category?: string) => {
    let query = supabase
      .from('media')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (type) {
      query = query.eq('type', type);
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as MediaItem[];
  },

  get: async (id: string) => {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as MediaItem;
  },

  upload: async (file: File, metadata: Partial<MediaItem>) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `media/${fileName}`;

    // Upload file to storage
    const { error: uploadError } = await supabase.storage
      .from('media-uploads')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media-uploads')
      .getPublicUrl(filePath);

    // Create media record
    const { data, error } = await supabase
      .from('media')
      .insert({
        title: metadata.title || file.name,
        caption: metadata.caption,
        alt_text: metadata.alt_text,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        file_url: publicUrl,
        file_path: filePath,
        category: metadata.category,
        tags: metadata.tags,
        published: metadata.published ?? true,
        featured: metadata.featured ?? false,
        uploaded_by: user?.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data as MediaItem;
  },

  update: async (id: string, updates: Partial<MediaItem>) => {
    const { data, error } = await supabase
      .from('media')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as MediaItem;
  },

  remove: async (id: string) => {
    // Get file path first
    const { data: media } = await supabase
      .from('media')
      .select('file_path')
      .eq('id', id)
      .single();

    // Delete from storage if it exists
    if (media?.file_path) {
      await supabase.storage
        .from('media-uploads')
        .remove([media.file_path]);
    }

    // Delete from database
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  bulkUpload: async (files: File[], metadata: Partial<MediaItem>) => {
    const results = await Promise.allSettled(
      files.map(file => mediaService.upload(file, metadata))
    );

    return results;
  },
};

import { supabase } from '@/integrations/supabase/client';

export interface ContactItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  responded_by?: string;
  responded_at?: string;
  created_at: string;
}

export const contactsService = {
  list: async (status?: string, searchTerm?: string) => {
    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,subject.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as ContactItem[];
  },

  get: async (id: string) => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    
    // Mark as read if it's new
    if (data.status === 'new') {
      await supabase
        .from('contact_submissions')
        .update({ status: 'read' })
        .eq('id', id);
    }

    return data as ContactItem;
  },

  updateStatus: async (id: string, status: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    const updateData: any = { status };
    
    if (status === 'responded') {
      updateData.responded_by = user?.id;
      updateData.responded_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as ContactItem;
  },

  remove: async (id: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

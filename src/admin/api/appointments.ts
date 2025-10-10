import { supabase } from '@/integrations/supabase/client';

export interface AppointmentItem {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject: string;
  message: string;
  preferred_date?: string;
  preferred_time?: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
}

export const appointmentsService = {
  list: async (status?: string, searchTerm?: string) => {
    let query = supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (searchTerm) {
      query = query.or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,subject.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as AppointmentItem[];
  },

  get: async (id: string) => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as AppointmentItem;
  },

  updateStatus: async (id: string, status: string, notes?: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('appointments')
      .update({
        status,
        notes: notes || null,
        reviewed_by: user?.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as AppointmentItem;
  },

  remove: async (id: string) => {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

import { supabase } from '@/integrations/supabase/client';

export interface ServiceItem {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  category?: string;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const servicesService = {
  list: async (category?: string) => {
    let query = supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as ServiceItem[];
  },

  get: async (id: string) => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as ServiceItem;
  },

  create: async (serviceData: Partial<ServiceItem>) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Get max display_order
    const { data: maxOrderData } = await supabase
      .from('services')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1)
      .single();

    const { data, error } = await supabase
      .from('services')
      .insert({
        ...serviceData,
        display_order: serviceData.display_order ?? ((maxOrderData?.display_order || 0) + 1),
        created_by: user?.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data as ServiceItem;
  },

  update: async (id: string, serviceData: Partial<ServiceItem>) => {
    const { data, error } = await supabase
      .from('services')
      .update(serviceData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as ServiceItem;
  },

  remove: async (id: string) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  reorder: async (services: { id: string; display_order: number }[]) => {
    const updates = services.map(({ id, display_order }) =>
      supabase
        .from('services')
        .update({ display_order })
        .eq('id', id)
    );

    await Promise.all(updates);
  },
};

import { supabase } from '@/integrations/supabase/client';

export interface QuoteItem {
  id: string;
  quote_text: string;
  author_name: string;
  author_title: string;
  context?: string;
  date_spoken?: string;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const quotesService = {
  list: async () => {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data as QuoteItem[];
  },

  get: async (id: string) => {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as QuoteItem;
  },

  create: async (quoteData: Partial<QuoteItem>) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Get max display_order
    const { data: maxOrderData } = await supabase
      .from('quotes')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1)
      .single();

    const { data, error } = await supabase
      .from('quotes')
      .insert({
        ...quoteData,
        display_order: quoteData.display_order ?? ((maxOrderData?.display_order || 0) + 1),
        created_by: user?.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data as QuoteItem;
  },

  update: async (id: string, quoteData: Partial<QuoteItem>) => {
    const { data, error } = await supabase
      .from('quotes')
      .update(quoteData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as QuoteItem;
  },

  remove: async (id: string) => {
    const { error } = await supabase
      .from('quotes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  reorder: async (quotes: { id: string; display_order: number }[]) => {
    const updates = quotes.map(({ id, display_order }) =>
      supabase
        .from('quotes')
        .update({ display_order })
        .eq('id', id)
    );

    await Promise.all(updates);
  },
};

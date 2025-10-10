import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Quote {
  id: string;
  quote_text: string;
  author_name: string;
  author_title: string;
  context?: string;
  date_spoken?: string;
  featured: boolean;
  published: boolean;
  display_order: number;
}

interface UseQuotesOptions {
  featured?: boolean;
  limit?: number;
}

export const useQuotes = (options: UseQuotesOptions = {}) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('quotes')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });

        if (options.featured) {
          query = query.eq('featured', true);
        }

        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setQuotes(data as Quote[]);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching quotes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [options.featured, options.limit]);

  return { quotes, loading, error };
};

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Quote {
  id: string;
  quote_text: string;
  author_name: string;
  author_title: string;
  context?: string;
  date_spoken?: string;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface UseQuotesResult {
  quotes: Quote[];
  loading: boolean;
  error: Error | null;
}

export const useQuotes = (featured?: boolean): UseQuotesResult => {
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

        if (featured !== undefined) {
          query = query.eq('featured', featured);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setQuotes(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch quotes'));
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [featured]);

  return { quotes, loading, error };
};

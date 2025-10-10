import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PageSection {
  id: string;
  type: string;
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
}

export const usePage = (slug: string) => {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (fetchError) throw fetchError;
        setPage(data as Page);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching page:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  return { page, loading, error };
};

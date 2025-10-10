import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PageSection {
  id: string;
  type: string;
  order: number;
  data: any;
}

interface Page {
  id: string;
  slug: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  sections: PageSection[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface UsePageResult {
  page: Page | null;
  loading: boolean;
  error: Error | null;
}

export const usePage = (slug: string): UsePageResult => {
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
          .maybeSingle();

        if (fetchError) throw fetchError;

        setPage(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch page'));
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  return { page, loading, error };
};

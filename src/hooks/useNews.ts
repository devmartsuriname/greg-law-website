import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  category?: string;
  tags?: string[];
  featured: boolean;
  published: boolean;
  published_at?: string;
  author_id?: string;
  created_at: string;
  updated_at: string;
}

interface UseNewsResult {
  news: NewsArticle[];
  loading: boolean;
  error: Error | null;
}

interface UseNewsDetailResult {
  article: NewsArticle | null;
  loading: boolean;
  error: Error | null;
}

export const useNews = (limit?: number, featured?: boolean): UseNewsResult => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('news')
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false });

        if (featured !== undefined) {
          query = query.eq('featured', featured);
        }

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setNews(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch news'));
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [limit, featured]);

  return { news, loading, error };
};

export const useNewsDetail = (slug: string): UseNewsDetailResult => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('news')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .maybeSingle();

        if (fetchError) throw fetchError;

        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch article'));
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  return { article, loading, error };
};

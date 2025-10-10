import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  category?: string;
  tags?: string[];
  published: boolean;
  featured: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export const useNews = (limit?: number) => {
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

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setNews(data as NewsArticle[]);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [limit]);

  return { news, loading, error };
};

export const useNewsArticle = (slug: string) => {
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
          .single();

        if (fetchError) throw fetchError;
        setArticle(data as NewsArticle);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching article:', err);
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

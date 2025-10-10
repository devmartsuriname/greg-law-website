import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Fetch published services for dynamic homepage sections
 */
export const useDynamicServices = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data: services, error: fetchError } = await supabase
          .from('services')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });
        
        if (fetchError) throw fetchError;
        setData(services || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  return { data, loading, error };
};

/**
 * Fetch published team members for dynamic homepage sections
 * @param limit - Maximum number of team members to fetch (default: 4)
 */
export const useDynamicTeam = (limit = 4) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data: team, error: fetchError } = await supabase
          .from('team_members')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true })
          .limit(limit);
        
        if (fetchError) throw fetchError;
        setData(team || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch team members');
        console.error('Error fetching team members:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeam();
  }, [limit]);

  return { data, loading, error };
};

/**
 * Fetch published testimonials for dynamic homepage sections
 * @param limit - Maximum number of testimonials to fetch (default: 3)
 */
export const useDynamicTestimonials = (limit = 3) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data: testimonials, error: fetchError } = await supabase
          .from('testimonials')
          .select('*')
          .eq('published', true)
          .eq('featured', true)
          .order('display_order', { ascending: true })
          .limit(limit);
        
        if (fetchError) throw fetchError;
        setData(testimonials || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, [limit]);

  return { data, loading, error };
};

/**
 * Fetch published news articles for dynamic homepage sections
 * @param limit - Maximum number of news items to fetch (default: 3)
 */
export const useDynamicNews = (limit = 3) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data: news, error: fetchError } = await supabase
          .from('news')
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false })
          .limit(limit);
        
        if (fetchError) throw fetchError;
        setData(news || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [limit]);

  return { data, loading, error };
};

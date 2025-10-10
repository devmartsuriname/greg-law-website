import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  category?: string;
  featured: boolean;
  published: boolean;
  display_order: number;
}

interface UseServicesOptions {
  featured?: boolean;
  category?: string;
  limit?: number;
}

export const useServices = (options: UseServicesOptions = {}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('services')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });

        if (options.featured) {
          query = query.eq('featured', true);
        }

        if (options.category) {
          query = query.eq('category', options.category);
        }

        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setServices(data as Service[]);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [options.featured, options.category, options.limit]);

  return { services, loading, error };
};

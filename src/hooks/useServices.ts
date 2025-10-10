import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category?: string;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface UseServicesResult {
  services: Service[];
  loading: boolean;
  error: Error | null;
}

export const useServices = (limit?: number, featured?: boolean): UseServicesResult => {
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

        if (featured !== undefined) {
          query = query.eq('featured', featured);
        }

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setServices(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch services'));
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [limit, featured]);

  return { services, loading, error };
};

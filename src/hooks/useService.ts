import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ServiceDetail {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  category?: string;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useService = (id: string) => {
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .eq('published', true)
          .single();

        if (fetchError) throw fetchError;
        setService(data as ServiceDetail);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  return { service, loading, error };
};

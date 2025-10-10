import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  client_name: string;
  client_company?: string;
  client_photo_url?: string;
  testimonial_text: string;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface UseTestimonialsResult {
  testimonials: Testimonial[];
  loading: boolean;
  error: Error | null;
}

export const useTestimonials = (): UseTestimonialsResult => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('testimonials')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });

        if (fetchError) throw fetchError;

        setTestimonials(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch testimonials'));
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
};

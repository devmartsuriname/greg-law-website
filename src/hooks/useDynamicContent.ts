import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDynamicServices = () => {
  return useQuery({
    queryKey: ['services', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('published', true)
        .order('display_order');
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDynamicTeam = () => {
  return useQuery({
    queryKey: ['team_members', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('published', true)
        .order('display_order');
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useDynamicTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('published', true)
        .order('display_order');
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useDynamicNews = (limit = 3) => {
  return useQuery({
    queryKey: ['news', 'latest', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useDynamicQuotes = (limit = 1) => {
  return useQuery({
    queryKey: ['quotes', 'featured', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('display_order')
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

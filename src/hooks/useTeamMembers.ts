import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio?: string;
  photo_url?: string;
  social_links?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface UseTeamMembersResult {
  teamMembers: TeamMember[];
  loading: boolean;
  error: Error | null;
}

export const useTeamMembers = (): UseTeamMembersResult => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('team_members')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });

        if (fetchError) throw fetchError;

        setTeamMembers(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch team members'));
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return { teamMembers, loading, error };
};

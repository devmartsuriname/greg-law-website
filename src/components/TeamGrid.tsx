import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Icon } from '@iconify/react';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  photo_url?: string;
  bio?: string;
  social_links?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  display_order: number;
}

export const TeamGrid = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setMembers(data || []);
      } catch (err) {
        console.error('Error fetching team members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <section className="team-section">
        <div className="auto-container">
          <div className="text-center">Loading team...</div>
        </div>
      </section>
    );
  }

  if (members.length === 0) return null;

  return (
    <section className="team-section">
      <div className="auto-container">
        <div className="sec-title text-center">
          <div className="sub-title">Our Team</div>
          <h2>Meet Our Expert Team</h2>
        </div>

        <div className="row">
          {members.map((member) => (
            <div key={member.id} className="team-block col-lg-3 col-md-6 col-sm-12">
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image">
                    <img src={member.photo_url || '/images/team/default.jpg'} alt={member.name} />
                  </figure>
                  <div className="social-links">
                    {member.social_links?.facebook && (
                      <a href={member.social_links.facebook} target="_blank" rel="noopener noreferrer">
                        <Icon icon="mdi:facebook" width="18" />
                      </a>
                    )}
                    {member.social_links?.twitter && (
                      <a href={member.social_links.twitter} target="_blank" rel="noopener noreferrer">
                        <Icon icon="mdi:twitter" width="18" />
                      </a>
                    )}
                    {member.social_links?.linkedin && (
                      <a href={member.social_links.linkedin} target="_blank" rel="noopener noreferrer">
                        <Icon icon="mdi:linkedin" width="18" />
                      </a>
                    )}
                    {member.social_links?.instagram && (
                      <a href={member.social_links.instagram} target="_blank" rel="noopener noreferrer">
                        <Icon icon="mdi:instagram" width="18" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="info-box">
                  <h4 className="name">
                    <a href="#">{member.name}</a>
                  </h4>
                  <span className="designation">{member.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

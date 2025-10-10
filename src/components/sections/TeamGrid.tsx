import { useTeamMembers } from '@/hooks/useTeamMembers';

export default function TeamGrid() {
  const { teamMembers, loading, error } = useTeamMembers();

  if (loading) {
    return (
      <section className="team-section">
        <div className="container">
          <div className="text-center">Loading team members...</div>
        </div>
      </section>
    );
  }

  if (error || teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="team-section">
      <div className="container">
        <div className="section-title light">
          <div className="clearfix">
            <div className="pull-left">
              <div className="title">Our Team</div>
              <h3>
                We feel very proud for our <br /> great <span>achievement</span>
              </h3>
            </div>
            <div className="pull-right">
              <div className="text">
                Our experienced team is dedicated to providing exceptional service and achieving the best possible
                outcomes for our nation.
              </div>
            </div>
          </div>
        </div>

        <div className="clearfix">
          {teamMembers.map((member, index) => (
            <div key={member.id} className="team-block col-lg-3 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp" data-wow-delay={`${index * 300}ms`} data-wow-duration="1500ms">
                <div className="image">
                  <a href="#">
                    <img src={member.photo_url || '/images/resource/team-1.jpg'} alt={member.name} />
                  </a>
                </div>
                <div className="lower-content">
                  <h3>
                    <a href="#">{member.name}</a>
                  </h3>
                  <div className="designation">{member.title}</div>
                  {member.social_links && (
                    <div className="overlay-box">
                      <div className="overlay-content">
                        <div className="title">Contact info</div>
                        <ul className="social-icons">
                          {member.social_links.facebook && (
                            <li>
                              <a href={member.social_links.facebook} target="_blank" rel="noopener noreferrer">
                                <span className="fa fa-facebook"></span>
                              </a>
                            </li>
                          )}
                          {member.social_links.twitter && (
                            <li>
                              <a href={member.social_links.twitter} target="_blank" rel="noopener noreferrer">
                                <span className="fa fa-twitter"></span>
                              </a>
                            </li>
                          )}
                          {member.social_links.linkedin && (
                            <li>
                              <a href={member.social_links.linkedin} target="_blank" rel="noopener noreferrer">
                                <span className="fa fa-linkedin"></span>
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

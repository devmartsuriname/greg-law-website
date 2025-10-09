import { useState, FormEvent } from 'react';
import PageTitle from '../components/PageTitle';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstname: '',
    email: '',
    topic: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setStatus('sending');
    
    try {
      // Mock API call - TODO: Connect to actual backend or Email API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setStatus('success');
      setFormData({ firstname: '', email: '', topic: '', message: '' });
      
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <>
      <PageTitle
        title="Contact Us"
        breadcrumbs={[{ label: 'Contact Us' }]}
        metaTitle="Contact Us | Greg Law"
        metaDescription="Get in touch with our experienced legal team for a consultation"
      />

      {/* Contact Page Section */}
      <section className="contact-page-section">
        <div className="map-section">
          <div className="map-outer">
            <div 
              className="map-canvas"
              data-zoom="12"
              data-lat="-37.817085"
              data-lng="144.955631"
              data-type="roadmap"
              data-hue="#ffc400"
              data-title="Greg Law"
              data-icon-path="/images/icons/map-marker.png"
              data-content="Melbourne VIC 3000, Australia<br><a href='mailto:info@greglaw.com'>info@greglaw.com</a>"
            ></div>
          </div>
        </div>
        <div className="container">
          <div className="inner-container">
            <h2>
              Contact our support guys or make appointment <br /> with <span>our consultant</span>
            </h2>
            <div className="row clearfix">
              {/* Info Column */}
              <div className="info-column col-lg-7 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="text">
                    Please contact us using the information below. For additional information on our legal services, please visit the appropriate page on our site.
                  </div>
                  <ul className="list-style-six">
                    <li>
                      <span className="icon fa fa-building"></span> 380 St Kilda Road <br /> Melbourne VIC 3004 <br /> Australia
                    </li>
                    <li>
                      <span className="icon fa fa-fax"></span> +123 (4567) 890
                    </li>
                    <li>
                      <span className="icon fa fa-envelope-o"></span>info@greglaw.com
                    </li>
                  </ul>
                </div>
              </div>

              {/* Form Column */}
              <div className="form-column col-lg-5 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          name="firstname"
                          placeholder="Full name"
                          value={formData.firstname}
                          onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <select 
                          className="custom-select-box"
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          required
                        >
                          <option value="">Select topic</option>
                          <option value="business-law">Business Law</option>
                          <option value="family-law">Family Law</option>
                          <option value="criminal-law">Criminal Defense</option>
                          <option value="real-estate">Real Estate Law</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <textarea
                          name="message"
                          placeholder="Write your message..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <button type="submit" className="theme-btn btn-style-one" disabled={status === 'sending'}>
                          {status === 'sending' ? 'Sending...' : 'Submit'}
                        </button>
                      </div>

                      {status === 'success' && (
                        <div className="alert alert-success mt-3">Message sent successfully!</div>
                      )}
                      {status === 'error' && (
                        <div className="alert alert-danger mt-3">Failed to send message. Please try again.</div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section" style={{ backgroundImage: 'url(/images/background/5.jpg)' }}>
        <div className="container">
          <div className="row clearfix">
            <div className="column col-lg-4 col-md-6 col-sm-12">
              <h4>United States</h4>
              <ul className="list-style-seven">
                <li>
                  <span className="icon flaticon-map-1"></span> 49488 Avenida Obregon, <br /> La Quinta, CA 92253
                </li>
                <li>
                  <span className="icon flaticon-call-answer"></span> +1-(281)-813 926 <br /> +1-(281)-813 612
                </li>
                <li>
                  <span className="icon fa fa-envelope-o"></span>support@greglaw.com
                </li>
              </ul>
            </div>
            <div className="column col-lg-4 col-md-6 col-sm-12">
              <h4>Australia</h4>
              <ul className="list-style-seven">
                <li>
                  <span className="icon flaticon-map-1"></span> 380 St Kilda Road, <br /> Melbourne VIC 3004
                </li>
                <li>
                  <span className="icon flaticon-call-answer"></span> +123 (4567) 890 <br /> +123 (4567) 891
                </li>
                <li>
                  <span className="icon fa fa-envelope-o"></span>info@greglaw.com.au
                </li>
              </ul>
            </div>
            <div className="column col-lg-4 col-md-6 col-sm-12">
              <h4>United Kingdom</h4>
              <ul className="list-style-seven">
                <li>
                  <span className="icon flaticon-map-1"></span> 131 Dartmouth Street <br /> London, UK
                </li>
                <li>
                  <span className="icon flaticon-call-answer"></span> +44 20 7946 0958 <br /> +44 20 7946 0959
                </li>
                <li>
                  <span className="icon fa fa-envelope-o"></span>support@greglaw.co.uk
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

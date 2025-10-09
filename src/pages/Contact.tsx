import { useState, FormEvent } from 'react';
import PageTitle from '../components/PageTitle';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstname: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // TODO: Connect to actual backend or Email API (e.g., Resend, EmailJS)
    // For now, just mock the submission
    setStatus('sending');
    
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      setStatus('success');
      setFormData({ firstname: '', email: '', subject: '', message: '' });
      
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

      <section className="contact-page-section">
        <div className="container">
          <div className="row clearfix">
            <div className="form-column col-lg-7 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="section-title">
                  <div className="title">Contact us</div>
                  <h3>
                    Feel free to contact us <span>anytime</span>
                  </h3>
                </div>

                <div className="contact-form">
                  <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <input
                          type="text"
                          name="firstname"
                          placeholder="Your name"
                          value={formData.firstname}
                          onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                          required
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        />
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <textarea
                          name="message"
                          placeholder="Message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        ></textarea>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <button className="theme-btn btn-style-one" type="submit" disabled={status === 'sending'}>
                          {status === 'sending' ? 'Sending...' : 'Submit now'}
                        </button>
                      </div>
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

            <div className="info-column col-lg-5 col-md-12 col-sm-12">
              <div className="inner-column">
                <h3>Contact Info</h3>
                <ul className="list-style-three">
                  <li>
                    <span className="icon fa fa-phone"></span> +123 (4567) 890
                  </li>
                  <li>
                    <span className="icon fa fa-envelope"></span> contact@greglaw.com
                  </li>
                  <li>
                    <span className="icon fa fa-home"></span>123 Legal Plaza, Suite 500
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

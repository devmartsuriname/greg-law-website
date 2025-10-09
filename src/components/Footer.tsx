import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="widgets-section">
          <div className="row clearfix">
            <div className="big-column col-lg-6 col-md-12 col-sm-12">
              <div className="row clearfix">
                <div className="footer-column col-lg-7 col-md-6 col-sm-12">
                  <div className="footer-widget logo-widget">
                    <div className="logo">
                      <Link to="/">
                        <img src="/images/footer-logo.png" alt="LawSight" />
                      </Link>
                    </div>
                    <div className="text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                    </div>
                    <ul className="list-style-three">
                      <li>
                        <span className="icon fa fa-phone"></span> +123 (4567) 890
                      </li>
                      <li>
                        <span className="icon fa fa-envelope"></span> info@lawsight.com
                      </li>
                      <li>
                        <span className="icon fa fa-home"></span>380 St Kilda Road, Melbourne <br /> VIC 3004, Australia
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="footer-column col-lg-5 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget">
                    <h4>Links</h4>
                    <ul className="list-link">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/services">Services</Link>
                      </li>
                      <li>
                        <Link to="/about">About us</Link>
                      </li>
                      <li>
                        <Link to="/testimonial">Testimonials</Link>
                      </li>
                      <li>
                        <Link to="/blog">News</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="big-column col-lg-6 col-md-12 col-sm-12">
              <div className="row clearfix">
                <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget">
                    <h4>Support</h4>
                    <ul className="list-link">
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                      <li>
                        <a href="#">Submit a Ticket</a>
                      </li>
                      <li>
                        <a href="#">Visit Knowledge Base</a>
                      </li>
                      <li>
                        <a href="#">Support System</a>
                      </li>
                      <li>
                        <a href="#">Refund Policy</a>
                      </li>
                      <li>
                        <a href="#">Professional Services</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                  <div className="footer-widget gallery-widget">
                    <h4>Gallery</h4>
                    <div className="widget-content">
                      <div className="images-outer clearfix">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <figure key={num} className="image-box">
                            <a
                              href={`/images/gallery/${num}.jpg`}
                              className="lightbox-image"
                              data-fancybox="footer-gallery"
                              title="Image Title Here"
                            >
                              <img src={`/images/gallery/footer-gallery-thumb-${num}.jpg`} alt="" />
                            </a>
                          </figure>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row clearfix">
            <div className="copyright-column col-lg-6 col-md-6 col-sm-12">
              <div className="copyright">
                {new Date().getFullYear()} &copy; All rights reserved by LawSight
              </div>
            </div>

            <div className="social-column col-lg-6 col-md-6 col-sm-12">
              <ul>
                <li className="follow">Follow us: </li>
                <li>
                  <a href="#">
                    <span className="fa fa-facebook-square"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fa fa-twitter-square"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fa fa-linkedin-square"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fa fa-google-plus-square"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fa fa-rss-square"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

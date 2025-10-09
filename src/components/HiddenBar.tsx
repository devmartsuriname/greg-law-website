import { Link } from 'react-router-dom';

export default function HiddenBar() {
  return (
    <section className="hidden-bar right-align">
      <div className="hidden-bar-closer">
        <button>
          <span className="fa fa-remove"></span>
        </button>
      </div>
      <div className="hidden-bar-wrapper">
        <div className="inner-box">
          <div className="logo">
            <Link to="/">
              <img src="/images/sidebar-logo.png" alt="Greg Law" />
            </Link>
          </div>
          <div className="text">
            Professional legal services and consultation with experienced attorneys dedicated to protecting your rights and interests.
          </div>
          <ul className="list-style-four">
            <li>
              <span className="icon flaticon-house"></span> <strong>Office Location</strong>123 Legal Plaza, Suite 500
            </li>
            <li>
              <span className="icon flaticon-phone-call"></span> <strong>Call us!</strong>540-325-1523
            </li>
            <li>
              <span className="icon flaticon-talk"></span>
              <strong>Email</strong>contact@greglaw.com
            </li>
          </ul>
          <div className="lower-box">
            <ul className="social-icons">
              <li className="facebook">
                <a href="#" aria-label="Facebook">
                  <span className="fa fa-facebook"></span>
                </a>
              </li>
              <li className="twitter">
                <a href="#" aria-label="Twitter">
                  <span className="fa fa-twitter"></span>
                </a>
              </li>
              <li className="pinterest">
                <a href="#" aria-label="LinkedIn">
                  <span className="fa fa-linkedin"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

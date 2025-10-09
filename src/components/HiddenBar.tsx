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
              <img src="/images/sidebar-logo.png" alt="LawSight" />
            </Link>
          </div>
          <div className="text">
            Lorem ipsum, or lipsum as it is sometimes the known, is dummy text used in laying out print, graphic or web
            designs. The passage
          </div>
          <ul className="list-style-four">
            <li>
              <span className="icon flaticon-house"></span> <strong>Collins Street</strong>West Victoria 8007 Australia
            </li>
            <li>
              <span className="icon flaticon-phone-call"></span> <strong>Call us!</strong>124-3254-325
            </li>
            <li>
              <span className="icon flaticon-talk"></span>
              <strong>Mail address</strong>info@domain.com
            </li>
          </ul>
          <div className="lower-box">
            <ul className="social-icons">
              <li className="facebook">
                <a href="#">
                  <span className="fa fa-facebook"></span>
                </a>
              </li>
              <li className="twitter">
                <a href="#">
                  <span className="fa fa-twitter"></span>
                </a>
              </li>
              <li className="pinterest">
                <a href="#">
                  <span className="fa fa-pinterest-p"></span>
                </a>
              </li>
              <li className="vimeo">
                <a href="#">
                  <span className="fa fa-vimeo"></span>
                </a>
              </li>
            </ul>
            <a href="#" className="theme-btn buy-btn">
              Buy LawSight today!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

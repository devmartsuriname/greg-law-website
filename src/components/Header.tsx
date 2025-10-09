import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "../data/navigation";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const isActive = (path?: string, children?: typeof navigationItems) => {
    if (path && location.pathname === path) return true;
    if (children) {
      return children.some((child) => child.path === location.pathname);
    }
    return false;
  };

  return (
    <header className={`main-header ${isHome ? "header-style-two" : ""}`}>
      <div className="header-upper">
        <div className={isHome ? "outer-container" : "container"}>
          <div className="clearfix">
            <div className="pull-left logo-box">
              <div className="logo">
                <Link to="/">
                  <img src={isHome ? "/images/logo-2.png" : "/images/logo.png"} alt="LawSight" title="LawSight" />
                </Link>
              </div>
            </div>

            {isHome && (
              <div className="phone-number">
                <span className="icon flaticon-phone-call"></span> +012 (3456) 7890
              </div>
            )}

            <div className="nav-outer clearfix">
              <nav className="main-menu navbar-expand-md">
                <div className="navbar-header">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>

                <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                  <ul className="navigation clearfix">
                    {navigationItems.map((item, index) => (
                      <li
                        key={index}
                        className={`${item.children ? "dropdown" : ""} ${
                          isActive(item.path, item.children) ? "current" : ""
                        }`}
                      >
                        {item.children ? (
                          <>
                            <a href="#">{item.label}</a>
                            <ul>
                              {item.children.map((child, childIndex) => (
                                <li key={childIndex}>
                                  <Link to={child.path || "#"}>{child.label}</Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <Link to={item.path || "#"}>{item.label}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              <div className="outer-box">
                <div className="search-box-outer">
                  <div className="dropdown">
                    <button
                      className="search-box-btn dropdown-toggle"
                      type="button"
                      id="dropdownMenu1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="fa fa-search"></span>
                    </button>
                    <ul className="dropdown-menu pull-right search-panel" aria-labelledby="dropdownMenu1">
                      <li className="panel-outer">
                        <div className="form-container">
                          <form method="post" action="/blog">
                            <div className="form-group">
                              <input type="search" name="field-name" placeholder="Search Here" required />
                              <button type="submit" className="search-btn">
                                <span className="fa fa-search"></span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {!isHome && (
                  <div className="nav-toggler">
                    <div className="nav-btn hidden-bar-opener">
                      <span className="flaticon-menu"></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-header">
        <div className="container clearfix">
          <div className="logo pull-left">
            <Link to="/" className="img-responsive">
              <img src="/images/logo-small.png" alt="LawSight" title="LawSight" />
            </Link>
          </div>

          <div className="right-col pull-right">
            <nav className="main-menu navbar-expand-md">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent1"
                aria-controls="navbarSupportedContent1"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent1">
                <ul className="navigation clearfix">
                  {navigationItems.map((item, index) => (
                    <li
                      key={index}
                      className={`${item.children ? "dropdown" : ""} ${
                        isActive(item.path, item.children) ? "current" : ""
                      }`}
                    >
                      {item.children ? (
                        <>
                          <a href="#">{item.label}</a>
                          <ul>
                            {item.children.map((child, childIndex) => (
                              <li key={childIndex}>
                                <Link to={child.path || "#"}>{child.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <Link to={item.path || "#"}>{item.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

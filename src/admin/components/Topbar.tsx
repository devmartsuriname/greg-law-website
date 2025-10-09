import { useNavigate } from 'react-router-dom';
import { Container, Dropdown } from 'react-bootstrap';
import LeftSideBarToggle from './LeftSideBarToggle';
import ThemeModeToggle from './ThemeModeToggle';
import IconifyIcon from './wrapper/IconifyIcon';

export const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <header className="app-topbar">
      <div>
        <Container fluid>
          <div className="navbar-header">
            <div className="d-flex align-items-center gap-2">
              <LeftSideBarToggle />
              <form className="app-search d-none d-md-block me-auto">
                <div className="position-relative">
                  <input type="search" className="form-control" placeholder="Search..." autoComplete="off" />
                  <IconifyIcon icon="solar:magnifer-outline" className="search-widget-icon" />
                </div>
              </form>
            </div>
            
            <div className="d-flex align-items-center gap-2">
              <ThemeModeToggle />
              <Dropdown className="topbar-item">
                <Dropdown.Toggle
                  as={'button'}
                  type="button"
                  className="topbar-button"
                  id="page-header-user-dropdown"
                >
                  <IconifyIcon icon="mingcute:user-3-line" className="fs-22 align-middle" />
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={handleLogout}>
                    <IconifyIcon icon="mingcute:exit-line" className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

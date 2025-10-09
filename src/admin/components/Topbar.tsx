import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { Icon } from '@iconify/react';

export const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="app-topbar">
      <div className="navbar-header">
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="btn btn-sm btn-icon topbar-button"
            id="sidebar-toggle"
          >
            <Icon icon="mingcute:menu-line" width={24} />
          </button>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Dropdown align="end">
            <Dropdown.Toggle
              as="button"
              className="btn btn-sm btn-icon topbar-button"
            >
              <Icon icon="mingcute:user-3-line" width={20} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/admin/settings">
                <Icon icon="mingcute:settings-3-line" className="me-2" />
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <Icon icon="mingcute:exit-line" className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

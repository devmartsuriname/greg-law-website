import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

const menuItems = [
  { icon: 'mingcute:home-3-line', label: 'Dashboard', path: '/admin' },
  { icon: 'mingcute:news-line', label: 'News', path: '/admin/news' },
  { icon: 'mingcute:briefcase-line', label: 'Projects', path: '/admin/projects' },
  { icon: 'mingcute:mic-line', label: 'Speeches', path: '/admin/speeches' },
  { icon: 'mingcute:pic-line', label: 'Media', path: '/admin/media' },
  { icon: 'mingcute:user-3-line', label: 'Users', path: '/admin/users' },
  { icon: 'mingcute:menu-line', label: 'Menus', path: '/admin/menus' },
  { icon: 'mingcute:settings-3-line', label: 'Settings', path: '/admin/settings' },
];

export const Sidebar = () => {
  return (
    <div className="app-sidebar">
      <div className="logo-box">
        <a href="/admin" className="logo text-center d-block py-3">
          <span className="logo-lg">
            <h4 className="text-white mb-0">Law Admin</h4>
          </span>
        </a>
      </div>

      <div className="scrollbar" data-simplebar>
        <ul className="menu">
          {menuItems.map((item) => (
            <li key={item.path} className="menu-item">
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `menu-link ${isActive ? 'active' : ''}`
                }
              >
                <Icon icon={item.icon} className="menu-icon" />
                <span className="menu-text">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

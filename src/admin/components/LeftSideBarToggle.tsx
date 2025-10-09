import IconifyIcon from './wrapper/IconifyIcon';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LeftSideBarToggle = () => {
  const { pathname } = useLocation();
  const [sidebarSize, setSidebarSize] = useState<'default' | 'condensed' | 'hidden'>('default');

  const handleMenuSize = () => {
    if (sidebarSize === 'condensed') {
      setSidebarSize('default');
      document.documentElement.removeAttribute('data-sidebar-size');
    } else {
      setSidebarSize('condensed');
      document.documentElement.setAttribute('data-sidebar-size', 'condensed');
    }
  };

  useEffect(() => {
    // Responsive behavior
    const handleResize = () => {
      if (window.innerWidth <= 1140) {
        if (sidebarSize !== 'hidden') {
          setSidebarSize('hidden');
          document.documentElement.setAttribute('data-sidebar-size', 'hidden');
        }
      } else {
        if (sidebarSize === 'hidden') {
          setSidebarSize('default');
          document.documentElement.removeAttribute('data-sidebar-size');
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname, sidebarSize]);

  return (
    <div className="topbar-item">
      <button type="button" onClick={handleMenuSize} className="button-toggle-menu topbar-button">
        <IconifyIcon icon="solar:hamburger-menu-outline" width={24} height={24} className="fs-24 align-middle" />
      </button>
    </div>
  );
};

export default LeftSideBarToggle;

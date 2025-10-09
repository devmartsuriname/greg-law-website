import IconifyIcon from './wrapper/IconifyIcon';
import { useLayoutContext } from '../context/LayoutContext';

const ThemeModeToggle = () => {
  const { theme, changeTheme } = useLayoutContext();
  const isDark = theme === 'dark';

  return (
    <div className="topbar-item">
      <button
        type="button"
        onClick={() => changeTheme(isDark ? 'light' : 'dark')}
        className="topbar-button"
        id="light-dark-mode"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <IconifyIcon icon="ri:sun-line" className="fs-22" />
        ) : (
          <IconifyIcon icon="ri:moon-line" className="fs-22" />
        )}
      </button>
    </div>
  );
};

export default ThemeModeToggle;

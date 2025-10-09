import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Multiple safety nets to hide preloader
    const hidePreloader = () => {
      setIsVisible(false);
    };

    // Hide after content loads
    const timer = setTimeout(hidePreloader, 500);

    // Also hide on window load
    window.addEventListener('load', hidePreloader);

    // Failsafe: always hide after 3 seconds max
    const failsafe = setTimeout(hidePreloader, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(failsafe);
      window.removeEventListener('load', hidePreloader);
    };
  }, []);

  if (!isVisible) return null;

  return <div className="preloader" id="preloader"></div>;
}

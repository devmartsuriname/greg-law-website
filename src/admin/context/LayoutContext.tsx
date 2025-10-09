import { createContext, useContext, useEffect, useMemo, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { toggleDocumentAttribute } from '../utils/layout';

export type ThemeType = 'light' | 'dark';

export type MenuType = {
  theme: ThemeType;
  size: 'default' | 'condensed' | 'hidden';
};

export type LayoutState = {
  theme: ThemeType;
  topbarTheme: ThemeType;
  menu: MenuType;
};

export type LayoutType = LayoutState & {
  changeTheme: (theme: ThemeType) => void;
  changeTopbarTheme: (theme: ThemeType) => void;
  changeMenu: {
    theme: (theme: MenuType['theme']) => void;
    size: (size: MenuType['size']) => void;
  };
};

const LayoutContext = createContext<LayoutType | undefined>(undefined);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within LayoutProvider');
  }
  return context;
};

const INIT_STATE: LayoutState = {
  theme: 'light',
  topbarTheme: 'light',
  menu: {
    theme: 'dark',
    size: 'default',
  },
};

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useLocalStorage<LayoutState>('__ADMIN_LAYOUT_CONFIG__', INIT_STATE);

  const updateSettings = (newSettings: Partial<LayoutState>) => {
    setSettings({ ...settings, ...newSettings });
  };

  const changeTheme = (newTheme: ThemeType) => {
    updateSettings({ theme: newTheme });
  };

  const changeTopbarTheme = (newTheme: ThemeType) => {
    updateSettings({ topbarTheme: newTheme });
  };

  const changeMenuTheme = (newTheme: MenuType['theme']) => {
    updateSettings({ menu: { ...settings.menu, theme: newTheme } });
  };

  const changeMenuSize = (newSize: MenuType['size']) => {
    updateSettings({ menu: { ...settings.menu, size: newSize } });
  };

  useEffect(() => {
    toggleDocumentAttribute('data-bs-theme', settings.theme);
    toggleDocumentAttribute('data-topbar-color', settings.topbarTheme);
    toggleDocumentAttribute('data-sidebar-color', settings.menu.theme);
    toggleDocumentAttribute('data-sidebar-size', settings.menu.size);

    return () => {
      toggleDocumentAttribute('data-bs-theme', settings.theme, true);
      toggleDocumentAttribute('data-topbar-color', settings.topbarTheme, true);
      toggleDocumentAttribute('data-sidebar-color', settings.menu.theme, true);
      toggleDocumentAttribute('data-sidebar-size', settings.menu.size, true);
    };
  }, [settings]);

  return (
    <LayoutContext.Provider
      value={useMemo(
        () => ({
          ...settings,
          changeTheme,
          changeTopbarTheme,
          changeMenu: {
            theme: changeMenuTheme,
            size: changeMenuSize,
          },
        }),
        [settings],
      )}
    >
      {children}
    </LayoutContext.Provider>
  );
};

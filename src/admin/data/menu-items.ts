import { MenuItemType } from '../types/menu';

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'menu',
    label: 'MENU',
    isTitle: true,
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'mingcute:home-3-line',
    url: '/admin',
  },
  {
    key: 'content',
    label: 'CONTENT',
    isTitle: true,
  },
  {
    key: 'news',
    label: 'News',
    icon: 'mingcute:news-line',
    url: '/admin/news',
  },
  {
    key: 'projects',
    label: 'Projects',
    icon: 'mingcute:briefcase-line',
    url: '/admin/projects',
  },
  {
    key: 'speeches',
    label: 'Speeches',
    icon: 'mingcute:mic-line',
    url: '/admin/speeches',
  },
  {
    key: 'media',
    label: 'Media Library',
    icon: 'mingcute:pic-line',
    url: '/admin/media',
  },
  {
    key: 'system',
    label: 'SYSTEM',
    isTitle: true,
  },
  {
    key: 'users',
    label: 'Users',
    icon: 'mingcute:user-3-line',
    url: '/admin/users',
  },
  {
    key: 'menus',
    label: 'Menus',
    icon: 'mingcute:menu-line',
    url: '/admin/menus',
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: 'mingcute:settings-3-line',
    url: '/admin/settings',
  },
];

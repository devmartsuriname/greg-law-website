export interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

export const navigationItems: NavItem[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'About Us',
    path: '/about',
  },
  {
    label: 'Services',
    children: [
      { label: 'Services', path: '/services' },
      { label: 'Services Detail', path: '/services/business-law' },
    ],
  },
  {
    label: 'Portfolio',
    children: [
      { label: 'Portfolio Single', path: '/portfolio/1' },
    ],
  },
  {
    label: 'Blog',
    children: [
      { label: 'Blog List', path: '/blog' },
      { label: 'Blog Single', path: '/blog/sample-post' },
    ],
  },
  {
    label: 'Contact us',
    path: '/contact',
  },
];

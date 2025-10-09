export interface MenuItem {
  id: string;
  label: string;
  url: string;
  order: number;
  parentId?: string;
  published: boolean;
}

const mockMenus: MenuItem[] = [
  {
    id: '1',
    label: 'Home',
    url: '/',
    order: 1,
    published: true,
  },
  {
    id: '2',
    label: 'About',
    url: '/about',
    order: 2,
    published: true,
  },
  {
    id: '3',
    label: 'Services',
    url: '/services',
    order: 3,
    published: true,
  },
];

export const menusService = {
  list: async () => {
    return new Promise<MenuItem[]>((resolve) => {
      setTimeout(() => resolve(mockMenus), 300);
    });
  },

  update: async (items: MenuItem[]) => {
    return new Promise<MenuItem[]>((resolve) => {
      setTimeout(() => {
        mockMenus.splice(0, mockMenus.length, ...items);
        resolve(mockMenus);
      }, 300);
    });
  },

  create: async (data: Partial<MenuItem>) => {
    return new Promise<MenuItem>((resolve) => {
      setTimeout(() => {
        const newItem: MenuItem = {
          id: String(mockMenus.length + 1),
          ...data,
          order: mockMenus.length + 1,
          published: data.published || false,
        } as MenuItem;
        mockMenus.push(newItem);
        resolve(newItem);
      }, 300);
    });
  },

  remove: async (id: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = mockMenus.findIndex((m) => m.id === id);
        if (index !== -1) mockMenus.splice(index, 1);
        resolve();
      }, 300);
    });
  },
};

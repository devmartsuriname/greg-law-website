export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@lawfirm.com',
    name: 'Admin User',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    email: 'editor@lawfirm.com',
    name: 'Content Editor',
    role: 'editor',
    status: 'active',
    createdAt: '2024-01-05T00:00:00Z',
    lastLogin: '2024-01-14T14:20:00Z',
  },
];

export const usersService = {
  list: async () => {
    return new Promise<User[]>((resolve) => {
      setTimeout(() => resolve(mockUsers), 300);
    });
  },

  get: async (id: string) => {
    return new Promise<User | undefined>((resolve) => {
      setTimeout(() => resolve(mockUsers.find((u) => u.id === id)), 300);
    });
  },

  create: async (data: Partial<User>) => {
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: String(mockUsers.length + 1),
          ...data,
          status: 'active',
          createdAt: new Date().toISOString(),
        } as User;
        mockUsers.push(newUser);
        resolve(newUser);
      }, 300);
    });
  },

  update: async (id: string, data: Partial<User>) => {
    return new Promise<User | undefined>((resolve) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((u) => u.id === id);
        if (index !== -1) {
          mockUsers[index] = { ...mockUsers[index], ...data };
          resolve(mockUsers[index]);
        }
        resolve(undefined);
      }, 300);
    });
  },

  remove: async (id: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((u) => u.id === id);
        if (index !== -1) mockUsers.splice(index, 1);
        resolve();
      }, 300);
    });
  },
};

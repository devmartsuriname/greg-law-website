export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  client: string;
  date: string;
  website?: string;
  image?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Corporate Merger Case',
    description: 'Successfully represented client in major merger...',
    category: 'Business',
    client: 'Tech Corp Inc.',
    date: '2024-01-15',
    published: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
];

export const projectsService = {
  list: async () => {
    return new Promise<Project[]>((resolve) => {
      setTimeout(() => resolve(mockProjects), 300);
    });
  },

  get: async (id: string) => {
    return new Promise<Project | undefined>((resolve) => {
      setTimeout(() => resolve(mockProjects.find((p) => p.id === id)), 300);
    });
  },

  create: async (data: Partial<Project>) => {
    return new Promise<Project>((resolve) => {
      setTimeout(() => {
        const newProject: Project = {
          id: String(mockProjects.length + 1),
          ...data,
          published: data.published || false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Project;
        mockProjects.push(newProject);
        resolve(newProject);
      }, 300);
    });
  },

  update: async (id: string, data: Partial<Project>) => {
    return new Promise<Project | undefined>((resolve) => {
      setTimeout(() => {
        const index = mockProjects.findIndex((p) => p.id === id);
        if (index !== -1) {
          mockProjects[index] = {
            ...mockProjects[index],
            ...data,
            updatedAt: new Date().toISOString(),
          };
          resolve(mockProjects[index]);
        }
        resolve(undefined);
      }, 300);
    });
  },

  remove: async (id: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = mockProjects.findIndex((p) => p.id === id);
        if (index !== -1) mockProjects.splice(index, 1);
        resolve();
      }, 300);
    });
  },
};

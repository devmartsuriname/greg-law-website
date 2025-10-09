export interface Speech {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  location: string;
  date: string;
  videoUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockSpeeches: Speech[] = [
  {
    id: '1',
    title: 'Annual Legal Conference Keynote',
    content: 'Full speech transcript...',
    excerpt: 'Keynote address on the future of law...',
    location: 'New York, NY',
    date: '2024-01-20',
    published: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
  },
];

export const speechesService = {
  list: async () => {
    return new Promise<Speech[]>((resolve) => {
      setTimeout(() => resolve(mockSpeeches), 300);
    });
  },

  get: async (id: string) => {
    return new Promise<Speech | undefined>((resolve) => {
      setTimeout(() => resolve(mockSpeeches.find((s) => s.id === id)), 300);
    });
  },

  create: async (data: Partial<Speech>) => {
    return new Promise<Speech>((resolve) => {
      setTimeout(() => {
        const newSpeech: Speech = {
          id: String(mockSpeeches.length + 1),
          ...data,
          published: data.published || false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Speech;
        mockSpeeches.push(newSpeech);
        resolve(newSpeech);
      }, 300);
    });
  },

  update: async (id: string, data: Partial<Speech>) => {
    return new Promise<Speech | undefined>((resolve) => {
      setTimeout(() => {
        const index = mockSpeeches.findIndex((s) => s.id === id);
        if (index !== -1) {
          mockSpeeches[index] = {
            ...mockSpeeches[index],
            ...data,
            updatedAt: new Date().toISOString(),
          };
          resolve(mockSpeeches[index]);
        }
        resolve(undefined);
      }, 300);
    });
  },

  remove: async (id: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = mockSpeeches.findIndex((s) => s.id === id);
        if (index !== -1) mockSpeeches.splice(index, 1);
        resolve();
      }, 300);
    });
  },
};

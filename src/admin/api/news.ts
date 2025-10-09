import { apiClient } from './client';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image?: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data - TODO: Replace with Supabase
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Legal Victory in High-Profile Case',
    content: 'Full article content here...',
    excerpt: 'Our firm secured a major victory...',
    image: '/assets/admin/news/news-1.jpg',
    published: true,
    publishedAt: '2024-01-15',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'New Partner Announcement',
    content: 'Full article content here...',
    excerpt: 'We are pleased to announce...',
    published: false,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
];

export const newsService = {
  list: async () => {
    // Simulate API call
    return new Promise<NewsItem[]>((resolve) => {
      setTimeout(() => resolve(mockNews), 300);
    });
  },

  get: async (id: string) => {
    return new Promise<NewsItem | undefined>((resolve) => {
      setTimeout(() => {
        resolve(mockNews.find((item) => item.id === id));
      }, 300);
    });
  },

  create: async (data: Partial<NewsItem>) => {
    return new Promise<NewsItem>((resolve) => {
      setTimeout(() => {
        const newItem: NewsItem = {
          id: String(mockNews.length + 1),
          title: data.title || '',
          content: data.content || '',
          excerpt: data.excerpt || '',
          image: data.image,
          published: data.published || false,
          publishedAt: data.published ? new Date().toISOString() : undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockNews.push(newItem);
        resolve(newItem);
      }, 300);
    });
  },

  update: async (id: string, data: Partial<NewsItem>) => {
    return new Promise<NewsItem | undefined>((resolve) => {
      setTimeout(() => {
        const index = mockNews.findIndex((item) => item.id === id);
        if (index !== -1) {
          mockNews[index] = {
            ...mockNews[index],
            ...data,
            updatedAt: new Date().toISOString(),
          };
          resolve(mockNews[index]);
        } else {
          resolve(undefined);
        }
      }, 300);
    });
  },

  remove: async (id: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = mockNews.findIndex((item) => item.id === id);
        if (index !== -1) {
          mockNews.splice(index, 1);
        }
        resolve();
      }, 300);
    });
  },
};

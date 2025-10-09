export interface MediaFile {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'document' | 'video';
  size: number;
  uploadedAt: string;
}

const mockMedia: MediaFile[] = [
  {
    id: '1',
    filename: 'courthouse.jpg',
    url: '/assets/admin/media/courthouse.jpg',
    type: 'image',
    size: 245670,
    uploadedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    filename: 'contract.pdf',
    url: '/assets/admin/media/contract.pdf',
    type: 'document',
    size: 1024000,
    uploadedAt: '2024-01-14T09:15:00Z',
  },
];

export const mediaService = {
  list: async () => {
    return new Promise<MediaFile[]>((resolve) => {
      setTimeout(() => resolve(mockMedia), 300);
    });
  },

  upload: async (file: File) => {
    return new Promise<MediaFile>((resolve) => {
      setTimeout(() => {
        const newMedia: MediaFile = {
          id: String(mockMedia.length + 1),
          filename: file.name,
          url: `/assets/admin/media/${file.name}`,
          type: file.type.startsWith('image/') ? 'image' : 'document',
          size: file.size,
          uploadedAt: new Date().toISOString(),
        };
        mockMedia.push(newMedia);
        resolve(newMedia);
      }, 1000);
    });
  },

  remove: async (id: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const index = mockMedia.findIndex((m) => m.id === id);
        if (index !== -1) mockMedia.splice(index, 1);
        resolve();
      }, 300);
    });
  },
};

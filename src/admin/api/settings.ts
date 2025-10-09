export interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  };
}

let mockSettings: Settings = {
  siteName: 'Greg Law Firm',
  siteDescription: 'Professional legal services',
  contactEmail: 'contact@lawfirm.com',
  contactPhone: '+1 (555) 123-4567',
  address: '123 Legal St, New York, NY 10001',
  socialMedia: {
    facebook: 'https://facebook.com/lawfirm',
    twitter: 'https://twitter.com/lawfirm',
    linkedin: 'https://linkedin.com/company/lawfirm',
  },
  seo: {
    metaTitle: 'Greg Law Firm - Professional Legal Services',
    metaDescription: 'Expert legal representation for all your needs',
    metaKeywords: 'law, legal, attorney, lawyer',
  },
};

export const settingsService = {
  get: async () => {
    return new Promise<Settings>((resolve) => {
      setTimeout(() => resolve(mockSettings), 300);
    });
  },

  update: async (data: Partial<Settings>) => {
    return new Promise<Settings>((resolve) => {
      setTimeout(() => {
        mockSettings = { ...mockSettings, ...data };
        resolve(mockSettings);
      }, 300);
    });
  },
};

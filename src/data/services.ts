export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  image: string;
}

export const services: Service[] = [
  {
    id: 'business-law',
    title: 'Business Law',
    icon: 'flaticon-internet',
    description:
      'It is a long established fact that areader will be distracted by the readable content of a page when looking.',
    image: '/images/resource/service-1.jpg',
  },
  {
    id: 'civil-law',
    title: 'Civil Law',
    icon: 'flaticon-museum',
    description:
      'It is a long established fact that areader will be distracted by the readable content of a page when looking.',
    image: '/images/resource/service-2.jpg',
  },
  {
    id: 'criminal-law',
    title: 'Criminal Law',
    icon: 'flaticon-gun',
    description:
      'It is a long established fact that areader will be distracted by the readable content of a page when looking.',
    image: '/images/resource/service-3.jpg',
  },
  {
    id: 'education-law',
    title: 'Education Law',
    icon: 'flaticon-book',
    description:
      'It is a long established fact that areader will be distracted by the readable content of a page when looking.',
    image: '/images/resource/service-1.jpg',
  },
  {
    id: 'family-law',
    title: 'Family Law',
    icon: 'flaticon-family',
    description:
      'It is a long established fact that areader will be distracted by the readable content of a page when looking.',
    image: '/images/resource/service-2.jpg',
  },
  {
    id: 'real-estate-law',
    title: 'Real Estate Law',
    icon: 'flaticon-house',
    description:
      'It is a long established fact that areader will be distracted by the readable content of a page when looking.',
    image: '/images/resource/service-3.jpg',
  },
];

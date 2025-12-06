export interface Location {
  id: string;
  name: string;
  category: 'beach' | 'trail' | 'park' | 'restaurant' | 'cafe' | 'event';
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  leashRequired: boolean;
  address: string;
  coordinates: [number, number];
  amenities: string[];
  hours?: string;
  dogFriendliness: number;
  cleanliness: number;
  safety: number;
}

export const locations: Location[] = [
  {
    id: '1',
    name: 'Sunny Paws Beach',
    category: 'beach',
    description: 'A beautiful off-leash dog beach with soft sand and calm waves. Perfect for water-loving pups!',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    rating: 4.8,
    reviewCount: 324,
    leashRequired: false,
    address: '123 Ocean Drive, Coastal City',
    coordinates: [34.0195, -118.4912],
    amenities: ['Water fountain', 'Waste bags', 'Parking', 'Restrooms'],
    hours: '6:00 AM - 8:00 PM',
    dogFriendliness: 5,
    cleanliness: 4,
    safety: 5,
  },
  {
    id: '2',
    name: 'Redwood Trail Loop',
    category: 'trail',
    description: 'A scenic 3-mile loop through majestic redwood trees. Shaded paths perfect for hot days.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    rating: 4.6,
    reviewCount: 189,
    leashRequired: true,
    address: '456 Forest Road, Mountain View',
    coordinates: [34.0259, -118.4798],
    amenities: ['Trail markers', 'Waste bags', 'Parking'],
    hours: 'Sunrise to Sunset',
    dogFriendliness: 4,
    cleanliness: 5,
    safety: 4,
  },
  {
    id: '3',
    name: 'Bark & Brew Cafe',
    category: 'cafe',
    description: 'Dog-friendly cafe with a dedicated patio area. Serves puppuccinos and dog treats!',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    rating: 4.9,
    reviewCount: 412,
    leashRequired: true,
    address: '789 Main Street, Downtown',
    coordinates: [34.0224, -118.4851],
    amenities: ['Water bowls', 'Dog menu', 'Shaded patio', 'WiFi'],
    hours: '7:00 AM - 9:00 PM',
    dogFriendliness: 5,
    cleanliness: 5,
    safety: 5,
  },
  {
    id: '4',
    name: 'Waggy Tails Dog Park',
    category: 'park',
    description: 'Large off-leash dog park with separate areas for small and large dogs. Agility equipment available.',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
    rating: 4.5,
    reviewCount: 567,
    leashRequired: false,
    address: '321 Park Avenue, Suburbia',
    coordinates: [34.0287, -118.4723],
    amenities: ['Agility course', 'Water stations', 'Benches', 'Shade structures'],
    hours: '6:00 AM - 10:00 PM',
    dogFriendliness: 5,
    cleanliness: 3,
    safety: 4,
  },
  {
    id: '5',
    name: 'The Hungry Hound',
    category: 'restaurant',
    description: 'Upscale restaurant with a pet-friendly patio. Known for their brunch and craft cocktails.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    rating: 4.7,
    reviewCount: 298,
    leashRequired: true,
    address: '555 Gourmet Lane, Arts District',
    coordinates: [34.0312, -118.4667],
    amenities: ['Water bowls', 'Tie-up spots', 'Heated patio'],
    hours: '11:00 AM - 11:00 PM',
    dogFriendliness: 4,
    cleanliness: 5,
    safety: 5,
  },
  {
    id: '6',
    name: 'Paws in the Park Festival',
    category: 'event',
    description: 'Annual dog festival with vendors, contests, and adoption events. This Saturday!',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
    rating: 4.9,
    reviewCount: 156,
    leashRequired: true,
    address: 'Central Park, Downtown',
    coordinates: [34.0178, -118.4956],
    amenities: ['Vendors', 'Food trucks', 'Photo booths', 'Adoption area'],
    hours: '10:00 AM - 6:00 PM',
    dogFriendliness: 5,
    cleanliness: 4,
    safety: 5,
  },
];

export const categories = [
  { id: 'all', label: 'All', icon: '🐕' },
  { id: 'beach', label: 'Beaches', icon: '🏖️' },
  { id: 'trail', label: 'Trails', icon: '🥾' },
  { id: 'park', label: 'Parks', icon: '🌳' },
  { id: 'restaurant', label: 'Dining', icon: '🍽️' },
  { id: 'cafe', label: 'Cafes', icon: '☕' },
  { id: 'event', label: 'Events', icon: '🎉' },
];

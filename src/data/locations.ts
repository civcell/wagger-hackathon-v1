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
    address: '1 Ocean Drive, Miami Beach, FL',
    coordinates: [25.7907, -80.1300],
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
    description: 'A scenic 3-mile loop through beautiful tropical trees. Shaded paths perfect for hot Miami days.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    rating: 4.6,
    reviewCount: 189,
    leashRequired: true,
    address: '3400 NE 163rd St, North Miami Beach, FL',
    coordinates: [25.9200, -80.1300],
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
    address: '200 Biscayne Blvd, Miami, FL',
    coordinates: [25.7743, -80.1900],
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
    address: '7900 SW 40th St, Miami, FL',
    coordinates: [25.7300, -80.3100],
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
    address: '1200 Collins Ave, Miami Beach, FL',
    coordinates: [25.7900, -80.1400],
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

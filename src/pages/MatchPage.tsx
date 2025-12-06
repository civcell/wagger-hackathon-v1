import { useState } from 'react';
import { Heart, X, Info, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DogProfile {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  images: string[];
  owner: {
    name: string;
    avatar: string;
    location: string;
  };
  description: string;
  traits: string[];
  lookingFor: string;
  distance: number;
  lastActive: string;
}

const mockDogs: DogProfile[] = [
  {
    id: '1',
    name: 'Max',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'male',
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
    ],
    owner: {
      name: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      location: 'Coastal City, CA',
    },
    description: 'Friendly and energetic! Loves playing fetch and going on long walks. Great with kids and other dogs.',
    traits: ['Playful', 'Friendly', 'Active', 'Good with kids'],
    lookingFor: 'Looking for a friendly companion for playdates and potential breeding',
    distance: 2.3,
    lastActive: 'Active now',
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'Australian Shepherd',
    age: 2,
    gender: 'female',
    images: [
      'https://images.unsplash.com/photo-1601758124096-1fd661873b95?w=800',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
    ],
    owner: {
      name: 'Mike',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      location: 'Mountain View, CA',
    },
    description: 'Smart and agile! Enjoys hiking, agility training, and cuddling. Very social and loves meeting new friends.',
    traits: ['Intelligent', 'Energetic', 'Social', 'Trainable'],
    lookingFor: 'Seeking a compatible partner for breeding and playdates',
    distance: 5.1,
    lastActive: '2 hours ago',
  },
  {
    id: '3',
    name: 'Cooper',
    breed: 'Labrador Retriever',
    age: 4,
    gender: 'male',
    images: [
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800',
      'https://images.unsplash.com/photo-1583336663277-620dc1996580?w=800',
    ],
    owner: {
      name: 'Emma',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      location: 'Downtown, CA',
    },
    description: 'Gentle giant! Very calm and well-behaved. Loves swimming and playing in the park. Great temperament.',
    traits: ['Calm', 'Gentle', 'Loyal', 'Water-loving'],
    lookingFor: 'Looking for a compatible female for responsible breeding',
    distance: 3.7,
    lastActive: '1 hour ago',
  },
  {
    id: '4',
    name: 'Bella',
    breed: 'French Bulldog',
    age: 2,
    gender: 'female',
    images: [
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
    ],
    owner: {
      name: 'David',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      location: 'Arts District, CA',
    },
    description: 'Adorable and playful! Loves attention and cuddles. Perfect apartment companion with a big personality.',
    traits: ['Playful', 'Affectionate', 'Adaptable', 'Charming'],
    lookingFor: 'Seeking a compatible male for breeding',
    distance: 4.2,
    lastActive: '30 minutes ago',
  },
  {
    id: '5',
    name: 'Rocky',
    breed: 'German Shepherd',
    age: 3,
    gender: 'male',
    images: [
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
    ],
    owner: {
      name: 'Jessica',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      location: 'Suburbia, CA',
    },
    description: 'Protective and loyal! Very intelligent and trainable. Great with families and loves outdoor activities.',
    traits: ['Loyal', 'Protective', 'Intelligent', 'Active'],
    lookingFor: 'Looking for a compatible partner for breeding',
    distance: 6.8,
    lastActive: '3 hours ago',
  },
];

export function MatchPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiped, setSwiped] = useState<Set<string>>(new Set());
  const [matches, setMatches] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const currentDog = mockDogs[currentIndex];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setMatches([...matches, currentDog.id]);
    }
    setSwiped(new Set([...swiped, currentDog.id]));
    
    setTimeout(() => {
      if (currentIndex < mockDogs.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCurrentImageIndex(0);
        setDragOffset({ x: 0, y: 0 });
      }
    }, 300);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const offsetX = clientX - dragStart.x;
    const offsetY = clientY - dragStart.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const rotation = dragOffset.x * 0.1;
  const opacity = 1 - Math.abs(dragOffset.x) / 300;

  if (currentIndex >= mockDogs.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-4 py-24">
        <div className="text-center">
          <Heart className="w-20 h-20 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-2">You're all caught up! 🐕</h2>
          <p className="text-muted-foreground mb-6">
            You've seen all available matches. Check back later for more!
          </p>
          <Button onClick={() => {
            setCurrentIndex(0);
            setSwiped(new Set());
            setCurrentImageIndex(0);
          }}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-background to-background/50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-12 pb-4 bg-gradient-to-b from-background via-background/95 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Find a Match</h1>
            <p className="text-sm text-muted-foreground">Swipe right to like, left to pass</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {matches.length} matches
            </Badge>
          </div>
        </div>
      </div>

      {/* Card Stack */}
      <div className="flex items-center justify-center h-full pt-24 pb-32 px-4">
        <div className="relative w-full max-w-sm" style={{ height: '600px' }}>
          {/* Next card (peek) */}
          {currentIndex + 1 < mockDogs.length && (
            <div
              className="absolute inset-0 bg-card rounded-3xl shadow-card border border-border overflow-hidden"
              style={{
                transform: 'scale(0.95) translateY(10px)',
                zIndex: 1,
                opacity: 0.7,
              }}
            >
              <img
                src={mockDogs[currentIndex + 1].images[0]}
                alt={mockDogs[currentIndex + 1].name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Current card */}
          <div
            className={cn(
              "absolute inset-0 bg-card rounded-3xl shadow-2xl border border-border overflow-hidden cursor-grab active:cursor-grabbing transition-all",
              swiped.has(currentDog.id) && "opacity-0 scale-95"
            )}
            style={{
              transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
              opacity: opacity,
              zIndex: 2,
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {/* Image carousel */}
            <div className="relative h-2/3 bg-muted">
              <img
                src={currentDog.images[currentImageIndex]}
                alt={currentDog.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image indicators */}
              {currentDog.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {currentDog.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        idx === currentImageIndex ? "bg-primary w-6" : "bg-white/50"
                      )}
                    />
                  ))}
                </div>
              )}

              {/* Swipe indicators */}
              {Math.abs(dragOffset.x) > 50 && (
                <div
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 p-4 rounded-full text-white font-bold text-2xl",
                    dragOffset.x > 0 ? "bg-green-500 left-4" : "bg-red-500 right-4"
                  )}
                >
                  {dragOffset.x > 0 ? '✓' : '✕'}
                </div>
              )}

              {/* Info button */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full backdrop-blur-sm text-white hover:bg-black/70 transition-all"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>

            {/* Card content */}
            <div className="p-6 h-1/3 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-bold">{currentDog.name}</h2>
                    <p className="text-muted-foreground">
                      {currentDog.age} {currentDog.age === 1 ? 'year' : 'years'} old · {currentDog.breed}
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {currentDog.gender}
                  </Badge>
                </div>

                {showDetails ? (
                  <div className="mt-4 space-y-3 text-sm">
                    <p className="text-foreground">{currentDog.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {currentDog.traits.map((trait) => (
                        <Badge key={trait} variant="secondary" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-1 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{currentDog.distance} miles away</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="text-xs">{currentDog.owner.name} · {currentDog.owner.location}</span>
                      </div>
                      <p className="text-xs italic mt-2">{currentDog.lookingFor}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {currentDog.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-24 left-0 right-0 z-30 px-4">
        <div className="max-w-sm mx-auto flex items-center justify-center gap-6">
          <button
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 rounded-full bg-card border-2 border-border shadow-card flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive transition-all active:scale-95"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={() => handleSwipe('right')}
            className="w-20 h-20 rounded-full bg-primary shadow-card flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-all active:scale-95"
          >
            <Heart className="w-10 h-10 fill-current" />
          </button>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-16 h-16 rounded-full bg-card border-2 border-border shadow-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all active:scale-95"
          >
            <Info className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}


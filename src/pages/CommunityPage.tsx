import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    dogName?: string;
  };
  image: string;
  location: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
  isSaved: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      name: 'Sarah & Max',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      dogName: 'Max',
    },
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800',
    location: 'Sunny Paws Beach',
    caption: 'Max absolutely loved his first beach day! 🐕🌊 The water was so calm and perfect for swimming. We spent 3 hours playing fetch in the waves!',
    likes: 247,
    comments: 23,
    timestamp: '2h ago',
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    user: {
      name: 'Mike',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      dogName: 'Luna',
    },
    image: 'https://images.unsplash.com/photo-1601758124096-1fd661873b95?w=800',
    location: 'Redwood Trail Loop',
    caption: 'Luna discovered her new favorite hiking spot. The shade from the redwoods was perfect! 🌲 5 miles of pure bliss!',
    likes: 189,
    comments: 15,
    timestamp: '5h ago',
    isLiked: true,
    isSaved: true,
  },
  {
    id: '3',
    user: {
      name: 'Emma',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      dogName: 'Cooper',
    },
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
    location: 'Waggy Tails Dog Park',
    caption: 'Cooper made so many new friends today at the dog park! Best day ever 🎾❤️ The agility course was a hit!',
    likes: 312,
    comments: 42,
    timestamp: '1d ago',
    isLiked: false,
    isSaved: false,
  },
  {
    id: '4',
    user: {
      name: 'David & Bella',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      dogName: 'Bella',
    },
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
    location: 'Bark & Brew Cafe',
    caption: 'Bella tried her first puppuccino today! ☕🐕 She was so excited, couldn\'t stop wagging her tail! The staff here is amazing!',
    likes: 428,
    comments: 67,
    timestamp: '3h ago',
    isLiked: false,
    isSaved: false,
  },
  {
    id: '5',
    user: {
      name: 'Jessica',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      dogName: 'Rocky',
    },
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800',
    location: 'The Hungry Hound',
    caption: 'Sunday brunch with my best boy! 🍳 Rocky got the special dog menu and loved every bite. Great patio seating!',
    likes: 156,
    comments: 12,
    timestamp: '6h ago',
    isLiked: true,
    isSaved: false,
  },
  {
    id: '6',
    user: {
      name: 'Alex & Charlie',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
      dogName: 'Charlie',
    },
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800',
    location: 'Sunny Paws Beach',
    caption: 'Charlie\'s first time at the beach and he\'s already a pro swimmer! 🏖️🌊 Can\'t wait to come back next weekend!',
    likes: 289,
    comments: 34,
    timestamp: '4h ago',
    isLiked: false,
    isSaved: true,
  },
  {
    id: '7',
    user: {
      name: 'Maria',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
      dogName: 'Daisy',
    },
    image: 'https://images.unsplash.com/photo-1583336663277-620dc1996580?w=800',
    location: 'Waggy Tails Dog Park',
    caption: 'Daisy aced the agility course today! 🎯 So proud of my little athlete. The new equipment here is fantastic!',
    likes: 203,
    comments: 28,
    timestamp: '8h ago',
    isLiked: false,
    isSaved: false,
  },
  {
    id: '8',
    user: {
      name: 'Tom & Buddy',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      dogName: 'Buddy',
    },
    image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800',
    location: 'Redwood Trail Loop',
    caption: 'Early morning hike with Buddy! 🌲 The trail was empty and peaceful. Perfect way to start the day!',
    likes: 174,
    comments: 19,
    timestamp: '12h ago',
    isLiked: true,
    isSaved: false,
  },
];

function PostCard({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <article className="bg-card rounded-2xl shadow-card overflow-hidden border border-border/50 hover:shadow-hover transition-all">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <img
          src={post.user.avatar}
          alt={post.user.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{post.user.name}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{post.timestamp}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <span>📍</span>
              <span className="truncate">{post.location}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-square bg-muted overflow-hidden">
        <img
          src={post.image}
          alt={post.caption}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Actions */}
      <div className="p-4 pt-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 text-sm transition-all hover:scale-110 active:scale-95"
            >
              <Heart
                className={`w-6 h-6 transition-all ${
                  isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-muted-foreground hover:text-red-500'
                }`}
              />
              <span className="font-semibold">{likes.toLocaleString()}</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-all hover:scale-110 active:scale-95">
              <MessageCircle className="w-6 h-6" />
              <span className="font-semibold">{post.comments}</span>
            </button>
            <button className="text-muted-foreground hover:text-primary transition-all hover:scale-110 active:scale-95">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="transition-all hover:scale-110 active:scale-95"
          >
            <Bookmark
              className={`w-6 h-6 ${
                isSaved ? 'fill-primary text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            />
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-sm leading-relaxed">
            <span className="font-bold">{post.user.dogName || post.user.name.split(' ')[0]}</span>{' '}
            <span className="text-foreground">{post.caption}</span>
          </p>
          {post.comments > 0 && (
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              View all {post.comments} {post.comments === 1 ? 'comment' : 'comments'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function CommunityPage() {
  const [selectedFilter, setSelectedFilter] = useState('trending');

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-12 pb-4 bg-background/95 backdrop-blur-xl border-b border-border z-20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Community</h1>
            <p className="text-sm text-muted-foreground">See what other pups are up to 🐕</p>
          </div>
          <Button size="sm" variant="accent" className="shadow-card">
            + Post
          </Button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Badge 
            variant={selectedFilter === 'trending' ? 'default' : 'secondary'} 
            className="whitespace-nowrap cursor-pointer transition-all hover:scale-105"
            onClick={() => setSelectedFilter('trending')}
          >
            🔥 Trending
          </Badge>
          <Badge 
            variant={selectedFilter === 'nearby' ? 'default' : 'secondary'} 
            className="whitespace-nowrap cursor-pointer transition-all hover:scale-105"
            onClick={() => setSelectedFilter('nearby')}
          >
            📍 Nearby
          </Badge>
          <Badge 
            variant={selectedFilter === 'following' ? 'default' : 'secondary'} 
            className="whitespace-nowrap cursor-pointer transition-all hover:scale-105"
            onClick={() => setSelectedFilter('following')}
          >
            👥 Following
          </Badge>
          <Badge 
            variant={selectedFilter === 'beach' ? 'default' : 'secondary'} 
            className="whitespace-nowrap cursor-pointer transition-all hover:scale-105"
            onClick={() => setSelectedFilter('beach')}
          >
            🏖️ Beach Days
          </Badge>
          <Badge 
            variant={selectedFilter === 'parks' ? 'default' : 'secondary'} 
            className="whitespace-nowrap cursor-pointer transition-all hover:scale-105"
            onClick={() => setSelectedFilter('parks')}
          >
            🌳 Parks
          </Badge>
          <Badge 
            variant={selectedFilter === 'cafes' ? 'default' : 'secondary'} 
            className="whitespace-nowrap cursor-pointer transition-all hover:scale-105"
            onClick={() => setSelectedFilter('cafes')}
          >
            ☕ Cafes
          </Badge>
        </div>
      </div>

      {/* Scrollable Feed */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 space-y-6">
          {mockPosts.map((post, index) => (
            <div 
              key={post.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <PostCard post={post} />
            </div>
          ))}
          
          {/* End of feed message */}
          <div className="text-center py-8 pb-24">
            <p className="text-muted-foreground text-sm">You're all caught up! 🎉</p>
            <p className="text-muted-foreground/70 text-xs mt-1">Check back later for more posts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

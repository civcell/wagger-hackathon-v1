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
    caption: 'Max absolutely loved his first beach day! 🐕🌊 The water was so calm and perfect for swimming.',
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
    caption: 'Luna discovered her new favorite hiking spot. The shade from the redwoods was perfect! 🌲',
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
    caption: 'Cooper made so many new friends today at the dog park! Best day ever 🎾❤️',
    likes: 312,
    comments: 42,
    timestamp: '1d ago',
    isLiked: false,
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
    <article className="bg-card rounded-2xl shadow-card overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <img
          src={post.user.avatar}
          alt={post.user.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
        />
        <div className="flex-1">
          <p className="font-semibold text-sm">{post.user.name}</p>
          <p className="text-xs text-muted-foreground">{post.timestamp} · 📍 {post.location}</p>
        </div>
      </div>

      {/* Image */}
      <img
        src={post.image}
        alt={post.caption}
        className="w-full aspect-square object-cover"
      />

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 text-sm transition-all"
            >
              <Heart
                className={`w-6 h-6 transition-all ${
                  isLiked ? 'fill-accent text-accent scale-110' : 'text-muted-foreground hover:text-foreground'
                }`}
              />
              <span className="font-medium">{likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-all">
              <MessageCircle className="w-6 h-6" />
              <span className="font-medium">{post.comments}</span>
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-all">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="transition-all"
          >
            <Bookmark
              className={`w-6 h-6 ${
                isSaved ? 'fill-primary text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            />
          </button>
        </div>

        <p className="text-sm">
          <span className="font-semibold">{post.user.dogName || post.user.name.split(' ')[0]}</span>{' '}
          {post.caption}
        </p>
      </div>
    </article>
  );
}

export function CommunityPage() {
  return (
    <div className="min-h-full pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-4 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Community</h1>
            <p className="text-sm text-muted-foreground">See what other pups are up to</p>
          </div>
          <Button size="sm" variant="accent">
            + Post
          </Button>
        </div>
        
        {/* Trending */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          <Badge variant="secondary" className="whitespace-nowrap cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            🔥 Trending
          </Badge>
          <Badge variant="secondary" className="whitespace-nowrap cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            📍 Nearby
          </Badge>
          <Badge variant="secondary" className="whitespace-nowrap cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            👥 Following
          </Badge>
          <Badge variant="secondary" className="whitespace-nowrap cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            🏖️ Beach Days
          </Badge>
        </div>
      </div>

      {/* Feed */}
      <div className="px-4 py-4 space-y-4">
        {mockPosts.map((post, index) => (
          <div key={post.id} style={{ animationDelay: `${index * 100}ms` }}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

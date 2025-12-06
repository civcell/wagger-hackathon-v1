import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, MapPin, Star, Heart, Camera, Award, 
  ChevronRight, Edit2, PawPrint 
} from 'lucide-react';

const mockUser = {
  name: 'Alex Johnson',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
  location: 'Los Angeles, CA',
  joinDate: 'Member since 2024',
  stats: {
    visited: 28,
    reviews: 15,
    favorites: 12,
  },
  badges: ['Explorer', 'Beach Lover', 'Trail Master'],
  dog: {
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: '3 years',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200',
  },
};

function StatCard({ icon: Icon, value, label }: { icon: any; value: number; label: string }) {
  return (
    <div className="flex flex-col items-center p-4 bg-card rounded-2xl shadow-card">
      <Icon className="w-5 h-5 text-primary mb-1" />
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function MenuItem({ icon: Icon, label, onClick }: { icon: any; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-secondary transition-colors text-left"
    >
      <Icon className="w-5 h-5 text-muted-foreground" />
      <span className="flex-1 font-medium">{label}</span>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}

export function ProfilePage() {
  return (
    <div className="min-h-full pb-24">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent pt-8 pb-6 px-4">
        <button className="absolute top-4 right-4 p-2 rounded-xl bg-card/80 backdrop-blur-sm shadow-card">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
        
        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={mockUser.avatar}
              alt={mockUser.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-card shadow-soft"
            />
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-soft">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{mockUser.name}</h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{mockUser.location}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{mockUser.joinDate}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <StatCard icon={MapPin} value={mockUser.stats.visited} label="Visited" />
          <StatCard icon={Star} value={mockUser.stats.reviews} label="Reviews" />
          <StatCard icon={Heart} value={mockUser.stats.favorites} label="Favorites" />
        </div>
      </div>

      {/* Dog Profile */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <PawPrint className="w-5 h-5 text-primary" />
            My Dog
          </h2>
          <Button variant="ghost" size="sm">
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </div>
        
        <div className="flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card">
          <img
            src={mockUser.dog.avatar}
            alt={mockUser.dog.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h3 className="font-bold">{mockUser.dog.name}</h3>
            <p className="text-sm text-muted-foreground">{mockUser.dog.breed}</p>
            <p className="text-xs text-muted-foreground">{mockUser.dog.age}</p>
          </div>
          <Button variant="pill" size="sm">
            View Profile
          </Button>
        </div>
      </div>

      {/* Badges */}
      <div className="px-4 py-2">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-accent" />
          Badges Earned
        </h2>
        <div className="flex gap-2 flex-wrap">
          {mockUser.badges.map((badge) => (
            <Badge key={badge} variant="secondary" className="py-1.5 px-3">
              🏆 {badge}
            </Badge>
          ))}
          <Badge variant="outline" className="py-1.5 px-3 text-muted-foreground">
            + 5 more
          </Badge>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 py-4">
        <div className="bg-card rounded-2xl shadow-card divide-y divide-border">
          <MenuItem icon={Star} label="My Reviews" />
          <MenuItem icon={Camera} label="My Photos" />
          <MenuItem icon={MapPin} label="Visited Places" />
          <MenuItem icon={Settings} label="Settings" />
        </div>
      </div>

      {/* Sign Out */}
      <div className="px-4 py-4">
        <Button variant="outline" className="w-full">
          Sign Out
        </Button>
      </div>
    </div>
  );
}

import { Location } from '@/data/locations';
import { 
  X, Star, MapPin, Clock, Check, Heart, Share2, Navigation,
  Droplets, ShieldCheck, PawPrint 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface LocationDetailProps {
  location: Location;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  beach: 'bg-blue-100 text-blue-700',
  trail: 'bg-green-100 text-green-700',
  park: 'bg-emerald-100 text-emerald-700',
  restaurant: 'bg-orange-100 text-orange-700',
  cafe: 'bg-amber-100 text-amber-700',
  event: 'bg-purple-100 text-purple-700',
};

function RatingBar({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground w-28">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-semibold w-8">{value}/5</span>
    </div>
  );
}

export function LocationDetail({ location, onClose }: LocationDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div 
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg max-h-[90vh] bg-card rounded-t-3xl sm:rounded-3xl overflow-hidden animate-slide-in-bottom shadow-hover">
        {/* Header Image */}
        <div className="relative h-56">
          <img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-card transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`${categoryColors[location.category]} border-0 font-medium`}>
              {location.category}
            </Badge>
          </div>
          
          {/* Title overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-primary-foreground mb-1">{location.name}</h2>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-semibold">{location.rating}</span>
              <span>({location.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-14rem)]">
          {/* Quick Actions */}
          <div className="flex gap-3 mb-5">
            <Button variant="accent" className="flex-1" size="lg">
              <Navigation className="w-4 h-4" />
              Directions
            </Button>
            <Button 
              variant={isFavorite ? "default" : "outline"} 
              size="icon" 
              className="w-12 h-12"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="outline" size="icon" className="w-12 h-12">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Description */}
          <p className="text-muted-foreground mb-5">{location.description}</p>
          
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm truncate">{location.address.split(',')[0]}</span>
            </div>
            {location.hours && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm">{location.hours.split(' - ')[0]}</span>
              </div>
            )}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary col-span-2">
              {location.leashRequired ? (
                <>
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Leash required at all times</span>
                </>
              ) : (
                <>
                  <PawPrint className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">Off-leash friendly!</span>
                </>
              )}
            </div>
          </div>
          
          {/* Ratings */}
          <div className="mb-5">
            <h3 className="font-bold mb-3">Ratings</h3>
            <div className="space-y-3">
              <RatingBar label="Dog Friendliness" value={location.dogFriendliness} icon={PawPrint} />
              <RatingBar label="Cleanliness" value={location.cleanliness} icon={Droplets} />
              <RatingBar label="Safety" value={location.safety} icon={ShieldCheck} />
            </div>
          </div>
          
          {/* Amenities */}
          <div>
            <h3 className="font-bold mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {location.amenities.map((amenity) => (
                <Badge key={amenity} variant="secondary" className="font-normal">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

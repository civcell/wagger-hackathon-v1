import { Location } from '@/data/locations';
import { Star, MapPin, Clock, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LocationCardProps {
  location: Location;
  onClick: () => void;
  compact?: boolean;
}

const categoryColors: Record<string, string> = {
  beach: 'bg-blue-100 text-blue-700',
  trail: 'bg-green-100 text-green-700',
  park: 'bg-emerald-100 text-emerald-700',
  restaurant: 'bg-orange-100 text-orange-700',
  cafe: 'bg-amber-100 text-amber-700',
  event: 'bg-purple-100 text-purple-700',
};

const categoryIcons: Record<string, string> = {
  beach: '🏖️',
  trail: '🥾',
  park: '🌳',
  restaurant: '🍽️',
  cafe: '☕',
  event: '🎉',
};

export function LocationCard({ location, onClick, compact = false }: LocationCardProps) {
  if (compact) {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 p-3 rounded-xl bg-card hover-lift shadow-card text-left transition-all"
      >
        <img
          src={location.image}
          alt={location.name}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{location.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            <span className="font-medium text-foreground">{location.rating}</span>
            <span>({location.reviewCount})</span>
          </div>
        </div>
        <span className="text-lg">{categoryIcons[location.category]}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-2xl shadow-card hover-lift overflow-hidden text-left transition-all group"
    >
      <div className="relative">
        <img
          src={location.image}
          alt={location.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`${categoryColors[location.category]} border-0 font-medium`}>
            {categoryIcons[location.category]} {location.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span className="text-sm font-semibold">{location.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-1">{location.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{location.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate max-w-[120px]">{location.address.split(',')[0]}</span>
          </div>
          {location.hours && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Open</span>
            </div>
          )}
        </div>
        
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            {location.leashRequired ? (
              <>
                <Check className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Leash required</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4 text-accent" />
                <span className="text-accent font-medium">Off-leash</span>
              </>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{location.reviewCount} reviews</span>
        </div>
      </div>
    </button>
  );
}

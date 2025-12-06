import { Location } from '@/data/locations';
import { MapPin, Navigation } from 'lucide-react';

interface MapViewProps {
  locations: Location[];
  onLocationClick: (location: Location) => void;
  center?: [number, number];
  zoom?: number;
}

const categoryEmojis: Record<string, string> = {
  beach: '🏖️',
  trail: '🥾',
  park: '🌳',
  restaurant: '🍽️',
  cafe: '☕',
  event: '🎉',
};

export function MapView({ 
  locations, 
  onLocationClick, 
  center = [34.0224, -118.4851],
  zoom = 13 
}: MapViewProps) {
  // Simple map view using OpenStreetMap iframe embed
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center[1] - 0.05}%2C${center[0] - 0.03}%2C${center[1] + 0.05}%2C${center[0] + 0.03}&layer=mapnik`;

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-secondary">
      {/* Map Background */}
      <iframe
        src={mapUrl}
        className="absolute inset-0 w-full h-full border-0"
        title="Map"
        loading="lazy"
      />
      
      {/* Overlay with location markers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Center indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <div className="w-4 h-4 bg-primary rounded-full shadow-lg animate-pulse" />
        </div>
      </div>
      
      {/* Location chips on map */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 pointer-events-auto">
        {locations.slice(0, 4).map((location) => (
          <button
            key={location.id}
            onClick={() => onLocationClick(location)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-card/95 backdrop-blur-sm rounded-full shadow-card hover:shadow-hover transition-all text-sm font-medium"
          >
            <span>{categoryEmojis[location.category]}</span>
            <span className="max-w-[100px] truncate">{location.name}</span>
          </button>
        ))}
        {locations.length > 4 && (
          <div className="flex items-center gap-1 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full shadow-card text-primary-foreground text-sm font-medium">
            +{locations.length - 4} more
          </div>
        )}
      </div>
      
      {/* My location button */}
      <button className="absolute bottom-4 right-4 w-12 h-12 bg-card rounded-full shadow-hover flex items-center justify-center hover:bg-secondary transition-colors pointer-events-auto">
        <Navigation className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
}

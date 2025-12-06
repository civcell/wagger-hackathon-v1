import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Location } from '@/data/locations';
import { MapPin, Navigation, Star } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Map } from 'leaflet';

// Fix for default marker icons in React/Webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconRetinaUrl: iconRetina,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const categoryEmojis: Record<string, string> = {
  beach: '🏖️',
  trail: '🥾',
  park: '🌳',
  restaurant: '🍽️',
  cafe: '☕',
  event: '🎉',
};

const categoryColors: Record<string, string> = {
  beach: '#3b82f6', // blue
  trail: '#10b981', // green
  park: '#22c55e', // green
  restaurant: '#f59e0b', // amber
  cafe: '#8b5cf6', // purple
  event: '#ec4899', // pink
};

interface MapViewProps {
  locations: Location[];
  onLocationClick: (location: Location) => void;
  selectedLocation?: Location | null;
  center?: [number, number];
  zoom?: number;
}


// Custom marker component
function CustomMarker({ location, onClick }: { location: Location; onClick: () => void }) {
  const markerRef = useRef<L.Marker>(null);
  
  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: ${categoryColors[location.category] || '#6366f1'};
        width: 40px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <span style="
          transform: rotate(45deg);
          font-size: 18px;
          color: white;
        ">${categoryEmojis[location.category] || '🐕'}</span>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <Marker
      ref={markerRef}
      position={[location.coordinates[0], location.coordinates[1]]}
      icon={customIcon}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup className="custom-popup" maxWidth={250}>
        <div className="p-2">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-xl">{categoryEmojis[location.category]}</span>
            <div className="flex-1">
              <h3 className="font-bold text-sm mb-1">{location.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{location.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{location.rating}</span>
            </div>
            <span>•</span>
            <span>{location.reviewCount} reviews</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{location.address}</span>
          </div>
          {!location.leashRequired && (
            <div className="mt-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
              Off-leash allowed
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  );
}

export function MapView({ 
  locations, 
  onLocationClick,
  selectedLocation,
  center = [25.7617, -80.1918], // Default to Miami, FL
  zoom = 13 
}: MapViewProps) {
  const [mapInstance, setMapInstance] = useState<Map | null>(null);

  // Calculate center from locations if available
  useEffect(() => {
    if (locations.length > 0 && !selectedLocation && mapInstance) {
      const avgLat = locations.reduce((sum, loc) => sum + loc.coordinates[0], 0) / locations.length;
      const avgLng = locations.reduce((sum, loc) => sum + loc.coordinates[1], 0) / locations.length;
      mapInstance.setView([avgLat, avgLng], zoom);
    }
  }, [locations, selectedLocation, zoom, mapInstance]);

  // Center on selected location
  useEffect(() => {
    if (selectedLocation && mapInstance) {
      mapInstance.setView(
        [selectedLocation.coordinates[0], selectedLocation.coordinates[1]], 
        15
      );
    }
  }, [selectedLocation, mapInstance]);

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapInstance) {
            mapInstance.setView([latitude, longitude], 15);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-secondary">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={true}
        whenCreated={setMapInstance}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map((location) => (
          <CustomMarker
            key={location.id}
            location={location}
            onClick={() => onLocationClick(location)}
          />
        ))}
      </MapContainer>

      {/* My Location Button */}
      <button
        onClick={handleMyLocation}
        className="absolute bottom-4 right-4 z-[1000] w-12 h-12 bg-card rounded-full shadow-hover flex items-center justify-center hover:bg-secondary transition-all border border-border"
        title="Find my location"
      >
        <Navigation className="w-5 h-5 text-primary" />
      </button>

      {/* Location count badge */}
      {locations.length > 0 && (
        <div className="absolute top-4 left-4 z-[1000] px-3 py-1.5 bg-card/95 backdrop-blur-sm rounded-full shadow-card text-sm font-medium border border-border/50">
          {locations.length} {locations.length === 1 ? 'location' : 'locations'} found
        </div>
      )}
    </div>
  );
}

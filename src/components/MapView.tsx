import { useEffect, useRef, useState } from 'react';
import { Location } from '@/data/locations';
import { MapPin } from 'lucide-react';

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
  const [MapComponent, setMapComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const loadMap = async () => {
      try {
        const L = await import('leaflet');
        const { MapContainer, TileLayer, Marker, Popup } = await import('react-leaflet');
        await import('leaflet/dist/leaflet.css');

        // Fix for default marker icons
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        const createCustomIcon = (category: string) => {
          return L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                background: white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border: 3px solid hsl(150, 25%, 45%);
                font-size: 18px;
              ">
                ${categoryEmojis[category] || '📍'}
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          });
        };

        // Create the map component
        const DynamicMap = ({ locations, onLocationClick, center, zoom }: MapViewProps) => (
          <MapContainer
            center={center}
            zoom={zoom}
            className="w-full h-full rounded-2xl"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={location.coordinates}
                icon={createCustomIcon(location.category)}
                eventHandlers={{
                  click: () => onLocationClick(location),
                }}
              >
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-sm">{location.name}</h3>
                    <p className="text-xs text-muted-foreground">⭐ {location.rating}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        );

        setMapComponent(() => DynamicMap);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading map:', error);
        setIsLoading(false);
      }
    };

    loadMap();
  }, []);

  if (isLoading || !MapComponent) {
    return (
      <div className="w-full h-full rounded-2xl bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return <MapComponent locations={locations} onLocationClick={onLocationClick} center={center} zoom={zoom} />;
}

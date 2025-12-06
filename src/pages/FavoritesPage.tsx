import { useState } from 'react';
import { LocationCard } from '@/components/LocationCard';
import { LocationDetail } from '@/components/LocationDetail';
import { locations, Location } from '@/data/locations';
import { Heart, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'favorites' | 'recent';

export function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('favorites');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Mock favorites - first 3 locations
  const favorites = locations.slice(0, 3);
  // Mock recent - last 4 locations
  const recent = locations.slice(2, 6);

  const displayedLocations = activeTab === 'favorites' ? favorites : recent;

  return (
    <div className="min-h-full pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-4 bg-background/95 backdrop-blur-xl border-b border-border">
        <h1 className="text-2xl font-bold text-foreground mb-4">Saved Places</h1>
        
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('favorites')}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all",
              activeTab === 'favorites'
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-card text-muted-foreground hover:bg-secondary shadow-card"
            )}
          >
            <Heart className="w-4 h-4" />
            Favorites ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all",
              activeTab === 'recent'
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-card text-muted-foreground hover:bg-secondary shadow-card"
            )}
          >
            <Clock className="w-4 h-4" />
            Recently Viewed ({recent.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {displayedLocations.length > 0 ? (
          <div className="grid gap-4">
            {displayedLocations.map((location, index) => (
              <div 
                key={location.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <LocationCard 
                  location={location} 
                  onClick={() => setSelectedLocation(location)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            {activeTab === 'favorites' ? (
              <>
                <Heart className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                <p className="text-muted-foreground">
                  Start exploring and save your favorite spots!
                </p>
              </>
            ) : (
              <>
                <Clock className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No recent views</h3>
                <p className="text-muted-foreground">
                  Places you view will appear here
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Location Detail Modal */}
      {selectedLocation && (
        <LocationDetail 
          location={selectedLocation} 
          onClose={() => setSelectedLocation(null)} 
        />
      )}
    </div>
  );
}

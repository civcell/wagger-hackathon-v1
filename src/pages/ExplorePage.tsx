import { useState, useMemo } from 'react';
import { MapView } from '@/components/MapView';
import { CategoryFilter } from '@/components/CategoryFilter';
import { LocationCard } from '@/components/LocationCard';
import { SearchBar } from '@/components/SearchBar';
import { LocationDetail } from '@/components/LocationDetail';
import { SearchAssistant } from '@/components/SearchAssistant';
import { locations, Location } from '@/data/locations';
import { Map, List } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAssistant, setShowAssistant] = useState(false);

  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-4 pb-2 space-y-3 bg-gradient-to-b from-background via-background/95 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Explore</h1>
            <p className="text-sm text-muted-foreground">Find paw-fect spots nearby</p>
          </div>
          <div className="flex items-center gap-2 p-1 bg-card rounded-xl shadow-card">
            <button
              onClick={() => setViewMode('map')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'map' ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              <Map className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'list' ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <SearchBar 
          onSearch={setSearchQuery} 
          onAssistantClick={() => setShowAssistant(true)}
        />
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      {/* Content */}
      {viewMode === 'map' ? (
        <div className="flex-1 pt-48 h-full">
          <div className="h-full min-h-[400px]">
            <MapView 
              locations={filteredLocations} 
              onLocationClick={setSelectedLocation}
            />
          </div>
          
          {/* Floating location cards */}
          <div className="absolute bottom-24 left-0 right-0 px-4">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {filteredLocations.slice(0, 5).map((location, index) => (
                <div 
                  key={location.id} 
                  className="w-72 flex-shrink-0 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <LocationCard 
                    location={location} 
                    onClick={() => setSelectedLocation(location)}
                    compact
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 pt-48 pb-24 px-4 overflow-y-auto">
          <div className="grid gap-4">
            {filteredLocations.map((location, index) => (
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
          {filteredLocations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🐕</p>
              <p className="text-muted-foreground">No spots found. Try a different search!</p>
            </div>
          )}
        </div>
      )}

      {/* Location Detail Modal */}
      {selectedLocation && (
        <LocationDetail 
          location={selectedLocation} 
          onClose={() => setSelectedLocation(null)} 
        />
      )}

      {/* Search Assistant */}
      {showAssistant && (
        <SearchAssistant
          locations={locations}
          onLocationSelect={(location) => {
            setSelectedLocation(location);
            setShowAssistant(false);
          }}
          onClose={() => setShowAssistant(false)}
        />
      )}
    </div>
  );
}

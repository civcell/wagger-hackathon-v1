import { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { ExplorePage } from '@/pages/ExplorePage';
import { CommunityPage } from '@/pages/CommunityPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { ProfilePage } from '@/pages/ProfilePage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('explore');

  const renderPage = () => {
    switch (activeTab) {
      case 'explore':
        return <ExplorePage />;
      case 'community':
        return <CommunityPage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <ExplorePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="h-screen overflow-hidden">
        {renderPage()}
      </main>
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

export default Index;

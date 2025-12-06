import { Compass, Users, Heart, User, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  active: string;
  onNavigate: (tab: string) => void;
}

const navItems = [
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'match', label: 'Match', icon: Heart },
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-2">
      <div className="max-w-lg mx-auto bg-card/95 backdrop-blur-xl rounded-2xl shadow-hover border border-border/50 p-1">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "animate-bounce-gentle")} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield, Sword, Users, Book, Search, Play, Map, UserPlus, Trophy, Coins, Scroll, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Houses', icon: Shield, href: '/houses', description: 'Great Houses of Westeros' },
    { name: 'Armies', icon: Sword, href: '/armies', description: 'Military Strength & Tactics' },
    { name: 'Characters', icon: Users, href: '/characters', description: 'Lords & Commanders' },
    { name: 'Chronicles', icon: Book, href: '/chronicles', description: 'Battles & History' },
    { name: 'Armoury', icon: Search, href: '/armoury', description: 'Weapons & Equipment' },
    { name: 'Battle Simulator', icon: Play, href: '/battle-simulator', description: 'Command Your Armies' },
    { name: 'Interactive Map', icon: Map, href: '/map', description: 'Explore Westeros' },
    { name: 'Character Creator', icon: UserPlus, href: '/create-character', description: 'Create Your Own' },
    { name: 'Tournaments', icon: Trophy, href: '/tournaments', description: 'Jousts & Melees' },
    { name: 'Economy', icon: Coins, href: '/economy', description: 'Trade & Commerce' },
    { name: 'Prophecies', icon: Sparkles, href: '/prophecies', description: 'Lore & Legends' },
    { name: 'Library', icon: BookOpen, href: '/library', description: 'Knowledge Repository' },
    { name: 'Stories', icon: Scroll, href: '/stories', description: 'Interactive Tales' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-gold-700/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-gold-500" />
            <h1 className="text-xl font-cinzel font-bold text-gold-400">
              The Master Armourer
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center space-x-2 text-foreground/80 hover:text-gold-400 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span className="font-cormorant font-medium hover-glow text-sm">{item.name}</span>
              </Link>
            ))}
            <div className="relative group">
              <Button variant="ghost" className="text-foreground/80 hover:text-gold-400">
                More <Menu className="h-4 w-4 ml-1" />
              </Button>
              <div className="absolute top-full right-0 mt-2 w-64 bg-background/95 backdrop-blur-sm border border-gold-700/30 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {navItems.slice(6).map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block p-3 rounded-lg hover:bg-gold-900/20 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-4 w-4 text-gold-500" />
                        <div>
                          <div className="font-cormorant font-semibold text-foreground text-sm">
                            {item.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background border-gold-700/30">
              <div className="py-6">
                <div className="flex items-center space-x-3 mb-8">
                  <Shield className="h-6 w-6 text-gold-500" />
                  <h2 className="text-lg font-cinzel font-bold text-gold-400">
                    The Master Armourer
                  </h2>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group block p-3 rounded-lg hover:bg-gold-900/20 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-4 w-4 text-gold-500" />
                        <div>
                          <div className="font-cormorant font-semibold text-foreground group-hover:text-gold-400 text-sm">
                            {item.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield, Sword, Users, Book, Search } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Houses', icon: Shield, href: '#houses', description: 'Great Houses of Westeros' },
    { name: 'Armies', icon: Sword, href: '#armies', description: 'Military Strength & Tactics' },
    { name: 'Characters', icon: Users, href: '#characters', description: 'Lords & Commanders' },
    { name: 'Chronicles', icon: Book, href: '#chronicles', description: 'Battles & History' },
    { name: 'Armoury', icon: Search, href: '#armoury', description: 'Weapons & Equipment' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-gold-700/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-gold-500" />
            <h1 className="text-xl font-cinzel font-bold text-gold-400">
              The Master Armourer
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center space-x-2 text-foreground/80 hover:text-gold-400 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span className="font-cormorant font-medium hover-glow">{item.name}</span>
              </a>
            ))}
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
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group block p-3 rounded-lg hover:bg-gold-900/20 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5 text-gold-500" />
                        <div>
                          <div className="font-cormorant font-semibold text-foreground group-hover:text-gold-400">
                            {item.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </a>
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

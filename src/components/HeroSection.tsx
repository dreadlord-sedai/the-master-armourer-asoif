
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sword, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-iron-900/50 via-background to-background" />
      <div className="absolute inset-0 bg-iron-texture opacity-10" />
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Main Title */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent w-32" />
              <Shield className="mx-4 h-8 w-8 text-gold-500" />
              <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent w-32" />
            </div>
            <h1 className="text-6xl md:text-8xl font-cinzel font-bold text-foreground mb-4">
              THE MASTER
              <br />
              <span className="text-gold-400 animate-glow">ARMOURER</span>
            </h1>
            <p className="text-xl md:text-2xl font-cormorant text-gold-300 mb-2">
              Donal Noye
            </p>
            <div className="flex items-center justify-center mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent w-24" />
              <Sword className="mx-3 h-5 w-5 text-gold-500" />
              <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent w-24" />
            </div>
          </div>

          {/* Iconic Quote */}
          <div className="medieval-scroll rounded-lg p-8 mb-12 max-w-3xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-cormorant italic text-gold-200 leading-relaxed">
              "You need steel and fire to forge a sword, not words."
            </blockquote>
            <cite className="block mt-4 text-lg font-cormorant text-gold-400">
              — Donal Noye, Blacksmith of the Night's Watch
            </cite>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl font-cormorant text-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Explore the military strength, armies, and political geography of Westeros. 
            Discover the Great Houses, their commanders, and the battles that shaped the Seven Kingdoms.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/houses">
              <Button 
                size="lg" 
                className="bg-gold-600 hover:bg-gold-700 text-background font-cormorant font-semibold text-lg px-8 py-3 hover-glow"
              >
                <Shield className="mr-2 h-5 w-5" />
                Explore Houses
              </Button>
            </Link>
            <Link to="/armies">
              <Button 
                variant="outline" 
                size="lg"
                className="border-gold-600 text-gold-400 hover:bg-gold-600 hover:text-background font-cormorant font-semibold text-lg px-8 py-3 hover-glow"
              >
                <Sword className="mr-2 h-5 w-5" />
                View Armies
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <button 
            onClick={scrollToFeatures}
            className="animate-bounce cursor-pointer p-2 hover:text-gold-400 transition-colors"
            aria-label="Scroll to features"
          >
            <ArrowDown className="h-6 w-6 text-gold-500 mx-auto" />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-2 h-32 bg-gradient-to-b from-gold-500/20 to-transparent" />
      <div className="absolute bottom-20 right-10 w-2 h-32 bg-gradient-to-t from-gold-500/20 to-transparent" />
      <div className="absolute top-1/3 right-20 w-32 h-2 bg-gradient-to-l from-gold-500/20 to-transparent" />
      <div className="absolute bottom-1/3 left-20 w-32 h-2 bg-gradient-to-r from-gold-500/20 to-transparent" />
    </section>
  );
};

export default HeroSection;

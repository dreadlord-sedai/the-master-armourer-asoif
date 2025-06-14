
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Sword, Users, Book, Search, Map } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  comingSoon?: boolean;
}

const features: Feature[] = [
  {
    title: 'Great Houses',
    description: 'Explore the sigils, words, and military strength of every major house in Westeros.',
    icon: Shield,
    color: 'text-blue-400'
  },
  {
    title: 'Army Analytics',
    description: 'Interactive visualizations of troop strengths, battle formations, and military tactics.',
    icon: Sword,
    color: 'text-red-400'
  },
  {
    title: 'Lords & Commanders',
    description: 'Detailed profiles of the greatest military minds and leaders of the Seven Kingdoms.',
    icon: Users,
    color: 'text-green-400'
  },
  {
    title: 'Battle Chronicles',
    description: 'Relive the greatest battles with detailed tactical analysis and historical context.',
    icon: Book,
    color: 'text-purple-400'
  },
  {
    title: 'Weapons & Armor',
    description: 'From Valyrian steel to dragon glass, discover the legendary weapons of Westeros.',
    icon: Search,
    color: 'text-yellow-400'
  },
  {
    title: 'Interactive Maps',
    description: 'Explore Westeros with dynamic maps showing territories, troop movements, and more.',
    icon: Map,
    color: 'text-cyan-400',
    comingSoon: true
  }
];

const FeaturesPreview = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-iron-900/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-4">
            Forge Your Knowledge
          </h2>
          <p className="text-xl font-cormorant text-foreground/80 max-w-3xl mx-auto">
            Like steel shaped in the forge, knowledge of warfare requires the right tools. 
            Discover the military secrets of Westeros through our comprehensive archives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="parchment-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer relative overflow-hidden"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {feature.comingSoon && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-gold-600 text-background px-2 py-1 text-xs font-cinzel font-bold rounded">
                    COMING SOON
                  </span>
                </div>
              )}
              
              <CardContent className="p-6 text-center">
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-background/50 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                </div>

                <h3 className="text-2xl font-cinzel font-bold text-foreground mb-4 group-hover:text-gold-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="font-cormorant text-foreground/80 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gold-600 text-gold-400 hover:bg-gold-600 hover:text-background font-cormorant transition-all duration-300"
                  disabled={feature.comingSoon}
                >
                  {feature.comingSoon ? 'Coming Soon' : 'Explore'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-gold-900/20 to-crimson-900/20 rounded-lg p-6 border border-gold-700/30">
            <Sword className="h-6 w-6 text-gold-500" />
            <p className="font-cormorant text-lg text-foreground/80">
              "The man who passes the sentence should swing the sword."
            </p>
            <Shield className="h-6 w-6 text-gold-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPreview;

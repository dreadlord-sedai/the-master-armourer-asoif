
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Sword, Users } from 'lucide-react';

interface Region {
  name: string;
  description: string;
  majorHouse: string;
  houseColors: string;
  strength: string;
  specialty: string;
  icon: string;
}

const regions: Region[] = [
  {
    name: 'The North',
    description: 'Vast and cold, home to House Stark and their bannermen. Known for honor and resilience.',
    majorHouse: 'House Stark',
    houseColors: 'from-stark-600 to-stark-400',
    strength: '45,000',
    specialty: 'Heavy Infantry',
    icon: '🐺'
  },
  {
    name: 'The Westerlands',
    description: 'Rich in gold mines, ruled by House Lannister. The wealthiest region of Westeros.',
    majorHouse: 'House Lannister',
    houseColors: 'from-crimson-600 to-gold-400',
    strength: '60,000',
    specialty: 'Professional Army',
    icon: '🦁'
  },
  {
    name: 'The Reach',
    description: 'The most fertile region, capable of fielding the largest armies in Westeros.',
    majorHouse: 'House Tyrell',
    houseColors: 'from-green-600 to-yellow-400',
    strength: '100,000',
    specialty: 'Heavy Cavalry',
    icon: '🌹'
  },
  {
    name: 'Dorne',
    description: 'Desert kingdom known for guerrilla warfare and poison. Unconquered by dragons.',
    majorHouse: 'House Martell',
    houseColors: 'from-orange-600 to-red-400',
    strength: '25,000',
    specialty: 'Light Infantry',
    icon: '☀️'
  },
  {
    name: 'The Stormlands',
    description: 'Storm-battered lands producing tough warriors. Seat of House Baratheon.',
    majorHouse: 'House Baratheon',
    houseColors: 'from-yellow-600 to-black',
    strength: '35,000',
    specialty: 'Heavy Infantry',
    icon: '🦌'
  },
  {
    name: 'The Vale',
    description: 'Mountain kingdom protected by the Bloody Gate. Home to knights and honor.',
    majorHouse: 'House Arryn',
    houseColors: 'from-blue-600 to-white',
    strength: '40,000',
    specialty: 'Knights',
    icon: '🦅'
  }
];

const RegionsOverview = () => {
  return (
    <section id="regions" className="py-20 bg-gradient-to-b from-background to-iron-900/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-4">
            The Seven Kingdoms
          </h2>
          <p className="text-xl font-cormorant text-foreground/80 max-w-3xl mx-auto">
            Each region of Westeros has its own military traditions, strengths, and strategic importance. 
            Explore the lands that shaped the fate of the realm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions.map((region, index) => (
            <Card 
              key={region.name} 
              className="parchment-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{region.icon}</div>
                  <h3 className="text-2xl font-cinzel font-bold text-foreground mb-2 group-hover:text-gold-400 transition-colors">
                    {region.name}
                  </h3>
                  <Badge 
                    className={`bg-gradient-to-r ${region.houseColors} text-white font-cormorant`}
                  >
                    {region.majorHouse}
                  </Badge>
                </div>

                <p className="font-cormorant text-foreground/80 mb-6 text-center leading-relaxed">
                  {region.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gold-500" />
                      <span className="font-cormorant text-sm text-foreground/80">Total Strength</span>
                    </div>
                    <span className="font-cinzel font-semibold text-gold-400">{region.strength}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sword className="h-4 w-4 text-gold-500" />
                      <span className="font-cormorant text-sm text-foreground/80">Specialty</span>
                    </div>
                    <span className="font-cinzel font-semibold text-gold-400">{region.specialty}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gold-700/30">
                  <div className="flex items-center justify-center text-gold-400 group-hover:text-gold-300 transition-colors">
                    <Shield className="h-4 w-4 mr-2" />
                    <span className="font-cormorant text-sm">Explore Houses</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionsOverview;

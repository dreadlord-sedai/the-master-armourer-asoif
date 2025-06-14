
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Shield, Sword, Crown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Houses = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');

  const houses = [
    {
      name: 'House Stark',
      region: 'The North',
      seat: 'Winterfell',
      words: 'Winter is Coming',
      sigil: '🐺',
      color: 'text-slate-400',
      troops: '20,000',
      specialty: 'Heavy Infantry',
      description: 'The ancient rulers of the North, known for their honor and resilience.'
    },
    {
      name: 'House Lannister',
      region: 'The Westerlands',
      seat: 'Casterly Rock',
      words: 'Hear Me Roar',
      sigil: '🦁',
      color: 'text-yellow-400',
      troops: '35,000',
      specialty: 'Gold & Mercenaries',
      description: 'The wealthiest house in Westeros, masters of gold and politics.'
    },
    {
      name: 'House Baratheon',
      region: 'The Stormlands',
      seat: 'Storm\'s End',
      words: 'Ours is the Fury',
      sigil: '🦌',
      color: 'text-amber-500',
      troops: '25,000',
      specialty: 'Storm Knights',
      description: 'Fierce warriors of the Stormlands, known for their martial prowess.'
    },
    {
      name: 'House Tyrell',
      region: 'The Reach',
      seat: 'Highgarden',
      words: 'Growing Strong',
      sigil: '🌹',
      color: 'text-green-400',
      troops: '80,000',
      specialty: 'Knights & Cavalry',
      description: 'The most populous region, masters of chivalry and agriculture.'
    },
    {
      name: 'House Arryn',
      region: 'The Vale',
      seat: 'The Eyrie',
      words: 'As High as Honor',
      sigil: '🦅',
      color: 'text-blue-300',
      troops: '15,000',
      specialty: 'Mountain Defense',
      description: 'Defenders of the impregnable Vale, masters of mountain warfare.'
    },
    {
      name: 'House Martell',
      region: 'Dorne',
      seat: 'Sunspear',
      words: 'Unbowed, Unbent, Unbroken',
      sigil: '☀️',
      color: 'text-orange-400',
      troops: '25,000',
      specialty: 'Guerrilla Warfare',
      description: 'The unconquered princes of Dorne, masters of desert warfare.'
    }
  ];

  const regions = ['all', 'The North', 'The Westerlands', 'The Stormlands', 'The Reach', 'The Vale', 'Dorne'];

  const filteredHouses = selectedRegion === 'all' 
    ? houses 
    : houses.filter(house => house.region === selectedRegion);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
              Great Houses of Westeros
            </h1>
            <p className="text-xl font-cormorant text-foreground/80 max-w-3xl mx-auto">
              From the icy walls of Winterfell to the sun-kissed towers of Sunspear, 
              explore the noble houses that shape the fate of the Seven Kingdoms.
            </p>
          </div>

          {/* Region Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                onClick={() => setSelectedRegion(region)}
                className="font-cormorant capitalize"
              >
                {region === 'all' ? 'All Regions' : region}
              </Button>
            ))}
          </div>

          {/* Houses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHouses.map((house) => (
              <Card key={house.name} className="parchment-card hover:scale-105 transition-transform duration-300">
                <CardHeader className="text-center">
                  <div className={`text-6xl mb-4 ${house.color}`}>
                    {house.sigil}
                  </div>
                  <CardTitle className="text-2xl font-cinzel text-gold-400">
                    {house.name}
                  </CardTitle>
                  <CardDescription className="font-cormorant text-lg italic text-gold-200">
                    "{house.words}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Crown className="h-4 w-4 text-gold-500" />
                      <span className="font-cormorant">{house.seat}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-gold-500" />
                      <span className="font-cormorant">{house.region}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gold-500" />
                      <span className="font-cormorant">{house.troops}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sword className="h-4 w-4 text-gold-500" />
                      <span className="font-cormorant">{house.specialty}</span>
                    </div>
                  </div>
                  <p className="font-cormorant text-foreground/70 text-sm">
                    {house.description}
                  </p>
                  <Button className="w-full mt-4" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    View House Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Houses;

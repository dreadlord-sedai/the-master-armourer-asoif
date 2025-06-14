import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Castle, Crown, Sword, Users, Map } from 'lucide-react';

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const locations = [
    {
      id: 'winterfell',
      name: 'Winterfell',
      house: 'House Stark',
      type: 'Castle',
      region: 'The North',
      description: 'Ancient seat of House Stark, capital of the North',
      population: '15,000',
      defenses: 'Massive walls, hot springs, crypts',
      position: { x: 30, y: 15 }
    },
    {
      id: 'kingslanding',
      name: "King's Landing",
      house: 'House Baratheon/Lannister',
      type: 'Capital',
      region: 'Crownlands',
      description: 'Capital city of the Seven Kingdoms',
      population: '500,000',
      defenses: 'Red Keep, City Watch, massive walls',
      position: { x: 45, y: 60 }
    },
    {
      id: 'casterly-rock',
      name: 'Casterly Rock',
      house: 'House Lannister',
      type: 'Castle',
      region: 'Westerlands',
      description: 'Impregnable fortress and seat of House Lannister',
      population: '20,000',
      defenses: 'Natural rock formation, gold mines, strong garrison',
      position: { x: 20, y: 55 }
    },
    {
      id: 'highgarden',
      name: 'Highgarden',
      house: 'House Tyrell',
      type: 'Castle',
      region: 'The Reach',
      description: 'Beautiful castle surrounded by gardens and fields',
      population: '25,000',
      defenses: 'Multiple rings of walls, fertile lands',
      position: { x: 35, y: 70 }
    },
    {
      id: 'sunspear',
      name: 'Sunspear',
      house: 'House Martell',
      type: 'Castle',
      region: 'Dorne',
      description: 'Ancient seat of House Martell in the desert',
      population: '18,000',
      defenses: 'Desert location, water gardens, loyal population',
      position: { x: 50, y: 85 }
    },
    {
      id: 'storms-end',
      name: "Storm's End",
      house: 'House Baratheon',
      type: 'Castle',
      region: 'Stormlands',
      description: 'Legendary castle that has never fallen',
      population: '12,000',
      defenses: 'Massive curtain wall, strategic position',
      position: { x: 55, y: 65 }
    }
  ];

  const selectedLoc = locations.find(loc => loc.id === selectedLocation);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
            Interactive Map of Westeros
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the Seven Kingdoms, discover ancient castles, and learn about the great houses that rule the realm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  The Seven Kingdoms
                </CardTitle>
                <CardDescription>
                  Click on any location to learn more about it
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-b from-blue-100 to-yellow-100 dark:from-blue-900 dark:to-yellow-900 rounded-lg h-96 overflow-hidden">
                  {/* Simplified map background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-brown-200 to-yellow-200 dark:from-green-800 dark:via-brown-800 dark:to-yellow-800 opacity-50"></div>
                  
                  {/* Location markers */}
                  {locations.map((location) => (
                    <Button
                      key={location.id}
                      variant="ghost"
                      size="sm"
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                        selectedLocation === location.id ? 'bg-gold-500/20 border-2 border-gold-500' : 'hover:bg-gold-500/10'
                      }`}
                      style={{
                        left: `${location.position.x}%`,
                        top: `${location.position.y}%`
                      }}
                      onClick={() => setSelectedLocation(location.id)}
                    >
                      <div className="flex flex-col items-center">
                        {location.type === 'Capital' ? (
                          <Crown className="h-6 w-6 text-gold-500" />
                        ) : (
                          <Castle className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        )}
                        <span className="text-xs font-semibold mt-1">{location.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {selectedLoc ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {selectedLoc.name}
                  </CardTitle>
                  <CardDescription>{selectedLoc.house}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Badge variant="secondary">{selectedLoc.type}</Badge>
                    <Badge variant="outline">{selectedLoc.region}</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {selectedLoc.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Population: {selectedLoc.population}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sword className="h-4 w-4" />
                      <span className="text-sm">Defenses: {selectedLoc.defenses}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Select a Location</CardTitle>
                  <CardDescription>
                    Click on any castle or city on the map to learn more about it
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <Button
                        key={location.id}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setSelectedLocation(location.id)}
                      >
                        {location.type === 'Capital' ? (
                          <Crown className="h-4 w-4 mr-2" />
                        ) : (
                          <Castle className="h-4 w-4 mr-2" />
                        )}
                        {location.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Realm Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Locations</span>
                  <span className="font-semibold">{locations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Great Houses</span>
                  <span className="font-semibold">6</span>
                </div>
                <div className="flex justify-between">
                  <span>Regions</span>
                  <span className="font-semibold">6</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Population</span>
                  <span className="font-semibold">590,000+</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InteractiveMap;

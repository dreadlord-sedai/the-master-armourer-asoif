
import React, { useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Sword, Shield, Users, Play, RotateCcw, MapPin, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TroopPlacement {
  id: string;
  house: string;
  x: number;
  y: number;
  infantry: number;
  cavalry: number;
  archers: number;
  color: string;
}

interface BattleResult {
  winner: string;
  casualties: { [key: string]: number };
  description: string;
}

const BattleSimulator = () => {
  const [troopPlacements, setTroopPlacements] = useState<TroopPlacement[]>([]);
  const [selectedHouse, setSelectedHouse] = useState('stark');
  const [troopCounts, setTroopCounts] = useState({
    infantry: 1000,
    cavalry: 500,
    archers: 300
  });
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const houses = [
    { id: 'stark', name: 'House Stark', color: '#64748b' },
    { id: 'lannister', name: 'House Lannister', color: '#dc2626' },
    { id: 'tyrell', name: 'House Tyrell', color: '#16a34a' },
    { id: 'baratheon', name: 'House Baratheon', color: '#eab308' },
    { id: 'martell', name: 'House Martell', color: '#ea580c' },
    { id: 'arryn', name: 'House Arryn', color: '#2563eb' }
  ];

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    const selectedHouseData = houses.find(h => h.id === selectedHouse);
    if (!selectedHouseData) return;

    const newPlacement: TroopPlacement = {
      id: `${selectedHouse}-${Date.now()}`,
      house: selectedHouseData.name,
      x,
      y,
      infantry: troopCounts.infantry,
      cavalry: troopCounts.cavalry,
      archers: troopCounts.archers,
      color: selectedHouseData.color
    };

    setTroopPlacements(prev => [...prev, newPlacement]);
  };

  const simulateBattle = () => {
    if (troopPlacements.length < 2) return;
    
    setIsSimulating(true);
    
    // Simple battle simulation logic
    setTimeout(() => {
      const totalForces = troopPlacements.map(placement => ({
        house: placement.house,
        total: placement.infantry + placement.cavalry + placement.archers,
        strength: placement.infantry * 1 + placement.cavalry * 1.5 + placement.archers * 0.8
      }));

      const strongest = totalForces.reduce((prev, current) => 
        prev.strength > current.strength ? prev : current
      );

      const casualties: { [key: string]: number } = {};
      troopPlacements.forEach(placement => {
        const totalTroops = placement.infantry + placement.cavalry + placement.archers;
        casualties[placement.house] = Math.floor(totalTroops * (Math.random() * 0.3 + 0.1));
      });

      setBattleResult({
        winner: strongest.house,
        casualties,
        description: `${strongest.house} emerges victorious through superior tactics and positioning. The battle was fierce, with heavy casualties on all sides.`
      });
      
      setIsSimulating(false);
    }, 2000);
  };

  const clearBattlefield = () => {
    setTroopPlacements([]);
    setBattleResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
              Battle Simulator
            </h1>
            <p className="text-xl font-cormorant text-foreground/80 max-w-3xl mx-auto">
              Command armies across the Seven Kingdoms. Place your forces strategically 
              and witness the clash of steel and strategy unfold.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Battle Map */}
            <div className="lg:col-span-2">
              <Card className="parchment-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gold-400">
                    <MapPin className="h-6 w-6" />
                    <span>Westeros Battlefield</span>
                  </CardTitle>
                  <CardDescription>
                    Click on the map to place troops. Different colors represent different houses.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    ref={mapRef}
                    className="relative w-full h-96 bg-gradient-to-b from-blue-900/20 to-green-900/20 border-2 border-gold-500/30 rounded-lg cursor-crosshair overflow-hidden"
                    onClick={handleMapClick}
                  >
                    {/* Westeros Map Background */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmMTAiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')] opacity-20"></div>
                    
                    {/* Troop Placements */}
                    {troopPlacements.map((placement) => (
                      <div
                        key={placement.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-fade-in"
                        style={{
                          left: `${placement.x}%`,
                          top: `${placement.y}%`,
                          color: placement.color
                        }}
                      >
                        <Crown className="h-6 w-6 mb-1" style={{ color: placement.color }} />
                        <div className="text-xs font-bold bg-background/80 px-2 py-1 rounded whitespace-nowrap">
                          {placement.house}
                        </div>
                        <div className="text-xs text-foreground/60">
                          {(placement.infantry + placement.cavalry + placement.archers).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <Card className="parchment-card">
                <CardHeader>
                  <CardTitle className="text-gold-400">Troop Deployment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-cormorant font-semibold mb-2">House</label>
                    <Select value={selectedHouse} onValueChange={setSelectedHouse}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {houses.map(house => (
                          <SelectItem key={house.id} value={house.id}>
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: house.color }}
                              />
                              <span>{house.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-cormorant font-semibold mb-1">
                        <Users className="h-4 w-4 inline mr-1" />
                        Infantry
                      </label>
                      <Input
                        type="number"
                        value={troopCounts.infantry}
                        onChange={(e) => setTroopCounts(prev => ({
                          ...prev,
                          infantry: parseInt(e.target.value) || 0
                        }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-cormorant font-semibold mb-1">
                        <Sword className="h-4 w-4 inline mr-1" />
                        Cavalry
                      </label>
                      <Input
                        type="number"
                        value={troopCounts.cavalry}
                        onChange={(e) => setTroopCounts(prev => ({
                          ...prev,
                          cavalry: parseInt(e.target.value) || 0
                        }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-cormorant font-semibold mb-1">
                        <Shield className="h-4 w-4 inline mr-1" />
                        Archers
                      </label>
                      <Input
                        type="number"
                        value={troopCounts.archers}
                        onChange={(e) => setTroopCounts(prev => ({
                          ...prev,
                          archers: parseInt(e.target.value) || 0
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="parchment-card">
                <CardHeader>
                  <CardTitle className="text-gold-400">Battle Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={simulateBattle} 
                    disabled={troopPlacements.length < 2 || isSimulating}
                    className="w-full"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isSimulating ? 'Simulating...' : 'Begin Battle'}
                  </Button>
                  <Button onClick={clearBattlefield} variant="outline" className="w-full">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear Battlefield
                  </Button>
                </CardContent>
              </Card>

              {/* Battle Results */}
              {battleResult && (
                <Card className="parchment-card">
                  <CardHeader>
                    <CardTitle className="text-gold-400">Battle Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <Crown className="h-8 w-8 mx-auto mb-2 text-gold-400" />
                      <h3 className="text-lg font-cinzel font-bold text-gold-400">
                        {battleResult.winner} Victorious!
                      </h3>
                    </div>
                    <p className="text-sm font-cormorant text-foreground/70">
                      {battleResult.description}
                    </p>
                    <div>
                      <h4 className="font-semibold mb-2">Casualties:</h4>
                      {Object.entries(battleResult.casualties).map(([house, casualties]) => (
                        <div key={house} className="flex justify-between text-sm">
                          <span>{house}</span>
                          <span className="text-red-400">{casualties.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BattleSimulator;

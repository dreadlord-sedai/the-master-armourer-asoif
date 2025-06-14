
import React, { useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Sword, Shield, Users, Play, RotateCcw, MapPin, Crown, Scroll, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { simulateDetailedBattle, DetailedBattleResult, Army, HOUSE_TRAITS } from '@/utils/battleLogic';
import { toast } from 'sonner';

interface TroopPlacement {
  id: string;
  house: string;
  x: number;
  y: number;
  infantry: number;
  cavalry: number;
  archers: number;
  commander: string;
  color: string;
}

const BattleSimulator = () => {
  const [troopPlacements, setTroopPlacements] = useState<TroopPlacement[]>([]);
  const [selectedHouse, setSelectedHouse] = useState('stark');
  const [selectedTerrain, setSelectedTerrain] = useState<'plains' | 'mountains' | 'forest' | 'desert' | 'riverlands'>('plains');
  const [troopCounts, setTroopCounts] = useState({
    infantry: 1000,
    cavalry: 500,
    archers: 300
  });
  const [battleResult, setBattleResult] = useState<DetailedBattleResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const houses = [
    { id: 'stark', name: 'House Stark', color: '#64748b', commander: 'Robb Stark' },
    { id: 'lannister', name: 'House Lannister', color: '#dc2626', commander: 'Tywin Lannister' },
    { id: 'tyrell', name: 'House Tyrell', color: '#16a34a', commander: 'Randyll Tarly' },
    { id: 'baratheon', name: 'House Baratheon', color: '#eab308', commander: 'Robert Baratheon' },
    { id: 'martell', name: 'House Martell', color: '#ea580c', commander: 'Oberyn Martell' },
    { id: 'arryn', name: 'House Arryn', color: '#2563eb', commander: 'Jon Arryn' }
  ];

  const terrains = [
    { id: 'plains', name: 'Open Plains', description: 'Ideal for cavalry charges' },
    { id: 'mountains', name: 'Mountain Pass', description: 'Defensive advantage' },
    { id: 'forest', name: 'Dense Forest', description: 'Limits cavalry movement' },
    { id: 'desert', name: 'Desert Sands', description: 'Harsh conditions' },
    { id: 'riverlands', name: 'Riverlands', description: 'Mixed terrain' }
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
      commander: selectedHouseData.commander,
      color: selectedHouseData.color
    };

    setTroopPlacements(prev => [...prev, newPlacement]);
    toast(`${selectedHouseData.name} forces deployed!`);
  };

  const simulateBattle = () => {
    if (troopPlacements.length < 2) {
      toast.error('Deploy at least 2 armies to begin battle!');
      return;
    }
    
    setIsSimulating(true);
    
    setTimeout(() => {
      try {
        const armies: Army[] = troopPlacements.map(placement => ({
          house: placement.house,
          infantry: placement.infantry,
          cavalry: placement.cavalry,
          archers: placement.archers,
          commander: placement.commander,
          terrain: selectedTerrain,
          morale: 0.8 + Math.random() * 0.2,
          discipline: HOUSE_TRAITS[placement.house]?.discipline || 0.75,
          equipment: HOUSE_TRAITS[placement.house]?.equipment || 0.75
        }));

        const result = simulateDetailedBattle(armies, selectedTerrain);
        setBattleResult(result);
        toast.success(`Battle concluded! ${result.winner} emerges victorious!`);
      } catch (error) {
        toast.error('Battle simulation failed');
        console.error(error);
      }
      
      setIsSimulating(false);
    }, 3000);
  };

  const clearBattlefield = () => {
    setTroopPlacements([]);
    setBattleResult(null);
    toast('Battlefield cleared');
  };

  const getTerrainStyle = () => {
    const baseStyle = "relative w-full h-96 border-2 border-gold-500/30 rounded-lg cursor-crosshair overflow-hidden ";
    switch (selectedTerrain) {
      case 'mountains':
        return baseStyle + "bg-gradient-to-b from-gray-700/40 to-gray-600/40";
      case 'forest':
        return baseStyle + "bg-gradient-to-b from-green-800/40 to-green-700/40";
      case 'desert':
        return baseStyle + "bg-gradient-to-b from-yellow-600/40 to-orange-600/40";
      case 'riverlands':
        return baseStyle + "bg-gradient-to-b from-blue-600/30 to-green-600/30";
      default:
        return baseStyle + "bg-gradient-to-b from-green-500/20 to-yellow-500/20";
    }
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
              Command armies across the Seven Kingdoms. Deploy your forces strategically 
              and witness epic battles unfold with authentic Westeros military tactics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Battle Map */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="parchment-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gold-400">
                    <MapPin className="h-6 w-6" />
                    <span>Westeros Battlefield - {terrains.find(t => t.id === selectedTerrain)?.name}</span>
                  </CardTitle>
                  <CardDescription>
                    Click to deploy troops. {terrains.find(t => t.id === selectedTerrain)?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    ref={mapRef}
                    className={getTerrainStyle()}
                    onClick={handleMapClick}
                  >
                    {/* Terrain Grid Overlay */}
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
                        <div className="text-xs font-bold bg-background/90 px-2 py-1 rounded whitespace-nowrap border" style={{ borderColor: placement.color }}>
                          {placement.house}
                        </div>
                        <div className="text-xs text-foreground/60 bg-background/80 px-1 rounded mt-1">
                          {(placement.infantry + placement.cavalry + placement.archers).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Battle Results */}
              {battleResult && (
                <Card className="parchment-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gold-400">
                      <Scroll className="h-6 w-6" />
                      <span>Battle Chronicle</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <Crown className="h-12 w-12 mx-auto mb-3 text-gold-400" />
                      <h2 className="text-2xl font-cinzel font-bold text-gold-400 mb-2">
                        {battleResult.winner} Victorious!
                      </h2>
                      <div className="flex items-center justify-center space-x-4 text-sm text-foreground/60">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Duration: {battleResult.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-cinzel font-bold text-gold-400 mb-3">Key Moments</h3>
                        <ul className="space-y-2">
                          {battleResult.keyMoments.map((moment, index) => (
                            <li key={index} className="text-sm text-foreground/70 flex items-start space-x-2">
                              <Sword className="h-3 w-3 mt-1 text-gold-500 flex-shrink-0" />
                              <span>{moment}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-cinzel font-bold text-gold-400 mb-3">Casualties</h3>
                        <div className="space-y-2">
                          {Object.entries(battleResult.casualties).map(([house, casualties]) => (
                            <div key={house} className="bg-iron-900/30 p-3 rounded">
                              <div className="font-semibold text-sm mb-1">{house}</div>
                              <div className="grid grid-cols-2 gap-2 text-xs text-foreground/60">
                                <div>Infantry: {casualties.infantry.toLocaleString()}</div>
                                <div>Cavalry: {casualties.cavalry.toLocaleString()}</div>
                                <div>Archers: {casualties.archers.toLocaleString()}</div>
                                <div className="font-semibold text-red-400">Total: {casualties.total.toLocaleString()}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gold-500/30 pt-4">
                      <h3 className="font-cinzel font-bold text-gold-400 mb-2">Tactical Analysis</h3>
                      <p className="text-sm font-cormorant text-foreground/70">
                        {battleResult.tacticalAnalysis}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <Card className="parchment-card">
                <CardHeader>
                  <CardTitle className="text-gold-400">Battle Setup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-cormorant font-semibold mb-2">Terrain</label>
                    <Select value={selectedTerrain} onValueChange={(value: any) => setSelectedTerrain(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {terrains.map(terrain => (
                          <SelectItem key={terrain.id} value={terrain.id}>
                            <div>
                              <div className="font-semibold">{terrain.name}</div>
                              <div className="text-xs text-foreground/60">{terrain.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

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
                    {isSimulating ? 'Battle in Progress...' : 'Begin Battle'}
                  </Button>
                  <Button onClick={clearBattlefield} variant="outline" className="w-full">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear Battlefield
                  </Button>
                </CardContent>
              </Card>

              {/* House Info */}
              {selectedHouse && (
                <Card className="parchment-card">
                  <CardHeader>
                    <CardTitle className="text-gold-400">
                      {houses.find(h => h.id === selectedHouse)?.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div><strong>Commander:</strong> {houses.find(h => h.id === selectedHouse)?.commander}</div>
                      <div><strong>Specialty:</strong> {HOUSE_TRAITS[houses.find(h => h.id === selectedHouse)?.name || '']?.specialty}</div>
                      <p className="text-foreground/70 mt-2">
                        {HOUSE_TRAITS[houses.find(h => h.id === selectedHouse)?.name || '']?.description}
                      </p>
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


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Users, Sword, TrendingUp, Shield, Crown, Swords } from 'lucide-react';

const ArmyComparisonTool = () => {
  const [house1, setHouse1] = useState('');
  const [house2, setHouse2] = useState('');

  const armyData = {
    'house-tyrell': {
      name: 'House Tyrell',
      troops: 80000,
      cavalry: 20000,
      infantry: 50000,
      archers: 10000,
      specialty: 'Knights & Cavalry',
      commander: 'Randyll Tarly',
      stronghold: 'Highgarden',
      color: 'text-green-400',
      sigil: '🌹'
    },
    'house-lannister': {
      name: 'House Lannister',
      troops: 60000,
      cavalry: 15000,
      infantry: 35000,
      archers: 10000,
      specialty: 'Gold & Mercenaries',
      commander: 'Tywin Lannister',
      stronghold: 'Casterly Rock',
      color: 'text-yellow-400',
      sigil: '🦁'
    },
    'house-stark': {
      name: 'House Stark',
      troops: 45000,
      cavalry: 8000,
      infantry: 30000,
      archers: 7000,
      specialty: 'Heavy Infantry',
      commander: 'Robb Stark',
      stronghold: 'Winterfell',
      color: 'text-slate-400',
      sigil: '🐺'
    },
    'house-baratheon': {
      name: 'House Baratheon',
      troops: 35000,
      cavalry: 10000,
      infantry: 20000,
      archers: 5000,
      specialty: 'Storm Knights',
      commander: 'Robert Baratheon',
      stronghold: 'Storm\'s End',
      color: 'text-amber-500',
      sigil: '🦌'
    },
    'house-martell': {
      name: 'House Martell',
      troops: 25000,
      cavalry: 5000,
      infantry: 15000,
      archers: 5000,
      specialty: 'Guerrilla Warfare',
      commander: 'Oberyn Martell',
      stronghold: 'Sunspear',
      color: 'text-orange-400',
      sigil: '☀️'
    },
    'house-arryn': {
      name: 'House Arryn',
      troops: 15000,
      cavalry: 3000,
      infantry: 10000,
      archers: 2000,
      specialty: 'Mountain Defense',
      commander: 'Jon Arryn',
      stronghold: 'The Eyrie',
      color: 'text-blue-300',
      sigil: '🦅'
    }
  };

  const houses = Object.keys(armyData);
  const selectedHouse1 = house1 ? armyData[house1] : null;
  const selectedHouse2 = house2 ? armyData[house2] : null;

  const clearComparison = () => {
    setHouse1('');
    setHouse2('');
  };

  const getAdvantage = (value1, value2) => {
    if (value1 > value2) return 'advantage';
    if (value1 < value2) return 'disadvantage';
    return 'equal';
  };

  const StatComparison = ({ label, value1, value2, icon: Icon, house1Color, house2Color }) => {
    const advantage1 = getAdvantage(value1, value2);
    const advantage2 = getAdvantage(value2, value1);

    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2 mb-2">
          <Icon className="h-4 w-4 text-gold-500" />
          <span className="font-cormorant font-semibold">{label}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className={`text-center p-2 rounded ${advantage1 === 'advantage' ? 'bg-green-900/30' : advantage1 === 'disadvantage' ? 'bg-red-900/30' : 'bg-iron-900/30'}`}>
            <div className={`text-lg font-bold ${house1Color}`}>
              {typeof value1 === 'number' ? value1.toLocaleString() : value1}
            </div>
          </div>
          <div className={`text-center p-2 rounded ${advantage2 === 'advantage' ? 'bg-green-900/30' : advantage2 === 'disadvantage' ? 'bg-red-900/30' : 'bg-iron-900/30'}`}>
            <div className={`text-lg font-bold ${house2Color}`}>
              {typeof value2 === 'number' ? value2.toLocaleString() : value2}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* House Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="parchment-card">
          <CardHeader>
            <CardTitle className="text-gold-400 text-center">Select First House</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={house1} onValueChange={setHouse1}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a house..." />
              </SelectTrigger>
              <SelectContent>
                {houses.filter(h => h !== house2).map((houseKey) => (
                  <SelectItem key={houseKey} value={houseKey}>
                    <div className="flex items-center space-x-2">
                      <span>{armyData[houseKey].sigil}</span>
                      <span>{armyData[houseKey].name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="parchment-card">
          <CardHeader>
            <CardTitle className="text-gold-400 text-center">Select Second House</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={house2} onValueChange={setHouse2}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a house..." />
              </SelectTrigger>
              <SelectContent>
                {houses.filter(h => h !== house1).map((houseKey) => (
                  <SelectItem key={houseKey} value={houseKey}>
                    <div className="flex items-center space-x-2">
                      <span>{armyData[houseKey].sigil}</span>
                      <span>{armyData[houseKey].name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Results */}
      {selectedHouse1 && selectedHouse2 && (
        <div className="space-y-6">
          {/* House Headers */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="parchment-card text-center">
              <CardContent className="pt-6">
                <div className={`text-6xl mb-2 ${selectedHouse1.color}`}>
                  {selectedHouse1.sigil}
                </div>
                <h3 className={`text-2xl font-cinzel font-bold ${selectedHouse1.color}`}>
                  {selectedHouse1.name}
                </h3>
                <p className="text-sm text-foreground/60">{selectedHouse1.stronghold}</p>
              </CardContent>
            </Card>

            <Card className="parchment-card text-center">
              <CardContent className="pt-6">
                <div className={`text-6xl mb-2 ${selectedHouse2.color}`}>
                  {selectedHouse2.sigil}
                </div>
                <h3 className={`text-2xl font-cinzel font-bold ${selectedHouse2.color}`}>
                  {selectedHouse2.name}
                </h3>
                <p className="text-sm text-foreground/60">{selectedHouse2.stronghold}</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparison */}
          <Card className="parchment-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-gold-400">Military Comparison</span>
                <Button variant="outline" onClick={clearComparison}>
                  <Swords className="h-4 w-4 mr-2" />
                  Clear Comparison
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <StatComparison
                label="Total Troops"
                value1={selectedHouse1.troops}
                value2={selectedHouse2.troops}
                icon={Users}
                house1Color={selectedHouse1.color}
                house2Color={selectedHouse2.color}
              />

              <StatComparison
                label="Infantry"
                value1={selectedHouse1.infantry}
                value2={selectedHouse2.infantry}
                icon={Shield}
                house1Color={selectedHouse1.color}
                house2Color={selectedHouse2.color}
              />

              <StatComparison
                label="Cavalry"
                value1={selectedHouse1.cavalry}
                value2={selectedHouse2.cavalry}
                icon={Sword}
                house1Color={selectedHouse1.color}
                house2Color={selectedHouse2.color}
              />

              <StatComparison
                label="Archers"
                value1={selectedHouse1.archers}
                value2={selectedHouse2.archers}
                icon={TrendingUp}
                house1Color={selectedHouse1.color}
                house2Color={selectedHouse2.color}
              />

              <StatComparison
                label="Military Specialty"
                value1={selectedHouse1.specialty}
                value2={selectedHouse2.specialty}
                icon={Crown}
                house1Color={selectedHouse1.color}
                house2Color={selectedHouse2.color}
              />

              <StatComparison
                label="Commander"
                value1={selectedHouse1.commander}
                value2={selectedHouse2.commander}
                icon={Crown}
                house1Color={selectedHouse1.color}
                house2Color={selectedHouse2.color}
              />
            </CardContent>
          </Card>

          {/* Battle Outcome Prediction */}
          <Card className="parchment-card">
            <CardHeader>
              <CardTitle className="text-gold-400">Battle Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-cinzel font-bold mb-2 ${selectedHouse1.color}`}>
                    {selectedHouse1.name} Advantages
                  </h4>
                  <ul className="space-y-1 text-sm text-foreground/70">
                    {selectedHouse1.troops > selectedHouse2.troops && <li>• Superior numbers ({(selectedHouse1.troops - selectedHouse2.troops).toLocaleString()} more troops)</li>}
                    {selectedHouse1.cavalry > selectedHouse2.cavalry && <li>• Stronger cavalry force</li>}
                    {selectedHouse1.infantry > selectedHouse2.infantry && <li>• More infantry</li>}
                    {selectedHouse1.archers > selectedHouse2.archers && <li>• Superior archery</li>}
                    <li>• Specializes in {selectedHouse1.specialty}</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-cinzel font-bold mb-2 ${selectedHouse2.color}`}>
                    {selectedHouse2.name} Advantages
                  </h4>
                  <ul className="space-y-1 text-sm text-foreground/70">
                    {selectedHouse2.troops > selectedHouse1.troops && <li>• Superior numbers ({(selectedHouse2.troops - selectedHouse1.troops).toLocaleString()} more troops)</li>}
                    {selectedHouse2.cavalry > selectedHouse1.cavalry && <li>• Stronger cavalry force</li>}
                    {selectedHouse2.infantry > selectedHouse1.infantry && <li>• More infantry</li>}
                    {selectedHouse2.archers > selectedHouse1.archers && <li>• Superior archery</li>}
                    <li>• Specializes in {selectedHouse2.specialty}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {(!selectedHouse1 || !selectedHouse2) && (
        <Card className="parchment-card">
          <CardContent className="text-center py-12">
            <Swords className="h-16 w-16 text-gold-500 mx-auto mb-4" />
            <p className="text-lg font-cormorant text-foreground/70">
              Select two houses to compare their military might
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ArmyComparisonTool;

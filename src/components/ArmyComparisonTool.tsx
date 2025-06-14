
/**
 * @fileoverview Army Comparison Tool Component
 * 
 * Provides comprehensive side-by-side military analysis between Great Houses
 * of Westeros, including troop composition, quality metrics, and strategic advantages.
 * 
 * Features:
 * - Interactive house selection
 * - Statistical comparison with visual indicators
 * - Strategic strength/weakness analysis
 * - Lore-accurate military data
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Users, Sword, TrendingUp, Shield, Crown, Swords, Star, Award } from 'lucide-react';
import { HOUSE_TRAITS } from '@/utils/battleLogic';

/**
 * House military data interface
 */
interface HouseData {
  name: string;
  troops: number;
  cavalry: number;
  infantry: number;
  archers: number;
  specialty: string;
  commander: string;
  stronghold: string;
  color: string;
  sigil: string;
  discipline: number;
  morale: number;
  equipment: number;
  description: string;
}

/**
 * Statistical comparison advantage types
 */
type AdvantageType = 'advantage' | 'disadvantage' | 'equal';

/**
 * Army Comparison Tool Component
 * 
 * Allows users to select and compare military capabilities between two Great Houses.
 * Provides detailed statistical analysis, visual comparisons, and strategic insights.
 * 
 * @returns JSX.Element The complete army comparison interface
 */
const ArmyComparisonTool: React.FC = () => {
  // State for selected houses
  const [house1, setHouse1] = useState<string>('');
  const [house2, setHouse2] = useState<string>('');

  /**
   * Military data for all Great Houses based on Game of Thrones lore
   * Data includes troop numbers, composition, quality metrics, and strategic information
   */
  const armyData: Record<string, HouseData> = {
    'house-tyrell': {
      name: 'House Tyrell',
      troops: 80000,
      cavalry: 20000,
      infantry: 50000,
      archers: 10000,
      specialty: 'Knights & Heavy Cavalry',
      commander: 'Randyll Tarly',
      stronghold: 'Highgarden',
      color: 'text-green-400',
      sigil: '🌹',
      discipline: 85,
      morale: 90,
      equipment: 90,
      description: 'The Reach commands the largest and best-equipped army in Westeros'
    },
    'house-lannister': {
      name: 'House Lannister',
      troops: 60000,
      cavalry: 15000,
      infantry: 35000,
      archers: 10000,
      specialty: 'Gold & Professional Army',
      commander: 'Tywin Lannister',
      stronghold: 'Casterly Rock',
      color: 'text-yellow-400',
      sigil: '🦁',
      discipline: 95,
      morale: 80,
      equipment: 95,
      description: 'Superior equipment and training funded by Lannister gold'
    },
    'house-stark': {
      name: 'House Stark',
      troops: 45000,
      cavalry: 8000,
      infantry: 30000,
      archers: 7000,
      specialty: 'Heavy Infantry & Winter Warfare',
      commander: 'Robb Stark',
      stronghold: 'Winterfell',
      color: 'text-slate-400',
      sigil: '🐺',
      discipline: 90,
      morale: 85,
      equipment: 80,
      description: 'Battle-hardened northmen excel in disciplined formations'
    },
    'house-baratheon': {
      name: 'House Baratheon',
      troops: 35000,
      cavalry: 10000,
      infantry: 20000,
      archers: 5000,
      specialty: 'Storm Knights & Battle Fury',
      commander: 'Robert Baratheon',
      stronghold: 'Storm\'s End',
      color: 'text-amber-500',
      sigil: '🦌',
      discipline: 88,
      morale: 92,
      equipment: 85,
      description: 'Fierce warriors known for their strength and courage'
    },
    'house-martell': {
      name: 'House Martell',
      troops: 25000,
      cavalry: 5000,
      infantry: 15000,
      archers: 5000,
      specialty: 'Guerrilla Warfare & Desert Tactics',
      commander: 'Oberyn Martell',
      stronghold: 'Sunspear',
      color: 'text-orange-400',
      sigil: '☀️',
      discipline: 75,
      morale: 95,
      equipment: 70,
      description: 'Masters of unconventional warfare and hit-and-run tactics'
    },
    'house-arryn': {
      name: 'House Arryn',
      troops: 15000,
      cavalry: 3000,
      infantry: 10000,
      archers: 2000,
      specialty: 'Mountain Defense & Vale Knights',
      commander: 'Jon Arryn',
      stronghold: 'The Eyrie',
      color: 'text-blue-300',
      sigil: '🦅',
      discipline: 82,
      morale: 80,
      equipment: 75,
      description: 'Elite defenders of mountain passes with superior positioning'
    }
  };

  const houses = Object.keys(armyData);
  const selectedHouse1 = house1 ? armyData[house1] : null;
  const selectedHouse2 = house2 ? armyData[house2] : null;

  /**
   * Clears both house selections and resets the comparison
   */
  const clearComparison = (): void => {
    setHouse1('');
    setHouse2('');
  };

  /**
   * Determines the advantage type between two numerical values
   * 
   * @param value1 - First value to compare
   * @param value2 - Second value to compare
   * @returns AdvantageType indicating which value is superior
   */
  const getAdvantage = (value1: number, value2: number): AdvantageType => {
    if (value1 > value2) return 'advantage';
    if (value1 < value2) return 'disadvantage';
    return 'equal';
  };

  /**
   * Statistical Comparison Component
   * 
   * Renders a side-by-side comparison of a specific metric between two houses
   * with visual indicators for advantages and disadvantages.
   * 
   * @param props - Component properties
   * @param props.label - Display label for the statistic
   * @param props.value1 - Value for the first house
   * @param props.value2 - Value for the second house
   * @param props.icon - Lucide icon component for the statistic
   * @param props.house1Color - Tailwind color class for house 1
   * @param props.house2Color - Tailwind color class for house 2
   * @param props.showAsPercent - Whether to display values as percentages
   */
  interface StatComparisonProps {
    label: string;
    value1: number | string;
    value2: number | string;
    icon: React.ComponentType<{ className?: string }>;
    house1Color: string;
    house2Color: string;
    showAsPercent?: boolean;
  }

  const StatComparison: React.FC<StatComparisonProps> = ({ 
    label, 
    value1, 
    value2, 
    icon: Icon, 
    house1Color, 
    house2Color, 
    showAsPercent = false 
  }) => {
    // Only calculate advantages for numerical values
    const advantage1 = typeof value1 === 'number' && typeof value2 === 'number' 
      ? getAdvantage(value1, value2) 
      : 'equal';
    const advantage2 = typeof value1 === 'number' && typeof value2 === 'number' 
      ? getAdvantage(value2, value1) 
      : 'equal';

    /**
     * Returns appropriate styling classes based on advantage type
     */
    const getAdvantageClass = (advantage: AdvantageType): string => {
      switch (advantage) {
        case 'advantage':
          return 'bg-green-900/30 border-green-500/50';
        case 'disadvantage':
          return 'bg-red-900/30 border-red-500/50';
        default:
          return 'bg-iron-900/30 border-iron-500/50';
      }
    };

    /**
     * Formats display value based on type and configuration
     */
    const formatValue = (value: number | string): string => {
      if (typeof value === 'string') return value;
      return showAsPercent ? `${value}%` : value.toLocaleString();
    };

    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2 mb-2">
          <Icon className="h-4 w-4 text-gold-500" />
          <span className="font-cormorant font-semibold">{label}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className={`text-center p-3 rounded-lg border ${getAdvantageClass(advantage1)}`}>
            <div className={`text-lg font-bold ${house1Color}`}>
              {formatValue(value1)}
            </div>
            {advantage1 === 'advantage' && (
              <div className="text-xs text-green-400 mt-1">Advantage</div>
            )}
          </div>
          <div className={`text-center p-3 rounded-lg border ${getAdvantageClass(advantage2)}`}>
            <div className={`text-lg font-bold ${house2Color}`}>
              {formatValue(value2)}
            </div>
            {advantage2 === 'advantage' && (
              <div className="text-xs text-green-400 mt-1">Advantage</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* House Selection Interface */}
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

      {/* Comparison Results Display */}
      {selectedHouse1 && selectedHouse2 && (
        <div className="space-y-6">
          {/* House Header Cards */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="parchment-card text-center">
              <CardContent className="pt-6">
                <div className={`text-6xl mb-2 ${selectedHouse1.color}`}>
                  {selectedHouse1.sigil}
                </div>
                <h3 className={`text-2xl font-cinzel font-bold ${selectedHouse1.color}`}>
                  {selectedHouse1.name}
                </h3>
                <p className="text-sm text-foreground/60 mb-2">{selectedHouse1.stronghold}</p>
                <p className="text-xs text-foreground/50">{selectedHouse1.description}</p>
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
                <p className="text-sm text-foreground/60 mb-2">{selectedHouse2.stronghold}</p>
                <p className="text-xs text-foreground/50">{selectedHouse2.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Military Analysis */}
          <Card className="parchment-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-gold-400">Military Analysis</span>
                <Button variant="outline" onClick={clearComparison}>
                  <Swords className="h-4 w-4 mr-2" />
                  Clear Comparison
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Army Composition Statistics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-cinzel font-bold text-gold-400 border-b border-gold-500/30 pb-2">
                    Army Composition
                  </h3>
                  
                  <StatComparison
                    label="Total Forces"
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
                </div>

                {/* Military Quality Metrics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-cinzel font-bold text-gold-400 border-b border-gold-500/30 pb-2">
                    Military Quality
                  </h3>

                  <StatComparison
                    label="Discipline"
                    value1={selectedHouse1.discipline}
                    value2={selectedHouse2.discipline}
                    icon={Star}
                    house1Color={selectedHouse1.color}
                    house2Color={selectedHouse2.color}
                    showAsPercent={true}
                  />

                  <StatComparison
                    label="Morale"
                    value1={selectedHouse1.morale}
                    value2={selectedHouse2.morale}
                    icon={Crown}
                    house1Color={selectedHouse1.color}
                    house2Color={selectedHouse2.color}
                    showAsPercent={true}
                  />

                  <StatComparison
                    label="Equipment"
                    value1={selectedHouse1.equipment}
                    value2={selectedHouse2.equipment}
                    icon={Award}
                    house1Color={selectedHouse1.color}
                    house2Color={selectedHouse2.color}
                    showAsPercent={true}
                  />

                  <StatComparison
                    label="Military Specialty"
                    value1={selectedHouse1.specialty}
                    value2={selectedHouse2.specialty}
                    icon={Swords}
                    house1Color={selectedHouse1.color}
                    house2Color={selectedHouse2.color}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategic Analysis Section */}
          <Card className="parchment-card">
            <CardHeader>
              <CardTitle className="text-gold-400">Strategic Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* House 1 Strengths */}
                <div>
                  <h4 className={`font-cinzel font-bold mb-3 ${selectedHouse1.color}`}>
                    {selectedHouse1.name} Strengths
                  </h4>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    {selectedHouse1.troops > selectedHouse2.troops && (
                      <li className="flex items-center space-x-2">
                        <Users className="h-3 w-3 text-green-400" />
                        <span>Superior numbers ({(selectedHouse1.troops - selectedHouse2.troops).toLocaleString()} more troops)</span>
                      </li>
                    )}
                    {selectedHouse1.cavalry > selectedHouse2.cavalry && (
                      <li className="flex items-center space-x-2">
                        <Sword className="h-3 w-3 text-green-400" />
                        <span>Stronger cavalry force</span>
                      </li>
                    )}
                    {selectedHouse1.discipline > selectedHouse2.discipline && (
                      <li className="flex items-center space-x-2">
                        <Star className="h-3 w-3 text-green-400" />
                        <span>Superior discipline ({selectedHouse1.discipline}% vs {selectedHouse2.discipline}%)</span>
                      </li>
                    )}
                    {selectedHouse1.equipment > selectedHouse2.equipment && (
                      <li className="flex items-center space-x-2">
                        <Award className="h-3 w-3 text-green-400" />
                        <span>Better equipment quality</span>
                      </li>
                    )}
                    <li className="flex items-center space-x-2">
                      <Crown className="h-3 w-3 text-gold-400" />
                      <span>Specializes in {selectedHouse1.specialty}</span>
                    </li>
                  </ul>
                </div>
                
                {/* House 2 Strengths */}
                <div>
                  <h4 className={`font-cinzel font-bold mb-3 ${selectedHouse2.color}`}>
                    {selectedHouse2.name} Strengths
                  </h4>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    {selectedHouse2.troops > selectedHouse1.troops && (
                      <li className="flex items-center space-x-2">
                        <Users className="h-3 w-3 text-green-400" />
                        <span>Superior numbers ({(selectedHouse2.troops - selectedHouse1.troops).toLocaleString()} more troops)</span>
                      </li>
                    )}
                    {selectedHouse2.cavalry > selectedHouse1.cavalry && (
                      <li className="flex items-center space-x-2">
                        <Sword className="h-3 w-3 text-green-400" />
                        <span>Stronger cavalry force</span>
                      </li>
                    )}
                    {selectedHouse2.discipline > selectedHouse1.discipline && (
                      <li className="flex items-center space-x-2">
                        <Star className="h-3 w-3 text-green-400" />
                        <span>Superior discipline ({selectedHouse2.discipline}% vs {selectedHouse1.discipline}%)</span>
                      </li>
                    )}
                    {selectedHouse2.equipment > selectedHouse1.equipment && (
                      <li className="flex items-center space-x-2">
                        <Award className="h-3 w-3 text-green-400" />
                        <span>Better equipment quality</span>
                      </li>
                    )}
                    <li className="flex items-center space-x-2">
                      <Crown className="h-3 w-3 text-gold-400" />
                      <span>Specializes in {selectedHouse2.specialty}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State when no houses selected */}
      {(!selectedHouse1 || !selectedHouse2) && (
        <Card className="parchment-card">
          <CardContent className="text-center py-12">
            <Swords className="h-16 w-16 text-gold-500 mx-auto mb-4" />
            <p className="text-lg font-cormorant text-foreground/70">
              Select two houses to analyze their military capabilities
            </p>
            <p className="text-sm text-foreground/50 mt-2">
              Compare troop numbers, quality, and tactical advantages based on Game of Thrones lore
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ArmyComparisonTool;

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Sword, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Crown,
  MapPin,
  Clock,
  Users
} from 'lucide-react';

// Add type definitions for better TypeScript support
interface CompositionUnit {
  count: number;
  quality: number;
  specialty: string;
}

interface Commander {
  name: string;
  specialty: string;
  reputation: number;
}

interface Battle {
  name: string;
  outcome: string;
  impact: string;
}

interface StrengthWeakness {
  category: string;
  rating: number;
  description: string;
}

interface HouseAnalytics {
  name: string;
  sigil: string;
  region: string;
  totalForces: number;
  color: string;
  borderColor: string;
  strengths: StrengthWeakness[];
  weaknesses: StrengthWeakness[];
  composition: {
    infantry: CompositionUnit;
    cavalry: CompositionUnit;
    archers: CompositionUnit;
  };
  notable_commanders: Commander[];
  strategic_assets: string[];
  recent_battles: Battle[];
}

const MilitaryAnalytics = () => {
  const [selectedHouse, setSelectedHouse] = useState('tyrell');

  const houseAnalytics: Record<string, HouseAnalytics> = {
    tyrell: {
      name: 'House Tyrell',
      sigil: '🌹',
      region: 'The Reach',
      totalForces: 80000,
      color: 'text-green-400',
      borderColor: 'border-green-500',
      strengths: [
        { category: 'Heavy Cavalry', rating: 95, description: 'Finest knights in Westeros' },
        { category: 'Numbers', rating: 90, description: 'Largest standing army' },
        { category: 'Equipment Quality', rating: 88, description: 'Well-funded and equipped' },
        { category: 'Logistics', rating: 85, description: 'Excellent supply lines from fertile lands' },
        { category: 'Open Field Combat', rating: 92, description: 'Devastating cavalry charges' }
      ],
      weaknesses: [
        { category: 'Mountain Warfare', rating: 35, description: 'Cavalry ineffective in rough terrain' },
        { category: 'Naval Combat', rating: 40, description: 'Limited naval experience' },
        { category: 'Siege Defense', rating: 50, description: 'Prefer offensive operations' },
        { category: 'Winter Warfare', rating: 30, description: 'Struggle in harsh conditions' }
      ],
      composition: {
        infantry: { count: 50000, quality: 80, specialty: 'Pike formations' },
        cavalry: { count: 20000, quality: 95, specialty: 'Heavy knights' },
        archers: { count: 10000, quality: 75, specialty: 'Longbows' }
      },
      notable_commanders: [
        { name: 'Randyll Tarly', specialty: 'Field tactics', reputation: 95 },
        { name: 'Mace Tyrell', specialty: 'Logistics', reputation: 70 },
        { name: 'Garlan Tyrell', specialty: 'Swordsmanship', reputation: 85 }
      ],
      strategic_assets: [
        'Highgarden - Impregnable castle',
        'Oldtown - Major port and learning center',
        'The Reach - Most fertile lands in Westeros',
        'Hightower Fleet - Significant naval power'
      ],
      recent_battles: [
        { name: 'Battle of Blackwater', outcome: 'Victory', impact: 'Saved King\'s Landing' },
        { name: 'Siege of Storm\'s End', outcome: 'Victory', impact: 'Starved out garrison' }
      ]
    },
    lannister: {
      name: 'House Lannister',
      sigil: '🦁',
      region: 'The Westerlands',
      totalForces: 60000,
      color: 'text-yellow-400',
      borderColor: 'border-yellow-500',
      strengths: [
        { category: 'Professional Army', rating: 95, description: 'Best trained and equipped soldiers' },
        { category: 'Discipline', rating: 92, description: 'Superior military organization' },
        { category: 'Equipment Quality', rating: 98, description: 'Finest arms and armor money can buy' },
        { category: 'Siege Warfare', rating: 85, description: 'Excellent siege engines and tactics' },
        { category: 'Leadership', rating: 90, description: 'Experienced commanders' }
      ],
      weaknesses: [
        { category: 'Numbers', rating: 45, description: 'Smaller army than major houses' },
        { category: 'Popular Support', rating: 25, description: 'Widely hated and feared' },
        { category: 'Naval Combat', rating: 35, description: 'Limited fleet' },
        { category: 'Guerrilla Warfare', rating: 40, description: 'Struggle against irregular tactics' }
      ],
      composition: {
        infantry: { count: 35000, quality: 92, specialty: 'Professional soldiers' },
        cavalry: { count: 15000, quality: 88, specialty: 'Well-armed knights' },
        archers: { count: 10000, quality: 85, specialty: 'Crossbowmen' }
      },
      notable_commanders: [
        { name: 'Tywin Lannister', specialty: 'Strategic planning', reputation: 98 },
        { name: 'Jaime Lannister', specialty: 'Cavalry command', reputation: 90 },
        { name: 'Kevan Lannister', specialty: 'Logistics', reputation: 85 }
      ],
      strategic_assets: [
        'Casterly Rock - Nearly impregnable fortress',
        'Lannisport - Major trading port',
        'Gold mines - Unlimited funding for war',
        'Golden Tooth - Controls key mountain pass'
      ],
      recent_battles: [
        { name: 'Sack of King\'s Landing', outcome: 'Victory', impact: 'Ended Robert\'s Rebellion' },
        { name: 'Battle of Green Fork', outcome: 'Victory', impact: 'Defeated northern army' }
      ]
    },
    stark: {
      name: 'House Stark',
      sigil: '🐺',
      region: 'The North',
      totalForces: 45000,
      color: 'text-slate-400',
      borderColor: 'border-slate-500',
      strengths: [
        { category: 'Winter Warfare', rating: 95, description: 'Unmatched in cold conditions' },
        { category: 'Loyalty', rating: 98, description: 'Absolute devotion from bannermen' },
        { category: 'Defensive Fighting', rating: 90, description: 'Excellent at holding positions' },
        { category: 'Honor & Morale', rating: 92, description: 'Fight with unwavering determination' },
        { category: 'Infantry Tactics', rating: 88, description: 'Disciplined shield walls' }
      ],
      weaknesses: [
        { category: 'Numbers', rating: 40, description: 'Smaller population base' },
        { category: 'Cavalry', rating: 35, description: 'Limited heavy horse' },
        { category: 'Naval Combat', rating: 25, description: 'Minimal naval tradition' },
        { category: 'Political Intrigue', rating: 20, description: 'Too honorable for southern politics' }
      ],
      composition: {
        infantry: { count: 30000, quality: 88, specialty: 'Heavy infantry' },
        cavalry: { count: 8000, quality: 70, specialty: 'Light horse' },
        archers: { count: 7000, quality: 80, specialty: 'Hunters and rangers' }
      },
      notable_commanders: [
        { name: 'Eddard Stark', specialty: 'Honor and loyalty', reputation: 90 },
        { name: 'Robb Stark', specialty: 'Tactical innovation', reputation: 85 },
        { name: 'Jon Snow', specialty: 'Unconventional warfare', reputation: 80 }
      ],
      strategic_assets: [
        'Winterfell - Ancient stronghold',
        'The Wall - Ultimate defensive position',
        'Moat Cailin - Controls neck of continent',
        'White Harbor - Northern fleet base'
      ],
      recent_battles: [
        { name: 'Battle of the Bastards', outcome: 'Victory', impact: 'Retook Winterfell' },
        { name: 'Battle of Whispering Wood', outcome: 'Victory', impact: 'Captured Jaime Lannister' }
      ]
    },
    baratheon: {
      name: 'House Baratheon',
      sigil: '🦌',
      region: 'The Stormlands',
      totalForces: 35000,
      color: 'text-amber-500',
      borderColor: 'border-amber-500',
      strengths: [
        { category: 'Individual Combat', rating: 95, description: 'Legendary warriors' },
        { category: 'Storm Fighting', rating: 90, description: 'Excel in harsh weather' },
        { category: 'Siege Defense', rating: 88, description: 'Storm\'s End never falls' },
        { category: 'Battle Fury', rating: 92, description: 'Fierce and relentless fighters' },
        { category: 'Leadership', rating: 85, description: 'Charismatic war leaders' }
      ],
      weaknesses: [
        { category: 'Numbers', rating: 35, description: 'Smaller population' },
        { category: 'Discipline', rating: 45, description: 'Sometimes too aggressive' },
        { category: 'Logistics', rating: 50, description: 'Poor lands, limited supplies' },
        { category: 'Political Unity', rating: 30, description: 'Brothers divided the realm' }
      ],
      composition: {
        infantry: { count: 20000, quality: 85, specialty: 'Storm warriors' },
        cavalry: { count: 10000, quality: 80, specialty: 'Knights of storms' },
        archers: { count: 5000, quality: 75, specialty: 'Storm archers' }
      },
      notable_commanders: [
        { name: 'Robert Baratheon', specialty: 'Personal combat', reputation: 95 },
        { name: 'Stannis Baratheon', specialty: 'Siege warfare', reputation: 90 },
        { name: 'Renly Baratheon', specialty: 'Inspiration', reputation: 75 }
      ],
      strategic_assets: [
        'Storm\'s End - Impregnable fortress',
        'Dragonstone - Strategic island stronghold',
        'Cape Wrath - Controls sea approaches',
        'Royal Fleet - Significant naval power'
      ],
      recent_battles: [
        { name: 'Battle of the Trident', outcome: 'Victory', impact: 'Killed Prince Rhaegar' },
        { name: 'Siege of Storm\'s End', outcome: 'Defensive Victory', impact: 'Held against Tyrell siege' }
      ]
    }
  };

  const currentHouse = houseAnalytics[selectedHouse];

  const StrengthWeaknessBar = ({ category, rating, description, isWeakness = false }: {
    category: string;
    rating: number;
    description: string;
    isWeakness?: boolean;
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-cormorant font-semibold">{category}</span>
        <span className={`text-sm ${isWeakness ? 'text-red-400' : 'text-green-400'}`}>
          {rating}%
        </span>
      </div>
      <Progress 
        value={rating} 
        className={`h-2 ${isWeakness ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`}
      />
      <p className="text-xs text-foreground/60">{description}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* House Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(houseAnalytics).map(([key, house]) => (
          <Card 
            key={key}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
              selectedHouse === key ? `${house.borderColor} border-2 bg-card/80` : 'hover:bg-card/60'
            }`}
            onClick={() => setSelectedHouse(key)}
          >
            <CardContent className="text-center p-4">
              <div className={`text-4xl mb-2 ${house.color}`}>{house.sigil}</div>
              <h3 className={`font-cinzel font-bold ${house.color}`}>{house.name}</h3>
              <p className="text-xs text-foreground/60">{house.region}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="strengths">Strengths</TabsTrigger>
          <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
          <TabsTrigger value="composition">Army Details</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 parchment-card">
              <CardHeader>
                <CardTitle className={`${currentHouse.color} flex items-center space-x-2`}>
                  <span className="text-2xl">{currentHouse.sigil}</span>
                  <span>{currentHouse.name} Military Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gold-500" />
                    <span><strong>Region:</strong> {currentHouse.region}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gold-500" />
                    <span><strong>Total Forces:</strong> {currentHouse.totalForces.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-cinzel font-bold text-gold-400">Strategic Assets</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentHouse.strategic_assets.map((asset, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                        <span className="text-sm">{asset}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-cinzel font-bold text-gold-400">Recent Military Actions</h4>
                  {currentHouse.recent_battles.map((battle, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-iron-900/30 rounded">
                      <span className="font-cormorant font-semibold">{battle.name}</span>
                      <Badge variant={battle.outcome === 'Victory' ? 'default' : 'destructive'}>
                        {battle.outcome}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="parchment-card">
                <CardHeader>
                  <CardTitle className="text-gold-400">Military Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-cinzel font-bold text-gold-400 mb-2">
                        {Math.round(
                          currentHouse.strengths.reduce((sum, s) => sum + s.rating, 0) / 
                          currentHouse.strengths.length
                        )}%
                      </div>
                      <p className="text-sm text-foreground/60">Overall Military Effectiveness</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="parchment-card">
                <CardHeader>
                  <CardTitle className="text-gold-400">Top Commanders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentHouse.notable_commanders.map((commander, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-cormorant font-semibold">{commander.name}</span>
                        <span className="text-sm text-gold-400">{commander.reputation}%</span>
                      </div>
                      <p className="text-xs text-foreground/60">{commander.specialty}</p>
                      <Progress value={commander.reputation} className="h-1" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strengths" className="space-y-6">
          <Card className="parchment-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="h-6 w-6" />
                <span>Military Strengths Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentHouse.strengths.map((strength, index) => (
                <StrengthWeaknessBar
                  key={index}
                  category={strength.category}
                  rating={strength.rating}
                  description={strength.description}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weaknesses" className="space-y-6">
          <Card className="parchment-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-400">
                <AlertTriangle className="h-6 w-6" />
                <span>Military Vulnerabilities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentHouse.weaknesses.map((weakness, index) => (
                <StrengthWeaknessBar
                  key={index}
                  category={weakness.category}
                  rating={weakness.rating}
                  description={weakness.description}
                  isWeakness={true}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="composition" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(currentHouse.composition).map(([type, data]: [string, CompositionUnit]) => (
              <Card key={type} className="parchment-card">
                <CardHeader>
                  <CardTitle className={`${currentHouse.color} flex items-center space-x-2`}>
                    {type === 'infantry' && <Shield className="h-5 w-5" />}
                    {type === 'cavalry' && <Sword className="h-5 w-5" />}
                    {type === 'archers' && <Target className="h-5 w-5" />}
                    <span className="capitalize">{type}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-cinzel font-bold text-gold-400">
                      {data.count.toLocaleString()}
                    </div>
                    <p className="text-sm text-foreground/60">Total Forces</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Quality Rating</span>
                      <span className="text-gold-400">{data.quality}%</span>
                    </div>
                    <Progress value={data.quality} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-sm font-semibold">Specialty:</span>
                    <p className="text-sm text-foreground/70">{data.specialty}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="parchment-card">
              <CardHeader>
                <CardTitle className="text-green-400">Strategic Advantages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentHouse.strengths.slice(0, 3).map((strength, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-cormorant font-semibold">{strength.category}</h4>
                      <p className="text-sm text-foreground/70">{strength.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="parchment-card">
              <CardHeader>
                <CardTitle className="text-red-400">Critical Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentHouse.weaknesses.slice(0, 3).map((weakness, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-cormorant font-semibold">{weakness.category}</h4>
                      <p className="text-sm text-foreground/70">{weakness.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MilitaryAnalytics;

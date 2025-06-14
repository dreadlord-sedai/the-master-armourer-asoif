import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArmyComparisonTool from '@/components/ArmyComparisonTool';
import MilitaryAnalytics from '@/components/MilitaryAnalytics';
import { Sword, Shield, Users, TrendingUp, BarChart3, Map, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const Armies = () => {
  const [selectedEra, setSelectedEra] = useState('war-five-kings');

  const armyData = {
    'war-five-kings': {
      title: 'War of the Five Kings',
      description: 'Military strength during the chaotic period following Robert Baratheon\'s death',
      armies: [
        { house: 'House Tyrell', troops: 80000, cavalry: 20000, infantry: 50000, archers: 10000 },
        { house: 'House Lannister', troops: 60000, cavalry: 15000, infantry: 35000, archers: 10000 },
        { house: 'House Stark', troops: 45000, cavalry: 8000, infantry: 30000, archers: 7000 },
        { house: 'House Baratheon', troops: 35000, cavalry: 10000, infantry: 20000, archers: 5000 },
        { house: 'House Martell', troops: 25000, cavalry: 5000, infantry: 15000, archers: 5000 }
      ]
    }
  };

  const currentData = armyData[selectedEra];

  const tacticalAnalysis = [
    {
      title: 'Northern Infantry Tactics',
      description: 'Stark forces excel in disciplined shield walls and winter warfare',
      icon: Shield,
      color: 'text-slate-400'
    },
    {
      title: 'Reach Cavalry Charges',
      description: 'Tyrell knights dominate open field battles with heavy cavalry',
      icon: Users,
      color: 'text-green-400'
    },
    {
      title: 'Dornish Guerrilla Warfare',
      description: 'Martell forces use hit-and-run tactics in desert terrain',
      icon: Sword,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
              Armies of Westeros
            </h1>
            <p className="text-xl font-cormorant text-foreground/80 max-w-3xl mx-auto">
              Analyze the military might that shapes the fate of kingdoms. 
              From the disciplined ranks of the North to the golden host of the Reach.
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Deep Analytics</TabsTrigger>
              <TabsTrigger value="comparison">Compare Forces</TabsTrigger>
              <TabsTrigger value="tactics">Tactics</TabsTrigger>
              <TabsTrigger value="battles">Historic Battles</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="parchment-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-gold-400">
                        <BarChart3 className="h-6 w-6" />
                        <span>Military Strength Analysis</span>
                      </CardTitle>
                      <CardDescription>
                        {currentData.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {currentData.armies.map((army, index) => (
                          <div key={army.house} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-cormorant font-semibold">{army.house}</span>
                              <span className="text-gold-400 font-bold">{army.troops.toLocaleString()}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-blue-400" />
                                <span>Infantry: {army.infantry.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Sword className="h-4 w-4 text-red-400" />
                                <span>Cavalry: {army.cavalry.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="h-4 w-4 text-green-400" />
                                <span>Archers: {army.archers.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="w-full bg-iron-900 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-gold-600 to-gold-400 h-2 rounded-full"
                                style={{ width: `${(army.troops / 80000) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="parchment-card">
                    <CardHeader>
                      <CardTitle className="text-gold-400">Total Forces</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-cinzel font-bold text-gold-400 mb-2">
                        {currentData.armies.reduce((sum, army) => sum + army.troops, 0).toLocaleString()}
                      </div>
                      <p className="text-sm text-foreground/60">Combined military strength</p>
                    </CardContent>
                  </Card>

                  <Card className="parchment-card">
                    <CardHeader>
                      <CardTitle className="text-gold-400">Largest Army</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-cinzel font-bold text-green-400 mb-2">
                        House Tyrell
                      </div>
                      <p className="text-sm text-foreground/60">80,000 troops strong</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8">
              <Card className="parchment-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gold-400">
                    <Activity className="h-6 w-6" />
                    <span>Military Intelligence & Analytics</span>
                  </CardTitle>
                  <CardDescription>
                    Comprehensive analysis of military capabilities, strengths, weaknesses, and strategic assessments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MilitaryAnalytics />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-8">
              <Card className="parchment-card">
                <CardHeader>
                  <CardTitle className="text-gold-400">Army Comparison Tool</CardTitle>
                  <CardDescription>
                    Compare the military capabilities of different houses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ArmyComparisonTool />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tactics" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tacticalAnalysis.map((tactic, index) => (
                  <Card key={index} className="parchment-card">
                    <CardHeader className="text-center">
                      <tactic.icon className={`h-12 w-12 mx-auto mb-4 ${tactic.color}`} />
                      <CardTitle className="text-gold-400">{tactic.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70 text-center">
                        {tactic.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="battles" className="space-y-8">
              <Card className="parchment-card">
                <CardHeader>
                  <CardTitle className="text-gold-400">Historic Battles</CardTitle>
                  <CardDescription>
                    Famous conflicts that shaped the military landscape of Westeros
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-l-4 border-gold-500 pl-6">
                      <h3 className="text-xl font-cinzel font-bold text-gold-400 mb-2">
                        Battle of the Blackwater
                      </h3>
                      <p className="font-cormorant text-foreground/70">
                        Tyrion's wildfire defense of King's Landing against Stannis Baratheon's fleet.
                      </p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-6">
                      <h3 className="text-xl font-cinzel font-bold text-red-400 mb-2">
                        Battle of the Bastards
                      </h3>
                      <p className="font-cormorant text-foreground/70">
                        Jon Snow's desperate stand against Ramsay Bolton for control of Winterfell.
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h3 className="text-xl font-cinzel font-bold text-blue-400 mb-2">
                        Battle of the Trident
                      </h3>
                      <p className="font-cormorant text-foreground/70">
                        Robert Baratheon's hammer crushes Rhaegar Targaryen and the royal army.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Armies;

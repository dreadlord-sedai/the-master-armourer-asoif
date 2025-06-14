
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, TrendingUp, Ship, Wheat, Pickaxe, Crown } from 'lucide-react';

const Economy = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const economicData = [
    {
      region: 'The Reach',
      house: 'House Tyrell',
      mainExports: ['Grain', 'Wine', 'Fruits'],
      wealth: 95,
      tradeRoutes: 8,
      specialties: ['Agriculture', 'Food Production'],
      description: 'The breadbasket of Westeros, feeding much of the continent.'
    },
    {
      region: 'Westerlands',
      house: 'House Lannister',
      mainExports: ['Gold', 'Silver', 'Precious Metals'],
      wealth: 100,
      tradeRoutes: 6,
      specialties: ['Mining', 'Banking'],
      description: 'Richest region in Westeros due to extensive gold mines.'
    },
    {
      region: 'The North',
      house: 'House Stark',
      mainExports: ['Furs', 'Timber', 'Iron'],
      wealth: 45,
      tradeRoutes: 4,
      specialties: ['Forestry', 'Iron Working'],
      description: 'Harsh but resource-rich lands with strong lumber industry.'
    },
    {
      region: 'Dorne',
      house: 'House Martell',
      mainExports: ['Spices', 'Wine', 'Citrus'],
      wealth: 60,
      tradeRoutes: 5,
      specialties: ['Spice Trade', 'Desert Agriculture'],
      description: 'Exotic goods and spices flow through Dornish markets.'
    }
  ];

  const tradeRoutes = [
    {
      from: 'Oldtown',
      to: "King's Landing",
      goods: ['Books', 'Knowledge', 'Citrus'],
      value: 50000,
      danger: 'Low'
    },
    {
      from: 'Lannisport',
      to: 'Braavos',
      goods: ['Gold', 'Wine', 'Crafts'],
      value: 150000,
      danger: 'Medium'
    },
    {
      from: 'White Harbor',
      to: "King's Landing",
      goods: ['Fish', 'Furs', 'Amber'],
      value: 75000,
      danger: 'Low'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
            Economic Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the trade networks, wealth, and economic power of the Seven Kingdoms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Regional Economics */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  Regional Wealth & Trade
                </CardTitle>
                <CardDescription>
                  Economic power and trade specializations of the major regions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {economicData.map((region, index) => (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-colors ${selectedRegion === region.region ? 'ring-2 ring-gold-500' : ''}`}
                    onClick={() => setSelectedRegion(region.region)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{region.region}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{region.house}</Badge>
                          <div className="flex items-center gap-1">
                            <Crown className="h-4 w-4 text-gold-500" />
                            <span className="text-sm font-medium">{region.wealth}/100</span>
                          </div>
                        </div>
                      </div>
                      <CardDescription>{region.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Main Exports: </span>
                          <div className="flex gap-1 mt-1">
                            {region.mainExports.map(export_ => (
                              <Badge key={export_} variant="secondary">{export_}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Ship className="h-4 w-4" />
                            Trade Routes: {region.tradeRoutes}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            Specialties: {region.specialties.join(', ')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ship className="h-5 w-5" />
                  Major Trade Routes
                </CardTitle>
                <CardDescription>
                  Active commerce paths between major cities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tradeRoutes.map((route, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{route.from} → {route.to}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={route.danger === 'Low' ? 'default' : route.danger === 'Medium' ? 'secondary' : 'destructive'}>
                          {route.danger} Risk
                        </Badge>
                        <span className="text-gold-500 font-medium">{route.value.toLocaleString()} dragons</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {route.goods.map(good => (
                        <Badge key={good} variant="outline">{good}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Economic Stats Sidebar */}
          <div className="space-y-6">
            {selectedRegion && (
              <Card>
                <CardHeader>
                  <CardTitle>Regional Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const region = economicData.find(r => r.region === selectedRegion);
                    if (!region) return null;
                    
                    return (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Wealth Level</h4>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gold-500 h-2 rounded-full" 
                              style={{ width: `${region.wealth}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground">{region.wealth}/100</span>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Primary Industries</h4>
                          <div className="space-y-2">
                            {region.specialties.map(specialty => (
                              <div key={specialty} className="flex items-center gap-2">
                                <Pickaxe className="h-4 w-4" />
                                <span className="text-sm">{specialty}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Economic Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Regions</span>
                  <span className="font-semibold">{economicData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Trade Routes</span>
                  <span className="font-semibold">{tradeRoutes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Trade Value</span>
                  <span className="font-semibold text-gold-500">
                    {tradeRoutes.reduce((sum, route) => sum + route.value, 0).toLocaleString()} dragons
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-gold-500" />
                  <span className="text-sm">Precious Metals - Mining</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wheat className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Agriculture - Food Production</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ship className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Maritime - Fishing & Trade</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Economic Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">Simulate Trade War</Button>
                <Button variant="outline" className="w-full">Calculate Tax Revenue</Button>
                <Button variant="outline" className="w-full">Analyze Market Trends</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Economy;

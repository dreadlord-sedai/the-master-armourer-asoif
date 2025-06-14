
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Book, Scroll, Sword, Crown, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Chronicles = () => {
  const battles = [
    {
      name: 'Battle of the Blackwater',
      year: '299 AC',
      location: 'King\'s Landing',
      type: 'Naval Siege',
      victor: 'House Lannister',
      description: 'Tyrion\'s brilliant use of wildfire destroys Stannis\'s fleet and saves King\'s Landing.',
      casualties: 'Heavy',
      significance: 'Secured Joffrey\'s reign and eliminated Stannis as a threat to the capital.',
      commanders: ['Tyrion Lannister', 'Stannis Baratheon', 'Ser Imry Florent']
    },
    {
      name: 'Battle of the Bastards',
      year: '300 AC',
      location: 'Winterfell',
      type: 'Field Battle',
      victor: 'House Stark',
      description: 'Jon Snow\'s desperate gambit to retake Winterfell with last-minute rescue by the Vale.',
      casualties: 'Massive',
      significance: 'Restored Stark rule in the North and eliminated House Bolton.',
      commanders: ['Jon Snow', 'Ramsay Bolton', 'Petyr Baelish']
    },
    {
      name: 'Battle of the Trident',
      year: '283 AC',
      location: 'The Trident',
      type: 'Field Battle',
      victor: 'Robert\'s Rebellion',
      description: 'Robert Baratheon\'s hammer crushes Prince Rhaegar, ending Targaryen rule.',
      casualties: 'Moderate',
      significance: 'Decisive victory that ended Robert\'s Rebellion and established Baratheon dynasty.',
      commanders: ['Robert Baratheon', 'Prince Rhaegar Targaryen', 'Ned Stark']
    },
    {
      name: 'Sack of King\'s Landing',
      year: '283 AC',
      location: 'King\'s Landing',
      type: 'Siege',
      victor: 'House Lannister',
      description: 'Tywin\'s brutal sack of the capital, killing the royal family and securing Robert\'s throne.',
      casualties: 'Civilian Massacre',
      significance: 'Demonstrated Lannister power and secured their position with the new king.',
      commanders: ['Tywin Lannister', 'Ser Gregor Clegane', 'Ser Amory Lorch']
    }
  ];

  const rebellions = [
    {
      name: 'Robert\'s Rebellion',
      period: '282-283 AC',
      cause: 'Lyanna Stark\'s alleged abduction by Prince Rhaegar',
      outcome: 'Fall of House Targaryen',
      description: 'The war that ended three centuries of Targaryen rule in Westeros.'
    },
    {
      name: 'War of the Five Kings',
      period: '298-300 AC',
      cause: 'Disputed succession after Robert Baratheon\'s death',
      outcome: 'Lannister victory, realm devastated',
      description: 'Multiple claimants tear the Seven Kingdoms apart in civil war.'
    },
    {
      name: 'Greyjoy Rebellion',
      period: '289 AC',
      cause: 'Balon Greyjoy\'s bid for Iron Islands independence',
      outcome: 'Crushing defeat of the Iron Islands',
      description: 'Failed attempt by the Iron Islands to break free from the Iron Throne.'
    }
  ];

  const events = [
    {
      name: 'The Long Night',
      period: 'Age of Heroes',
      type: 'Mythical',
      description: 'The legendary winter that lasted a generation, when the Others first came.',
      impact: 'Foundation of the Night\'s Watch and construction of the Wall'
    },
    {
      name: 'Aegon\'s Conquest',
      period: '2-1 BC',
      type: 'Historical',
      description: 'Aegon the Conqueror unites six of the seven kingdoms under Targaryen rule.',
      impact: 'Establishment of the Iron Throne and three centuries of dragon rule'
    },
    {
      name: 'Dance of the Dragons',
      period: '129-131 AC',
      type: 'Civil War',
      description: 'Targaryen civil war that nearly destroyed the dragon lords.',
      impact: 'Decimation of dragons and weakening of Targaryen power'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
              Chronicles & Lore
            </h1>
            <p className="text-xl font-cormorant text-foreground/80 max-w-3xl mx-auto">
              The great tapestry of Westeros, woven from blood and ambition. 
              From the Age of Heroes to the War of Five Kings, these are the events that shaped a realm.
            </p>
          </div>

          <Tabs defaultValue="battles" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="battles">Great Battles</TabsTrigger>
              <TabsTrigger value="rebellions">Wars & Rebellions</TabsTrigger>
              <TabsTrigger value="events">Historic Events</TabsTrigger>
            </TabsList>

            <TabsContent value="battles" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {battles.map((battle, index) => (
                  <Card key={index} className="parchment-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl font-cinzel text-gold-400 mb-2">
                            {battle.name}
                          </CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-foreground/60 mb-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{battle.year}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{battle.location}</span>
                            </div>
                          </div>
                        </div>
                        <Sword className="h-8 w-8 text-red-500" />
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant="outline">{battle.type}</Badge>
                        <Badge variant="secondary">Victor: {battle.victor}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="font-cormorant text-foreground/80">
                        {battle.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-gold-400">Casualties:</span>
                          <span className="ml-2">{battle.casualties}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gold-400">Commanders:</span>
                          <div className="ml-2">
                            {battle.commanders.map((commander, i) => (
                              <div key={i} className="text-xs">{commander}</div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-l-4 border-gold-500 pl-4">
                        <p className="text-sm font-cormorant italic text-foreground/70">
                          <span className="font-semibold">Significance:</span> {battle.significance}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rebellions" className="space-y-6">
              <div className="space-y-6">
                {rebellions.map((rebellion, index) => (
                  <Card key={index} className="parchment-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl font-cinzel text-gold-400 mb-2">
                            {rebellion.name}
                          </CardTitle>
                          <div className="flex items-center space-x-1 text-sm text-foreground/60 mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>{rebellion.period}</span>
                          </div>
                        </div>
                        <Crown className="h-8 w-8 text-gold-500" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="font-cormorant text-lg text-foreground/80">
                        {rebellion.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="font-semibold text-gold-400">Cause:</span>
                          <p className="text-sm font-cormorant">{rebellion.cause}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gold-400">Outcome:</span>
                          <p className="text-sm font-cormorant">{rebellion.outcome}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <Card key={index} className="parchment-card">
                    <CardHeader className="text-center">
                      <Book className="h-12 w-12 text-gold-500 mx-auto mb-4" />
                      <CardTitle className="text-xl font-cinzel text-gold-400">
                        {event.name}
                      </CardTitle>
                      <div className="flex justify-center space-x-2">
                        <Badge variant="outline">{event.period}</Badge>
                        <Badge variant="secondary">{event.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="font-cormorant text-sm text-foreground/80">
                        {event.description}
                      </p>
                      <div className="border-l-4 border-gold-500 pl-4">
                        <p className="text-xs font-cormorant italic text-foreground/70">
                          <span className="font-semibold">Impact:</span> {event.impact}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Chronicles;

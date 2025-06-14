
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Sword, Users, Crown, Shield, Play } from 'lucide-react';

const Tournaments = () => {
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);

  const tournaments = [
    {
      id: 'tourney-of-harrenhal',
      name: 'The Great Tourney of Harrenhal',
      type: 'Historical',
      date: '281 AC',
      location: 'Harrenhal',
      description: 'The grandest tournament in living memory, where Prince Rhaegar crowned Lyanna Stark as Queen of Love and Beauty.',
      events: ['Jousting', 'Melee', 'Archery'],
      participants: ['Prince Rhaegar Targaryen', 'Ser Arthur Dayne', 'Robert Baratheon', 'Ser Barristan Selmy'],
      winner: 'Prince Rhaegar Targaryen',
      prize: 'Crown of Love and Beauty'
    },
    {
      id: 'hand-tourney',
      name: "Tournament for the Hand's Appointment",
      type: 'Historical',
      date: '298 AC',
      location: "King's Landing",
      description: 'Held to celebrate Ned Stark becoming Hand of the King.',
      events: ['Jousting', 'Melee'],
      participants: ['Ser Loras Tyrell', 'Ser Gregor Clegane', 'Thoros of Myr', 'Beric Dondarrion'],
      winner: 'Ser Loras Tyrell',
      prize: '40,000 golden dragons'
    },
    {
      id: 'kings-landing-melee',
      name: 'The Great Melee',
      type: 'Active',
      date: 'Current',
      location: "King's Landing",
      description: 'A grand melee where warriors fight until only one remains standing.',
      events: ['Melee'],
      participants: ['Available for signup'],
      winner: 'TBD',
      prize: '10,000 golden dragons'
    }
  ];

  const createTournamentBracket = () => {
    const fighters = [
      'Ser Jaime Lannister', 'Ser Arthur Dayne', 'Ser Barristan Selmy', 'Oberyn Martell',
      'Sandor Clegane', 'Gregor Clegane', 'Bronn', 'Jorah Mormont'
    ];

    return fighters.map((fighter, index) => ({
      name: fighter,
      seed: index + 1,
      skill: Math.floor(Math.random() * 30) + 70
    }));
  };

  const [bracket, setBracket] = useState(createTournamentBracket());

  const simulateFight = (fighter1: any, fighter2: any) => {
    const fight1Score = fighter1.skill + Math.random() * 30;
    const fight2Score = fighter2.skill + Math.random() * 30;
    return fight1Score > fight2Score ? fighter1 : fighter2;
  };

  const runTournament = () => {
    const shuffled = [...bracket].sort(() => 0.5 - Math.random());
    const rounds = [];
    
    // Quarter-finals
    const quarterFinals = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      const winner = simulateFight(shuffled[i], shuffled[i + 1]);
      quarterFinals.push(winner);
    }
    rounds.push({ name: 'Quarter-Finals', winners: quarterFinals });

    // Semi-finals
    const semiFinals = [];
    for (let i = 0; i < quarterFinals.length; i += 2) {
      const winner = simulateFight(quarterFinals[i], quarterFinals[i + 1]);
      semiFinals.push(winner);
    }
    rounds.push({ name: 'Semi-Finals', winners: semiFinals });

    // Final
    const champion = simulateFight(semiFinals[0], semiFinals[1]);
    rounds.push({ name: 'Final', winners: [champion] });

    return { rounds, champion };
  };

  const [tournamentResult, setTournamentResult] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
            Tournaments & Competitions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the grandeur of Westerosi tournaments, from legendary jousts to brutal melees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tournament List */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Famous Tournaments
                </CardTitle>
                <CardDescription>
                  Historical and ongoing tournaments throughout the Seven Kingdoms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tournaments.map((tournament) => (
                  <Card key={tournament.id} className={`cursor-pointer transition-colors ${selectedTournament === tournament.id ? 'ring-2 ring-gold-500' : ''}`}>
                    <CardHeader className="pb-3" onClick={() => setSelectedTournament(tournament.id)}>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{tournament.name}</CardTitle>
                        <Badge variant={tournament.type === 'Historical' ? 'secondary' : 'default'}>
                          {tournament.type}
                        </Badge>
                      </div>
                      <CardDescription>{tournament.location} • {tournament.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">
                        {tournament.description}
                      </p>
                      <div className="flex gap-2 mb-3">
                        {tournament.events.map(event => (
                          <Badge key={event} variant="outline">{event}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Crown className="h-4 w-4" />
                          Winner: {tournament.winner}
                        </span>
                        <span className="text-gold-500 font-medium">{tournament.prize}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Tournament Simulator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sword className="h-5 w-5" />
                  Tournament Simulator
                </CardTitle>
                <CardDescription>
                  Simulate a tournament bracket with legendary fighters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Current Bracket</h3>
                    <Button onClick={() => {
                      setBracket(createTournamentBracket());
                      setTournamentResult(null);
                    }}>
                      New Bracket
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {bracket.map((fighter, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{fighter.name}</span>
                        <Badge variant="outline">{fighter.skill}</Badge>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => setTournamentResult(runTournament())}
                    className="w-full"
                    disabled={bracket.length === 0}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Run Tournament
                  </Button>

                  {tournamentResult && (
                    <div className="mt-6 space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-gold-500" />
                        Tournament Results
                      </h3>
                      
                      {tournamentResult.rounds.map((round: any, index: number) => (
                        <div key={index} className="border rounded p-3">
                          <h4 className="font-medium mb-2">{round.name}</h4>
                          <div className="space-y-1">
                            {round.winners.map((winner: any, winnerIndex: number) => (
                              <div key={winnerIndex} className="text-sm flex items-center gap-2">
                                <Shield className="h-3 w-3" />
                                {winner.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="bg-gold-500/10 border border-gold-500/20 rounded p-4 text-center">
                        <Crown className="h-8 w-8 text-gold-500 mx-auto mb-2" />
                        <h3 className="text-lg font-bold text-gold-400">Tournament Champion</h3>
                        <p className="text-xl font-cinzel">{tournamentResult.champion.name}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {selectedTournament && (
              <Card>
                <CardHeader>
                  <CardTitle>Tournament Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const tournament = tournaments.find(t => t.id === selectedTournament);
                    if (!tournament) return null;
                    
                    return (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Participants</h4>
                          <div className="space-y-1">
                            {tournament.participants.map((participant, index) => (
                              <div key={index} className="text-sm flex items-center gap-2">
                                <Users className="h-3 w-3" />
                                {participant}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Events</h4>
                          <div className="flex flex-wrap gap-1">
                            {tournament.events.map(event => (
                              <Badge key={event} variant="secondary">{event}</Badge>
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
                <CardTitle>Tournament Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-gold-500" />
                  <span className="text-sm">Jousting - One-on-one mounted combat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sword className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Melee - Mass combat until one remains</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Archery - Precision shooting contest</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Tournaments</span>
                  <span className="font-semibold">{tournaments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Events</span>
                  <span className="font-semibold">{tournaments.filter(t => t.type === 'Active').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Historical Records</span>
                  <span className="font-semibold">{tournaments.filter(t => t.type === 'Historical').length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tournaments;

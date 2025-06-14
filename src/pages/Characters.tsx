
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Crown, Sword, Shield, Star, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Characters = () => {
  const [selectedRole, setSelectedRole] = useState('all');

  const characters = [
    {
      name: 'Tywin Lannister',
      title: 'Lord of Casterly Rock',
      house: 'Lannister',
      role: 'commander',
      specialty: 'Strategic Warfare',
      achievements: ['Sack of King\'s Landing', 'War of the Five Kings', 'Razing of the Riverlands'],
      quote: 'A lion does not concern himself with the opinion of sheep.',
      color: 'text-yellow-400',
      description: 'The most feared military mind in Westeros, known for his ruthless efficiency.'
    },
    {
      name: 'Robb Stark',
      title: 'The Young Wolf',
      house: 'Stark',
      role: 'king',
      specialty: 'Tactical Innovation',
      achievements: ['Victory at Whispering Wood', 'Capture of Jaime Lannister', 'Liberation of Riverrun'],
      quote: 'The man who passes the sentence should swing the sword.',
      color: 'text-slate-400',
      description: 'Brilliant young commander who never lost a battle, King in the North.'
    },
    {
      name: 'Stannis Baratheon',
      title: 'The One True King',
      house: 'Baratheon',
      role: 'king',
      specialty: 'Siege Warfare',
      achievements: ['Defense of Storm\'s End', 'Battle of Blackwater Bay', 'March on Winterfell'],
      quote: 'I am the rightful king, by all the laws of the Seven Kingdoms.',
      color: 'text-amber-500',
      description: 'Iron-willed military strategist and the rightful heir to the Iron Throne.'
    },
    {
      name: 'Randyll Tarly',
      title: 'Lord of Horn Hill',
      house: 'Tarly',
      role: 'commander',
      specialty: 'Infantry Tactics',
      achievements: ['Victory at Ashford', 'Defeat of Robert Baratheon', 'Military Reforms'],
      quote: 'A sword needs a sheath, and a wedding needs a bedding.',
      color: 'text-green-400',
      description: 'Considered one of the finest military minds in the Seven Kingdoms.'
    },
    {
      name: 'Jon Snow',
      title: 'Lord Commander of the Night\'s Watch',
      house: 'Stark',
      role: 'commander',
      specialty: 'Guerrilla Warfare',
      achievements: ['Defense of Castle Black', 'Battle of the Bastards', 'Alliance with Wildlings'],
      quote: 'The night is dark and full of terrors.',
      color: 'text-slate-300',
      description: 'Bastard son turned legendary commander, defender of the realm.'
    },
    {
      name: 'Daenerys Targaryen',
      title: 'Mother of Dragons',
      house: 'Targaryen',
      role: 'queen',
      specialty: 'Dragon Warfare',
      achievements: ['Liberation of Slaver\'s Bay', 'Conquest of Meereen', 'Battle of King\'s Landing'],
      quote: 'I will take what is mine with fire and blood.',
      color: 'text-purple-400',
      description: 'The last Targaryen, conqueror with three dragons at her command.'
    }
  ];

  const roles = ['all', 'king', 'queen', 'commander'];

  const filteredCharacters = selectedRole === 'all' 
    ? characters 
    : characters.filter(char => char.role === selectedRole);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'king':
      case 'queen':
        return Crown;
      case 'commander':
        return Sword;
      default:
        return Shield;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
              Lords & Commanders
            </h1>
            <p className="text-xl font-cormorant text-foreground/80 max-w-3xl mx-auto">
              The great military minds who shaped the fate of Westeros through steel and strategy. 
              From the Young Wolf to the Old Lion, these are the legends of war.
            </p>
          </div>

          {/* Role Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {roles.map((role) => (
              <Button
                key={role}
                variant={selectedRole === role ? "default" : "outline"}
                onClick={() => setSelectedRole(role)}
                className="font-cormorant capitalize"
              >
                {role === 'all' ? 'All Leaders' : `${role}s`}
              </Button>
            ))}
          </div>

          {/* Characters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCharacters.map((character) => {
              const RoleIcon = getRoleIcon(character.role);
              return (
                <Card key={character.name} className="parchment-card hover:scale-105 transition-transform duration-300">
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      <RoleIcon className={`h-12 w-12 ${character.color}`} />
                    </div>
                    <CardTitle className="text-2xl font-cinzel text-gold-400">
                      {character.name}
                    </CardTitle>
                    <CardDescription className="font-cormorant text-lg text-gold-200">
                      {character.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-cormorant">
                        House {character.house}
                      </Badge>
                      <Badge variant="secondary" className="font-cormorant capitalize">
                        {character.role}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-gold-500" />
                        <span className="font-cormorant font-semibold">Specialty:</span>
                        <span className="font-cormorant text-sm">{character.specialty}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-cormorant font-semibold text-gold-400">Key Achievements:</h4>
                      <ul className="text-sm space-y-1">
                        {character.achievements.slice(0, 3).map((achievement, index) => (
                          <li key={index} className="font-cormorant text-foreground/70 flex items-start">
                            <span className="text-gold-500 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-l-4 border-gold-500 pl-4 py-2">
                      <p className="font-cormorant italic text-sm text-foreground/80">
                        "{character.quote}"
                      </p>
                    </div>

                    <p className="font-cormorant text-xs text-foreground/60">
                      {character.description}
                    </p>

                    <Button className="w-full mt-4" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      View Full Profile
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Characters;

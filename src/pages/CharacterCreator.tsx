
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Sword, Shield, Users, Crown } from 'lucide-react';

const CharacterCreator = () => {
  const [character, setCharacter] = useState({
    name: '',
    title: '',
    house: '',
    region: '',
    type: '',
    strength: 50,
    intelligence: 50,
    charisma: 50,
    leadership: 50,
    backstory: '',
    specialties: [] as string[]
  });

  const regions = [
    'The North', 'The Vale', 'The Riverlands', 'The Westerlands', 
    'The Reach', 'The Stormlands', 'Dorne', 'Crownlands'
  ];

  const characterTypes = [
    'Lord/Lady', 'Knight', 'Maester', 'Sellsword', 'Merchant', 
    'Warrior', 'Scholar', 'Spy', 'Bard', 'Hedge Knight'
  ];

  const specialtyOptions = [
    'Swordsmanship', 'Archery', 'Horsemanship', 'Strategy', 'Diplomacy',
    'Trade', 'Healing', 'Stealth', 'Languages', 'History', 'Magic Lore',
    'Naval Combat', 'Siege Warfare', 'Beast Taming'
  ];

  const handleSpecialtyToggle = (specialty: string) => {
    setCharacter(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleStatChange = (stat: string, value: number) => {
    setCharacter(prev => ({ ...prev, [stat]: value }));
  };

  const generateRandomCharacter = () => {
    const randomNames = [
      'Ser Aldric', 'Lady Lyanna', 'Lord Garrett', 'Ser Theon', 'Lady Mira',
      'Lord Roderick', 'Ser Daveth', 'Lady Alys', 'Lord Benjen', 'Ser Jorik'
    ];
    
    const randomHouses = [
      'House Blackwood', 'House Tully', 'House Redwyne', 'House Hightower',
      'House Manderly', 'House Mormont', 'House Dayne', 'House Yronwood'
    ];

    setCharacter({
      name: randomNames[Math.floor(Math.random() * randomNames.length)],
      title: 'Knight of the Realm',
      house: randomHouses[Math.floor(Math.random() * randomHouses.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      type: characterTypes[Math.floor(Math.random() * characterTypes.length)],
      strength: Math.floor(Math.random() * 40) + 30,
      intelligence: Math.floor(Math.random() * 40) + 30,
      charisma: Math.floor(Math.random() * 40) + 30,
      leadership: Math.floor(Math.random() * 40) + 30,
      backstory: 'A character forged in the fires of conflict, shaped by the politics of Westeros.',
      specialties: specialtyOptions.slice(0, Math.floor(Math.random() * 4) + 1)
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
            Character Creator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create your own character in the world of Westeros. Forge their backstory, choose their skills, and determine their fate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Character Creation Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Define your character's identity and background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={character.name}
                      onChange={(e) => setCharacter(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter character name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={character.title}
                      onChange={(e) => setCharacter(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Ser, Lady, Lord"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="house">House</Label>
                  <Input
                    id="house"
                    value={character.house}
                    onChange={(e) => setCharacter(prev => ({ ...prev, house: e.target.value }))}
                    placeholder="House name or 'None' for bastards"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Region</Label>
                    <Select value={character.region} onValueChange={(value) => setCharacter(prev => ({ ...prev, region: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map(region => (
                          <SelectItem key={region} value={region}>{region}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Character Type</Label>
                    <Select value={character.type} onValueChange={(value) => setCharacter(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {characterTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={generateRandomCharacter} variant="outline" className="w-full">
                  Generate Random Character
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sword className="h-5 w-5" />
                  Attributes
                </CardTitle>
                <CardDescription>
                  Distribute points among your character's abilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'strength', label: 'Strength', icon: Sword },
                  { key: 'intelligence', label: 'Intelligence', icon: Crown },
                  { key: 'charisma', label: 'Charisma', icon: Users },
                  { key: 'leadership', label: 'Leadership', icon: Shield }
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {label}
                      </Label>
                      <span className="text-sm font-medium">{character[key as keyof typeof character]}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={character[key as keyof typeof character] as number}
                      onChange={(e) => handleStatChange(key, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
                <CardDescription>
                  Choose your character's areas of expertise (select up to 5)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {specialtyOptions.map(specialty => (
                    <Badge
                      key={specialty}
                      variant={character.specialties.includes(specialty) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-gold-500/20"
                      onClick={() => handleSpecialtyToggle(specialty)}
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4">
                  <Label htmlFor="backstory">Backstory</Label>
                  <Textarea
                    id="backstory"
                    value={character.backstory}
                    onChange={(e) => setCharacter(prev => ({ ...prev, backstory: e.target.value }))}
                    placeholder="Write your character's background story..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Character Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Character Preview</CardTitle>
                <CardDescription>
                  Preview of your created character
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {character.name ? (
                  <>
                    <div className="text-center border-b pb-4">
                      <h2 className="text-2xl font-cinzel font-bold text-gold-400">
                        {character.title} {character.name}
                      </h2>
                      {character.house && (
                        <p className="text-muted-foreground">of {character.house}</p>
                      )}
                      <div className="flex gap-2 justify-center mt-2">
                        {character.region && <Badge variant="secondary">{character.region}</Badge>}
                        {character.type && <Badge variant="outline">{character.type}</Badge>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            <Sword className="h-4 w-4" />
                            Strength
                          </span>
                          <span className="font-medium">{character.strength}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            <Crown className="h-4 w-4" />
                            Intelligence
                          </span>
                          <span className="font-medium">{character.intelligence}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Charisma
                          </span>
                          <span className="font-medium">{character.charisma}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            <Shield className="h-4 w-4" />
                            Leadership
                          </span>
                          <span className="font-medium">{character.leadership}</span>
                        </div>
                      </div>
                    </div>

                    {character.specialties.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">Specialties:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {character.specialties.map(specialty => (
                            <Badge key={specialty} variant="default" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {character.backstory && (
                      <div>
                        <Label className="text-sm font-medium">Backstory:</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {character.backstory}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <UserPlus className="h-12 w-12 mx-auto mb-4" />
                    <p>Fill in the character details to see a preview</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {character.name && (
              <Card>
                <CardHeader>
                  <CardTitle>Character Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">Save Character</Button>
                  <Button variant="outline" className="w-full">Export to Battle Simulator</Button>
                  <Button variant="outline" className="w-full">Share Character</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CharacterCreator;


import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Search, Book, Eye, Star, Flame } from 'lucide-react';

const Prophecies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProphecy, setSelectedProphecy] = useState<string | null>(null);

  const prophecies = [
    {
      id: 'prince-that-was-promised',
      title: 'The Prince That Was Promised',
      origin: 'Ancient Valyrian Prophecy',
      type: 'Messianic',
      status: 'Unfulfilled',
      text: 'When the red star bleeds and the darkness gathers, Azor Ahai shall be born again amidst smoke and salt to wake dragons out of stone.',
      interpretation: 'A prophesied hero who will lead the fight against the darkness.',
      characters: ['Jon Snow', 'Daenerys Targaryen', 'Stannis Baratheon'],
      keywords: ['Azor Ahai', 'Lightbringer', 'Red Star', 'Dragons']
    },
    {
      id: 'valonqar',
      title: 'The Valonqar Prophecy',
      origin: 'Maggy the Frog',
      type: 'Death Prophecy',
      status: 'Partially Fulfilled',
      text: 'And when your tears have drowned you, the valonqar shall wrap his hands about your pale white throat and choke the life from you.',
      interpretation: 'Prophecy about Cersei Lannister\'s death by the hands of her younger brother.',
      characters: ['Cersei Lannister', 'Tyrion Lannister', 'Jaime Lannister'],
      keywords: ['Valonqar', 'Little Brother', 'Golden Crown', 'Three Children']
    },
    {
      id: 'three-heads-dragon',
      title: 'The Dragon Has Three Heads',
      origin: 'Targaryen Lore',
      type: 'Bloodline',
      status: 'Unfulfilled',
      text: 'The dragon has three heads. Three riders for three dragons.',
      interpretation: 'Three Targaryens or those with dragon blood will ride the three dragons.',
      characters: ['Daenerys Targaryen', 'Jon Snow', 'Aegon Targaryen'],
      keywords: ['Three Heads', 'Dragon Riders', 'Targaryen', 'Fire and Blood']
    },
    {
      id: 'ghost-of-high-heart',
      title: 'The Ghost of High Heart\'s Visions',
      origin: 'The Ghost of High Heart',
      type: 'Prophetic Visions',
      status: 'Multiple Fulfilled',
      text: 'I dreamt of a maid at a feast with purple serpents in her hair, venom dripping from their fangs.',
      interpretation: 'Various visions including the Purple Wedding and other future events.',
      characters: ['Sansa Stark', 'Joffrey Baratheon', 'Olenna Tyrell'],
      keywords: ['Purple Wedding', 'Serpents', 'Feast', 'Venom']
    }
  ];

  const legends = [
    {
      title: 'The Long Night',
      description: 'An ancient darkness that lasted a generation, ended by the Last Hero.',
      significance: 'Historical precedent for the prophesied return of darkness.'
    },
    {
      title: 'Azor Ahai and Lightbringer',
      description: 'The legendary hero who forged a flaming sword by sacrificing his beloved.',
      significance: 'Template for the prophesied savior who will defeat the darkness.'
    },
    {
      title: 'The Doom of Valyria',
      description: 'The catastrophic destruction of the greatest civilization in history.',
      significance: 'Warning about the dangers of power and hubris.'
    }
  ];

  const filteredProphecies = prophecies.filter(prophecy =>
    prophecy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prophecy.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prophecy.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
            Prophecies & Legends
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the ancient prophecies, mystical visions, and legendary tales that shape the fate of Westeros.
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prophecies, characters, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Prophecies List */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Ancient Prophecies
                </CardTitle>
                <CardDescription>
                  Mystical predictions that may shape the future of Westeros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredProphecies.map((prophecy) => (
                  <Card 
                    key={prophecy.id} 
                    className={`cursor-pointer transition-colors ${selectedProphecy === prophecy.id ? 'ring-2 ring-gold-500' : ''}`}
                    onClick={() => setSelectedProphecy(prophecy.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{prophecy.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline">{prophecy.type}</Badge>
                          <Badge variant={prophecy.status === 'Fulfilled' ? 'default' : prophecy.status === 'Partially Fulfilled' ? 'secondary' : 'destructive'}>
                            {prophecy.status}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{prophecy.origin}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <blockquote className="border-l-4 border-gold-500 pl-4 italic text-sm mb-4 text-muted-foreground">
                        "{prophecy.text}"
                      </blockquote>
                      <p className="text-sm mb-3">{prophecy.interpretation}</p>
                      <div className="flex gap-1 flex-wrap">
                        {prophecy.keywords.map(keyword => (
                          <Badge key={keyword} variant="secondary" className="text-xs">{keyword}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  Legendary Tales
                </CardTitle>
                <CardDescription>
                  Ancient stories and myths that echo through the ages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {legends.map((legend, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4 text-gold-500" />
                      {legend.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{legend.description}</p>
                    <p className="text-sm"><strong>Significance:</strong> {legend.significance}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {selectedProphecy && (
              <Card>
                <CardHeader>
                  <CardTitle>Prophecy Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const prophecy = prophecies.find(p => p.id === selectedProphecy);
                    if (!prophecy) return null;
                    
                    return (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Key Characters</h4>
                          <div className="space-y-1">
                            {prophecy.characters.map(character => (
                              <div key={character} className="flex items-center gap-2">
                                <Eye className="h-3 w-3" />
                                <span className="text-sm">{character}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Status</h4>
                          <Badge variant={prophecy.status === 'Fulfilled' ? 'default' : prophecy.status === 'Partially Fulfilled' ? 'secondary' : 'destructive'}>
                            {prophecy.status}
                          </Badge>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Origin</h4>
                          <p className="text-sm text-muted-foreground">{prophecy.origin}</p>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Prophecy Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Prophecies</span>
                  <span className="font-semibold">{prophecies.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fulfilled</span>
                  <span className="font-semibold text-green-500">
                    {prophecies.filter(p => p.status === 'Fulfilled').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Partially Fulfilled</span>
                  <span className="font-semibold text-yellow-500">
                    {prophecies.filter(p => p.status === 'Partially Fulfilled').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Unfulfilled</span>
                  <span className="font-semibold text-red-500">
                    {prophecies.filter(p => p.status === 'Unfulfilled').length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prophecy Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Messianic - Savior prophecies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Death Prophecy - Foretelling doom</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Prophetic Vision - Mystic sight</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-gold-500" />
                  <span className="text-sm">Bloodline - Hereditary fate</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mystical Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">Generate New Prophecy</Button>
                <Button variant="outline" className="w-full">Interpret Dreams</Button>
                <Button variant="outline" className="w-full">Consult the Glass Candles</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Prophecies;

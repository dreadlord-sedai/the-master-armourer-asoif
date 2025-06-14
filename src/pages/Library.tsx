
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Search, Users, Calendar, Crown, Scroll } from 'lucide-react';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  const libraryEntries = [
    {
      id: 'robert-rebellion',
      title: "Robert's Rebellion",
      category: 'Historical Events',
      date: '282-283 AC',
      type: 'War',
      description: 'The war that ended Targaryen rule and brought Robert Baratheon to the throne.',
      keyFigures: ['Robert Baratheon', 'Rhaegar Targaryen', 'Lyanna Stark', 'Ned Stark'],
      content: 'A civil war sparked by Prince Rhaegar allegedly abducting Lyanna Stark, leading to the Mad King burning Lord Rickard Stark and his son Brandon alive...',
      tags: ['Targaryen', 'Baratheon', 'Stark', 'Civil War']
    },
    {
      id: 'aegon-conquest',
      title: "Aegon's Conquest",
      category: 'Historical Events',
      date: '2 BC - 1 AC',
      type: 'Conquest',
      description: 'How Aegon the Conqueror united the Seven Kingdoms with his dragons.',
      keyFigures: ['Aegon I Targaryen', 'Visenya Targaryen', 'Rhaenys Targaryen'],
      content: 'Aegon Targaryen landed at what would become King\'s Landing with his sister-wives and three dragons, beginning the conquest of Westeros...',
      tags: ['Targaryen', 'Dragons', 'Conquest', 'Seven Kingdoms']
    },
    {
      id: 'ned-stark',
      title: 'Eddard Stark',
      category: 'Characters',
      date: '263-298 AC',
      type: 'Lord',
      description: 'Lord of Winterfell and Warden of the North, known for his honor.',
      keyFigures: ['Catelyn Stark', 'Jon Snow', 'Robb Stark', 'Robert Baratheon'],
      content: 'Ned Stark was the second son of Lord Rickard Stark, who became Lord of Winterfell after his father and brother were killed by the Mad King...',
      tags: ['Stark', 'Winterfell', 'Honor', 'Hand of the King']
    },
    {
      id: 'valyrian-steel',
      title: 'Valyrian Steel',
      category: 'Objects & Artifacts',
      date: 'Ancient - Present',
      type: 'Material',
      description: 'Legendary steel forged in Old Valyria with magic and dragonfire.',
      keyFigures: ['Valyrian Smiths', 'Various Owners'],
      content: 'Valyrian steel was forged in the ancient Freehold of Valyria using dragonfire and magic. Only a few hundred blades remain in the world...',
      tags: ['Valyria', 'Magic', 'Weapons', 'Rare']
    },
    {
      id: 'dance-of-dragons',
      title: 'The Dance of the Dragons',
      category: 'Historical Events',
      date: '129-131 AC',
      type: 'Civil War',
      description: 'The Targaryen civil war that nearly destroyed House Targaryen and their dragons.',
      keyFigures: ['Rhaenyra Targaryen', 'Aegon II Targaryen', 'Daemon Targaryen'],
      content: 'A brutal civil war between rival claimants to the Iron Throne that saw dragon fighting dragon and nearly ended the Targaryen dynasty...',
      tags: ['Targaryen', 'Civil War', 'Dragons', 'Succession Crisis']
    }
  ];

  const categories = ['all', 'Historical Events', 'Characters', 'Objects & Artifacts', 'Houses', 'Locations'];

  const filteredEntries = libraryEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || entry.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const quotes = [
    {
      text: "When you play the game of thrones, you win or you die.",
      author: "Cersei Lannister"
    },
    {
      text: "The man who passes the sentence should swing the sword.",
      author: "Ned Stark"
    },
    {
      text: "A mind needs books as a sword needs a whetstone.",
      author: "Tyrion Lannister"
    },
    {
      text: "Chaos isn't a pit. Chaos is a ladder.",
      author: "Petyr Baelish"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
            The Maesters' Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive repository of knowledge about the history, characters, and lore of Westeros and beyond.
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search the archives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Library Entries */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Knowledge Archive
                </CardTitle>
                <CardDescription>
                  {filteredEntries.length} entries found
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredEntries.map((entry) => (
                  <Card 
                    key={entry.id} 
                    className={`cursor-pointer transition-colors ${selectedEntry === entry.id ? 'ring-2 ring-gold-500' : ''}`}
                    onClick={() => setSelectedEntry(entry.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{entry.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline">{entry.category}</Badge>
                          <Badge variant="secondary">{entry.type}</Badge>
                        </div>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {entry.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">{entry.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">Key Figures: {entry.keyFigures.slice(0, 2).join(', ')}</span>
                        {entry.keyFigures.length > 2 && <span className="text-sm text-muted-foreground">+{entry.keyFigures.length - 2} more</span>}
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {entry.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredEntries.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4" />
                    <p>No entries found matching your search criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scroll className="h-5 w-5" />
                  Notable Quotes
                </CardTitle>
                <CardDescription>
                  Wisdom from the great figures of Westeros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quotes.map((quote, index) => (
                  <div key={index} className="border-l-4 border-gold-500 pl-4">
                    <blockquote className="italic text-muted-foreground mb-2">
                      "{quote.text}"
                    </blockquote>
                    <cite className="text-sm font-medium">— {quote.author}</cite>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {selectedEntry && (
              <Card>
                <CardHeader>
                  <CardTitle>Entry Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const entry = libraryEntries.find(e => e.id === selectedEntry);
                    if (!entry) return null;
                    
                    return (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Full Content</h4>
                          <p className="text-sm text-muted-foreground">{entry.content}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">All Key Figures</h4>
                          <div className="space-y-1">
                            {entry.keyFigures.map(figure => (
                              <div key={figure} className="flex items-center gap-2">
                                <Crown className="h-3 w-3" />
                                <span className="text-sm">{figure}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Related Topics</h4>
                          <div className="flex flex-wrap gap-1">
                            {entry.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
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
                <CardTitle>Library Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Entries</span>
                  <span className="font-semibold">{libraryEntries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Historical Events</span>
                  <span className="font-semibold">{libraryEntries.filter(e => e.category === 'Historical Events').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Character Profiles</span>
                  <span className="font-semibold">{libraryEntries.filter(e => e.category === 'Characters').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Artifacts</span>
                  <span className="font-semibold">{libraryEntries.filter(e => e.category === 'Objects & Artifacts').length}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">Random Knowledge</Button>
                <Button variant="outline" className="w-full">Character Relationships</Button>
                <Button variant="outline" className="w-full">Timeline Explorer</Button>
                <Button variant="outline" className="w-full">Trivia Challenge</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Research Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Cross-reference entries</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Character family trees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Historical timelines</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Library;

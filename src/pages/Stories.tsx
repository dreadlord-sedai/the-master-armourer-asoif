
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scroll, Play, BookOpen, ArrowRight, RotateCcw, Save } from 'lucide-react';

const Stories = () => {
  const [currentStory, setCurrentStory] = useState<string | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [storyProgress, setStoryProgress] = useState<{[key: string]: any}>({});

  const stories = [
    {
      id: 'north-remembers',
      title: 'The North Remembers',
      description: 'Lead House Stark through the aftermath of the Red Wedding. Make alliances, seek revenge, and reclaim the North.',
      difficulty: 'Medium',
      chapters: 5,
      perspective: 'Multiple POV',
      themes: ['Revenge', 'Honor', 'Family'],
      startingChoices: [
        'Rally the Northern Houses',
        'Seek foreign alliances',
        'Focus on stealth and subterfuge'
      ]
    },
    {
      id: 'dragons-return',
      title: 'Return of the Dragons',
      description: 'Guide Daenerys Targaryen as she decides the fate of Westeros. Will you rule with fire and blood or mercy?',
      difficulty: 'Hard',
      chapters: 6,
      perspective: 'Daenerys Targaryen',
      themes: ['Power', 'Justice', 'Legacy'],
      startingChoices: [
        'Rule through fear and strength',
        'Win hearts through mercy',
        'Balance justice with pragmatism'
      ]
    },
    {
      id: 'game-of-thrones',
      title: 'The Game of Thrones',
      description: 'Navigate the political intrigue of King\'s Landing as a minor lord seeking to rise in power.',
      difficulty: 'Hard',
      chapters: 7,
      perspective: 'Custom Character',
      themes: ['Politics', 'Ambition', 'Survival'],
      startingChoices: [
        'Align with the Lannisters',
        'Support the Starks',
        'Play all sides for personal gain'
      ]
    },
    {
      id: 'long-night',
      title: 'The Long Night',
      description: 'Command the defenses against the Night King. Every decision could mean survival or extinction.',
      difficulty: 'Expert',
      chapters: 4,
      perspective: 'Jon Snow',
      themes: ['Survival', 'Sacrifice', 'Unity'],
      startingChoices: [
        'Focus on military strategy',
        'Seek magical solutions',
        'Unite the living at any cost'
      ]
    }
  ];

  const sampleChapter = {
    title: 'Chapter 1: The Raven\'s Message',
    content: `The raven arrived at dawn, its black wings cutting through the morning mist like an omen of things to come. 
    
You break the seal and read the message with growing dread. News from the South speaks of shifting alliances and brewing conflicts. The Game of Thrones continues, and you must decide how to respond.

Your advisors gather around the table, each offering different counsel. The Maester speaks of caution, while your Captain of Guards advocates for immediate action. Your steward worries about the cost of war.

The choice you make now will echo through the chapters to come...`,
    choices: [
      {
        text: 'Send ravens to your allies immediately',
        consequence: 'This will strengthen your alliances but may reveal your hand too early.',
        leads_to: 'diplomatic_path'
      },
      {
        text: 'Muster your armies in secret',
        consequence: 'Your military will be ready, but your allies may feel betrayed by the secrecy.',
        leads_to: 'military_path'
      },
      {
        text: 'Wait and gather more information',
        consequence: 'You\'ll have better intelligence but may miss opportunities to act.',
        leads_to: 'cautious_path'
      },
      {
        text: 'Ignore the message and focus on your own lands',
        consequence: 'Your people will prosper, but you may be unprepared for what\'s coming.',
        leads_to: 'isolationist_path'
      }
    ]
  };

  const startStory = (storyId: string, choice: string) => {
    setCurrentStory(storyId);
    setCurrentChapter(1);
    setStoryProgress({
      ...storyProgress,
      [storyId]: {
        currentChapter: 1,
        choices: [choice],
        path: choice.toLowerCase().replace(/\s+/g, '_')
      }
    });
  };

  const makeChoice = (choice: any) => {
    if (!currentStory) return;
    
    const newProgress = {
      ...storyProgress,
      [currentStory]: {
        ...storyProgress[currentStory],
        currentChapter: currentChapter + 1,
        choices: [...(storyProgress[currentStory]?.choices || []), choice.text],
        lastChoice: choice
      }
    };
    
    setStoryProgress(newProgress);
    setCurrentChapter(currentChapter + 1);
  };

  const resetStory = () => {
    setCurrentStory(null);
    setCurrentChapter(0);
  };

  const currentStoryData = stories.find(s => s.id === currentStory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
            Interactive Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Shape the fate of Westeros through your choices. Every decision has consequences in these branching narratives.
          </p>
        </div>

        {!currentStory ? (
          // Story Selection
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Choose Your Story
                  </CardTitle>
                  <CardDescription>
                    Select an adventure and begin your journey through Westeros
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stories.map((story) => (
                    <Card key={story.id} className="cursor-pointer hover:bg-accent/10 transition-colors">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{story.title}</CardTitle>
                          <Badge variant={
                            story.difficulty === 'Easy' ? 'default' :
                            story.difficulty === 'Medium' ? 'secondary' :
                            story.difficulty === 'Hard' ? 'destructive' : 'outline'
                          }>
                            {story.difficulty}
                          </Badge>
                        </div>
                        <CardDescription>{story.perspective} • {story.chapters} Chapters</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-3">{story.description}</p>
                        <div className="flex gap-1 flex-wrap mb-4">
                          {story.themes.map(theme => (
                            <Badge key={theme} variant="outline" className="text-xs">{theme}</Badge>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">Choose your starting approach:</h4>
                          {story.startingChoices.map((choice, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="w-full justify-start text-left h-auto py-2 px-3"
                              onClick={() => startStory(story.id, choice)}
                            >
                              <Play className="h-3 w-3 mr-2 flex-shrink-0" />
                              <span className="text-xs">{choice}</span>
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>How Stories Work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gold-500/20 p-2 rounded-full">
                      <Scroll className="h-4 w-4 text-gold-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Branching Narratives</h4>
                      <p className="text-sm text-muted-foreground">Every choice leads to different outcomes and story paths.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Consequences Matter</h4>
                      <p className="text-sm text-muted-foreground">Your decisions affect future chapters and available options.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500/20 p-2 rounded-full">
                      <Save className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Multiple Endings</h4>
                      <p className="text-sm text-muted-foreground">Each story has several possible conclusions based on your choices.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Story Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Available Stories</span>
                    <span className="font-semibold">{stories.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Chapters</span>
                    <span className="font-semibold">{stories.reduce((sum, story) => sum + story.chapters, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty Levels</span>
                    <span className="font-semibold">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stories Completed</span>
                    <span className="font-semibold">0</span>
                  </div>
                </CardContent>
              </Card>

              {Object.keys(storyProgress).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(storyProgress).map(([storyId, progress]: [string, any]) => {
                      const story = stories.find(s => s.id === storyId);
                      return (
                        <div key={storyId} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{story?.title}</span>
                          <Badge variant="secondary">
                            Chapter {progress.currentChapter}/{story?.chapters}
                          </Badge>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          // Story Reader
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-cinzel font-bold text-gold-400">{currentStoryData?.title}</h2>
                <p className="text-muted-foreground">Chapter {currentChapter} of {currentStoryData?.chapters}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetStory}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Start Over
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{sampleChapter.title}</CardTitle>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gold-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(currentChapter / (currentStoryData?.chapters || 1)) * 100}%` }}
                  ></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none mb-8">
                  {sampleChapter.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold mb-4">What do you do?</h3>
                  {sampleChapter.choices.map((choice, index) => (
                    <Card key={index} className="cursor-pointer hover:bg-accent/10 transition-colors">
                      <CardContent className="p-4" onClick={() => makeChoice(choice)}>
                        <div className="flex items-start gap-3">
                          <ArrowRight className="h-4 w-4 mt-1 text-gold-500" />
                          <div className="flex-1">
                            <p className="font-medium mb-1">{choice.text}</p>
                            <p className="text-xs text-muted-foreground">{choice.consequence}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {storyProgress[currentStory]?.choices && (
                  <div className="mt-8 pt-6 border-t">
                    <h4 className="font-semibold mb-3">Your Previous Choices:</h4>
                    <div className="space-y-1">
                      {storyProgress[currentStory].choices.map((choice: string, index: number) => (
                        <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="bg-gold-500/20 text-gold-700 px-2 py-1 rounded text-xs">
                            Chapter {index + 1}
                          </span>
                          {choice}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Stories;

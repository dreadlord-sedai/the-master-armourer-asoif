
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Swords, Shield, Crown, Star, Flame, Hammer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Armoury = () => {
  const valyrianSwords = [
    {
      name: 'Ice',
      house: 'Stark (formerly)',
      material: 'Valyrian Steel',
      fate: 'Melted down into Oathkeeper and Widow\'s Wail',
      description: 'Ancient greatsword of House Stark, lost when Ned was executed.',
      rarity: 'Legendary',
      color: 'text-blue-400'
    },
    {
      name: 'Longclaw',
      house: 'Mormont/Snow',
      material: 'Valyrian Steel',
      fate: 'Currently wielded by Jon Snow',
      description: 'Bastard sword with a white wolf pommel, gift from Lord Commander Mormont.',
      rarity: 'Legendary',
      color: 'text-slate-400'
    },
    {
      name: 'Oathkeeper',
      house: 'Brienne of Tarth',
      material: 'Valyrian Steel',
      fate: 'Active',
      description: 'Forged from Ice, given to Brienne by Jaime Lannister.',
      rarity: 'Legendary',
      color: 'text-gold-400'
    },
    {
      name: 'Heartsbane',
      house: 'Tarly',
      material: 'Valyrian Steel',
      fate: 'Stolen by Samwell Tarly',
      description: 'Two-handed greatsword, ancestral weapon of House Tarly.',
      rarity: 'Legendary',
      color: 'text-green-400'
    }
  ];

  const legendaryWeapons = [
    {
      name: 'Robert\'s Warhammer',
      wielder: 'Robert Baratheon',
      type: 'Warhammer',
      description: 'Massive two-handed warhammer that crushed Rhaegar at the Trident.',
      material: 'Castle-forged Steel',
      weight: 'Extremely Heavy'
    },
    {
      name: 'Needle',
      wielder: 'Arya Stark',
      type: 'Rapier',
      description: 'Slender sword given to Arya by Jon Snow, perfect for water dancing.',
      material: 'Castle-forged Steel',
      weight: 'Light'
    },
    {
      name: 'Dawn',
      wielder: 'Sword of the Morning',
      type: 'Greatsword',
      description: 'Made from a fallen star, wielded only by worthy Daynes.',
      material: 'Meteorite Steel',
      weight: 'Light as Valyrian Steel'
    }
  ];

  const armor = [
    {
      name: 'Lannister Plate',
      type: 'Full Plate',
      description: 'Crimson and gold plate armor worn by Lannister knights.',
      protection: 'Excellent',
      mobility: 'Limited'
    },
    {
      name: 'Stark Mail',
      type: 'Mail & Leather',
      description: 'Practical armor suited for Northern warfare and mobility.',
      protection: 'Good',
      mobility: 'High'
    },
    {
      name: 'Kingsguard Armor',
      type: 'Ceremonial Plate',
      description: 'White enameled plate armor of the Kingsguard.',
      protection: 'Excellent',
      mobility: 'Moderate'
    }
  ];

  const smiths = [
    {
      name: 'Donal Noye',
      title: 'The Master Armourer',
      specialty: 'Royal Armaments',
      achievement: 'Forged Robert\'s warhammer, lost arm in Greyjoy Rebellion',
      location: 'Castle Black (formerly King\'s Landing)'
    },
    {
      name: 'Tobho Mott',
      title: 'Master Armourer of King\'s Landing',
      specialty: 'Valyrian Steel Reforging',
      achievement: 'One of few who can work Valyrian steel',
      location: 'King\'s Landing'
    },
    {
      name: 'Mikken',
      title: 'Winterfell\'s Smith',
      specialty: 'Northern Arms',
      achievement: 'Armed the Stark household for generations',
      location: 'Winterfell'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
              Weapons & Armoury
            </h1>
            <p className="text-xl font-cormorant text-foreground/80 max-w-3xl mx-auto">
              From the legendary Valyrian steel to the humblest castle-forged blade, 
              explore the weapons and armor that have shaped the fate of Westeros.
            </p>
            <div className="flex items-center justify-center mt-6">
              <Hammer className="h-8 w-8 text-gold-500 mr-3" />
              <p className="font-cormorant italic text-gold-200">
                "You need steel and fire to forge a sword, not words." - Donal Noye
              </p>
              <Hammer className="h-8 w-8 text-gold-500 ml-3" />
            </div>
          </div>

          <Tabs defaultValue="valyrian" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="valyrian">Valyrian Steel</TabsTrigger>
              <TabsTrigger value="weapons">Legendary Weapons</TabsTrigger>
              <TabsTrigger value="armor">Armor & Protection</TabsTrigger>
              <TabsTrigger value="smiths">Master Smiths</TabsTrigger>
            </TabsList>

            <TabsContent value="valyrian" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {valyrianSwords.map((sword, index) => (
                  <Card key={index} className="parchment-card hover:scale-105 transition-transform duration-300">
                    <CardHeader className="text-center">
                      <Swords className={`h-12 w-12 mx-auto mb-4 ${sword.color}`} />
                      <CardTitle className="text-2xl font-cinzel text-gold-400">
                        {sword.name}
                      </CardTitle>
                      <CardDescription className="font-cormorant text-lg">
                        {sword.house}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-center space-x-2">
                        <Badge variant="outline" className="font-cormorant">
                          {sword.material}
                        </Badge>
                        <Badge variant="secondary" className="font-cormorant">
                          {sword.rarity}
                        </Badge>
                      </div>

                      <p className="font-cormorant text-sm text-foreground/80 text-center">
                        {sword.description}
                      </p>

                      <div className="border-l-4 border-gold-500 pl-4">
                        <p className="text-xs font-cormorant">
                          <span className="font-semibold text-gold-400">Current Status:</span> {sword.fate}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="parchment-card mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gold-400">
                    <Star className="h-6 w-6" />
                    <span>About Valyrian Steel</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-cormorant text-foreground/80">
                    Valyrian steel is a lost art from the ancient Valyrian Freehold. These blades are 
                    lighter than castle-forged steel yet far stronger and sharper. The secret of their 
                    creation died with Valyria in the Doom. Only a handful of smiths in the known world 
                    can rework existing Valyrian steel, but none can create new blades.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weapons" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {legendaryWeapons.map((weapon, index) => (
                  <Card key={index} className="parchment-card">
                    <CardHeader className="text-center">
                      <Swords className="h-10 w-10 text-red-500 mx-auto mb-4" />
                      <CardTitle className="text-xl font-cinzel text-gold-400">
                        {weapon.name}
                      </CardTitle>
                      <CardDescription className="font-cormorant">
                        Wielded by {weapon.wielder}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <Badge variant="outline">{weapon.type}</Badge>
                      </div>

                      <p className="font-cormorant text-sm text-foreground/80">
                        {weapon.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-semibold text-gold-400">Material:</span>
                          <p className="font-cormorant">{weapon.material}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gold-400">Weight:</span>
                          <p className="font-cormorant">{weapon.weight}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="armor" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {armor.map((piece, index) => (
                  <Card key={index} className="parchment-card">
                    <CardHeader className="text-center">
                      <Shield className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                      <CardTitle className="text-xl font-cinzel text-gold-400">
                        {piece.name}
                      </CardTitle>
                      <CardDescription className="font-cormorant">
                        {piece.type}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="font-cormorant text-sm text-foreground/80">
                        {piece.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-semibold text-gold-400">Protection:</span>
                          <p className="font-cormorant">{piece.protection}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gold-400">Mobility:</span>
                          <p className="font-cormorant">{piece.mobility}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="smiths" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {smiths.map((smith, index) => (
                  <Card key={index} className="parchment-card">
                    <CardHeader className="text-center">
                      <Hammer className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                      <CardTitle className="text-xl font-cinzel text-gold-400">
                        {smith.name}
                      </CardTitle>
                      <CardDescription className="font-cormorant">
                        {smith.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <Badge variant="outline" className="font-cormorant">
                          {smith.specialty}
                        </Badge>
                      </div>

                      <p className="font-cormorant text-sm text-foreground/80">
                        {smith.achievement}
                      </p>

                      <div className="border-l-4 border-gold-500 pl-4">
                        <p className="text-xs font-cormorant">
                          <span className="font-semibold text-gold-400">Location:</span> {smith.location}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="parchment-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gold-400">
                    <Flame className="h-6 w-6" />
                    <span>The Forge of Donal Noye</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-cormorant text-foreground/80">
                    Donal Noye, the one-armed smith of Castle Black, was once the master armourer of 
                    King's Landing. He forged King Robert's legendary warhammer and armed many of the 
                    realm's greatest warriors. Though he lost his arm in the Greyjoy Rebellion, his 
                    legacy lives on in every blade he ever forged. At the Wall, he continued his craft 
                    until his heroic death defending Castle Black from the wildling assault.
                  </p>
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

export default Armoury;

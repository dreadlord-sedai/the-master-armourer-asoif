
export interface Army {
  house: string;
  infantry: number;
  cavalry: number;
  archers: number;
  commander: string;
  terrain: 'plains' | 'mountains' | 'forest' | 'desert' | 'riverlands';
  morale: number;
  discipline: number;
  equipment: number;
}

export interface BattleModifiers {
  terrainAdvantage: number;
  commanderBonus: number;
  moraleBonus: number;
  equipmentBonus: number;
  tacticalAdvantage: number;
}

export interface DetailedBattleResult {
  winner: string;
  casualties: { [key: string]: { infantry: number; cavalry: number; archers: number; total: number } };
  battleNarrative: string;
  keyMoments: string[];
  tacticalAnalysis: string;
  duration: string;
}

// House-specific military traits based on book lore
export const HOUSE_TRAITS = {
  'House Stark': {
    specialty: 'Heavy Infantry',
    discipline: 0.9,
    morale: 0.85,
    equipment: 0.8,
    terrainBonuses: { forest: 0.2, mountains: 0.1 },
    commanderBonus: 0.15,
    description: 'Northern warriors excel in disciplined formations and winter warfare'
  },
  'House Lannister': {
    specialty: 'Professional Army',
    discipline: 0.95,
    morale: 0.8,
    equipment: 0.95,
    terrainBonuses: { plains: 0.15 },
    commanderBonus: 0.2,
    description: 'Well-equipped professional soldiers with superior armor and weapons'
  },
  'House Tyrell': {
    specialty: 'Heavy Cavalry',
    discipline: 0.85,
    morale: 0.9,
    equipment: 0.9,
    terrainBonuses: { plains: 0.25, riverlands: 0.15 },
    commanderBonus: 0.1,
    description: 'The finest heavy cavalry in Westeros, devastating on open ground'
  },
  'House Baratheon': {
    specialty: 'Storm Knights',
    discipline: 0.88,
    morale: 0.92,
    equipment: 0.85,
    terrainBonuses: { plains: 0.2, forest: 0.1 },
    commanderBonus: 0.18,
    description: 'Fierce warriors known for their strength and battle fury'
  },
  'House Martell': {
    specialty: 'Guerrilla Warfare',
    discipline: 0.75,
    morale: 0.95,
    equipment: 0.7,
    terrainBonuses: { desert: 0.4, mountains: 0.25 },
    commanderBonus: 0.12,
    description: 'Masters of hit-and-run tactics and desert warfare'
  },
  'House Arryn': {
    specialty: 'Mountain Defense',
    discipline: 0.82,
    morale: 0.8,
    equipment: 0.75,
    terrainBonuses: { mountains: 0.35, forest: 0.15 },
    commanderBonus: 0.1,
    description: 'Defenders of mountain passes with superior defensive tactics'
  }
};

export function calculateBattleModifiers(army: Army, terrain: string, enemyArmy: Army): BattleModifiers {
  const houseTraits = HOUSE_TRAITS[army.house];
  if (!houseTraits) {
    return { terrainAdvantage: 0, commanderBonus: 0, moraleBonus: 0, equipmentBonus: 0, tacticalAdvantage: 0 };
  }

  const terrainAdvantage = houseTraits.terrainBonuses[terrain] || 0;
  const commanderBonus = houseTraits.commanderBonus;
  const moraleBonus = (army.morale - 0.5) * 0.3;
  const equipmentBonus = (army.equipment - 0.5) * 0.2;
  
  // Tactical advantages based on troop composition
  let tacticalAdvantage = 0;
  const totalTroops = army.infantry + army.cavalry + army.archers;
  const enemyTotal = enemyArmy.infantry + enemyArmy.cavalry + enemyArmy.archers;
  
  const cavalryRatio = army.cavalry / totalTroops;
  const enemyCavalryRatio = enemyArmy.cavalry / enemyTotal;
  const archerRatio = army.archers / totalTroops;
  const enemyArcherRatio = enemyArmy.archers / enemyTotal;
  
  // Cavalry vs Infantry advantage
  if (cavalryRatio > enemyCavalryRatio + 0.1 && terrain === 'plains') {
    tacticalAdvantage += 0.15;
  }
  
  // Archer advantage
  if (archerRatio > enemyArcherRatio + 0.05) {
    tacticalAdvantage += 0.1;
  }

  return {
    terrainAdvantage,
    commanderBonus,
    moraleBonus,
    equipmentBonus,
    tacticalAdvantage
  };
}

export function simulateDetailedBattle(armies: Army[], terrain: string = 'plains'): DetailedBattleResult {
  if (armies.length < 2) {
    throw new Error('Need at least 2 armies for battle');
  }

  const battleNarrative: string[] = [];
  const keyMoments: string[] = [];
  let phase = 1;

  // Calculate army strengths with modifiers
  const armyStrengths = armies.map(army => {
    const modifiers = calculateBattleModifiers(army, terrain, armies.find(a => a !== army)!);
    const baseStrength = army.infantry * 1 + army.cavalry * 1.5 + army.archers * 0.8;
    const totalModifier = 1 + modifiers.terrainAdvantage + modifiers.commanderBonus + 
                         modifiers.moraleBonus + modifiers.equipmentBonus + modifiers.tacticalAdvantage;
    
    return {
      army,
      strength: baseStrength * totalModifier,
      modifiers,
      casualties: { infantry: 0, cavalry: 0, archers: 0, total: 0 }
    };
  });

  // Phase 1: Archery Duel
  battleNarrative.push(`**Phase ${phase++}: The Archery Duel**`);
  const strongestArchers = armyStrengths.reduce((prev, current) => 
    prev.army.archers > current.army.archers ? prev : current
  );
  keyMoments.push(`${strongestArchers.army.house} gains early advantage with superior archery`);

  // Phase 2: Cavalry Charge
  battleNarrative.push(`**Phase ${phase++}: The Cavalry Charge**`);
  const strongestCavalry = armyStrengths.reduce((prev, current) => 
    prev.army.cavalry > current.army.cavalry ? prev : current
  );
  if (terrain === 'plains') {
    keyMoments.push(`${strongestCavalry.army.house} cavalry charges devastate enemy lines on the open field`);
  } else {
    keyMoments.push(`Cavalry charges are hampered by the ${terrain} terrain`);
  }

  // Phase 3: Infantry Melee
  battleNarrative.push(`**Phase ${phase++}: The Infantry Melee**);
  const strongestInfantry = armyStrengths.reduce((prev, current) => 
    prev.army.infantry > current.army.infantry ? prev : current
  );
  keyMoments.push(`${strongestInfantry.army.house} infantry holds the center in brutal melee combat`);

  // Calculate casualties based on relative strength
  const winner = armyStrengths.reduce((prev, current) => 
    prev.strength > current.strength ? prev : current
  );

  const casualties: { [key: string]: { infantry: number; cavalry: number; archers: number; total: number } } = {};

  armyStrengths.forEach(armyData => {
    const strengthRatio = armyData.strength / winner.strength;
    const casualtyRate = armyData === winner ? 0.15 + Math.random() * 0.1 : 0.35 + Math.random() * 0.2;
    
    const infantryCasualties = Math.floor(armyData.army.infantry * casualtyRate);
    const cavalryCasualties = Math.floor(armyData.army.cavalry * casualtyRate);
    const archerCasualties = Math.floor(armyData.army.archers * casualtyRate);
    
    casualties[armyData.army.house] = {
      infantry: infantryCasualties,
      cavalry: cavalryCasualties,
      archers: archerCasualties,
      total: infantryCasualties + cavalryCasualties + archerCasualties
    };
  });

  // Generate tactical analysis
  const winnerTraits = HOUSE_TRAITS[winner.army.house];
  const tacticalAnalysis = `Victory achieved through ${winnerTraits.specialty.toLowerCase()}. ${winnerTraits.description}. The ${terrain} terrain ${winner.modifiers.terrainAdvantage > 0 ? 'favored' : 'hindered'} their tactics.`;

  return {
    winner: winner.army.house,
    casualties,
    battleNarrative: battleNarrative.join('\n\n'),
    keyMoments,
    tacticalAnalysis,
    duration: `${Math.floor(Math.random() * 6) + 2} hours`
  };
}


/**
 * @fileoverview Game of Thrones Battle Simulation Logic
 * 
 * This module provides comprehensive battle simulation functionality for the Seven Kingdoms,
 * including house-specific military traits, tactical calculations, and detailed battle outcomes.
 * 
 * @author Westeros Military Academy
 * @version 1.0.0
 */

// Constants for battle calculations
const BASE_CASUALTY_RATE = {
  WINNER: { MIN: 0.15, MAX: 0.25 },
  LOSER: { MIN: 0.35, MAX: 0.55 }
} as const;

const TROOP_EFFECTIVENESS = {
  INFANTRY: 1.0,
  CAVALRY: 1.5,
  ARCHERS: 0.8
} as const;

const BATTLE_PHASES = {
  ARCHERY: 1,
  CAVALRY_CHARGE: 2,
  INFANTRY_MELEE: 3
} as const;

/**
 * Represents an army in the battle simulation
 */
export interface Army {
  /** The Great House this army belongs to */
  house: string;
  /** Number of infantry soldiers */
  infantry: number;
  /** Number of cavalry units */
  cavalry: number;
  /** Number of archer units */
  archers: number;
  /** Name of the commanding officer */
  commander: string;
  /** Type of terrain where the battle takes place */
  terrain: 'plains' | 'mountains' | 'forest' | 'desert' | 'riverlands';
  /** Army morale factor (0.0 - 1.0) */
  morale: number;
  /** Army discipline factor (0.0 - 1.0) */
  discipline: number;
  /** Equipment quality factor (0.0 - 1.0) */
  equipment: number;
}

/**
 * Tactical modifiers that affect battle outcomes
 */
export interface BattleModifiers {
  /** Advantage gained from favorable terrain */
  terrainAdvantage: number;
  /** Bonus from experienced commanders */
  commanderBonus: number;
  /** Boost from high army morale */
  moraleBonus: number;
  /** Advantage from superior equipment */
  equipmentBonus: number;
  /** Tactical superiority in troop composition */
  tacticalAdvantage: number;
}

/**
 * Comprehensive battle result with narrative elements
 */
export interface DetailedBattleResult {
  /** Name of the victorious house */
  winner: string;
  /** Detailed casualty breakdown by house and unit type */
  casualties: { [key: string]: { infantry: number; cavalry: number; archers: number; total: number } };
  /** Narrative description of the battle phases */
  battleNarrative: string;
  /** Key tactical moments that decided the battle */
  keyMoments: string[];
  /** Post-battle strategic analysis */
  tacticalAnalysis: string;
  /** How long the battle lasted */
  duration: string;
}

/**
 * House-specific military characteristics based on Game of Thrones lore
 * Each house has unique strengths, weaknesses, and tactical preferences
 */
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
} as const;

/**
 * Calculates comprehensive battle modifiers for an army
 * 
 * @param army - The army to calculate modifiers for
 * @param terrain - The battlefield terrain type
 * @param enemyArmy - The opposing army (for tactical calculations)
 * @returns Object containing all applicable battle modifiers
 */
export function calculateBattleModifiers(army: Army, terrain: string, enemyArmy: Army): BattleModifiers {
  const houseTraits = HOUSE_TRAITS[army.house];
  
  // Return neutral modifiers if house traits not found
  if (!houseTraits) {
    console.warn(`House traits not found for ${army.house}`);
    return { 
      terrainAdvantage: 0, 
      commanderBonus: 0, 
      moraleBonus: 0, 
      equipmentBonus: 0, 
      tacticalAdvantage: 0 
    };
  }

  // Calculate terrain-based advantages
  const terrainAdvantage = houseTraits.terrainBonuses[terrain] || 0;
  
  // Commander experience bonus
  const commanderBonus = houseTraits.commanderBonus;
  
  // Morale impact (centered around 0.5 baseline)
  const moraleBonus = (army.morale - 0.5) * 0.3;
  
  // Equipment quality impact
  const equipmentBonus = (army.equipment - 0.5) * 0.2;
  
  // Calculate tactical advantages based on troop composition
  const tacticalAdvantage = calculateTacticalAdvantage(army, enemyArmy, terrain);

  return {
    terrainAdvantage,
    commanderBonus,
    moraleBonus,
    equipmentBonus,
    tacticalAdvantage
  };
}

/**
 * Calculates tactical advantages based on troop composition and terrain
 * 
 * @param army - The army being analyzed
 * @param enemyArmy - The opposing army
 * @param terrain - The battlefield terrain
 * @returns Tactical advantage modifier
 */
function calculateTacticalAdvantage(army: Army, enemyArmy: Army, terrain: string): number {
  let tacticalAdvantage = 0;
  
  // Calculate army composition ratios
  const totalTroops = army.infantry + army.cavalry + army.archers;
  const enemyTotal = enemyArmy.infantry + enemyArmy.cavalry + enemyArmy.archers;
  
  // Prevent division by zero
  if (totalTroops === 0 || enemyTotal === 0) {
    return 0;
  }
  
  const cavalryRatio = army.cavalry / totalTroops;
  const enemyCavalryRatio = enemyArmy.cavalry / enemyTotal;
  const archerRatio = army.archers / totalTroops;
  const enemyArcherRatio = enemyArmy.archers / enemyTotal;
  
  // Cavalry advantage on open terrain
  if (cavalryRatio > enemyCavalryRatio + 0.1 && terrain === 'plains') {
    tacticalAdvantage += 0.15;
  }
  
  // Archer superiority advantage
  if (archerRatio > enemyArcherRatio + 0.05) {
    tacticalAdvantage += 0.1;
  }

  return tacticalAdvantage;
}

/**
 * Simulates a detailed battle between multiple armies
 * 
 * This function orchestrates a comprehensive battle simulation including:
 * - Multi-phase combat (archery, cavalry, infantry)
 * - House-specific tactical advantages
 * - Terrain effects on combat effectiveness
 * - Realistic casualty calculations
 * - Narrative battle description
 * 
 * @param armies - Array of armies participating in the battle (minimum 2)
 * @param terrain - The battlefield terrain type (default: 'plains')
 * @returns Detailed battle result with winner, casualties, and narrative
 * @throws Error if fewer than 2 armies provided
 */
export function simulateDetailedBattle(armies: Army[], terrain: string = 'plains'): DetailedBattleResult {
  // Validate input
  if (armies.length < 2) {
    throw new Error('Battle simulation requires at least 2 armies');
  }

  const battleNarrative: string[] = [];
  const keyMoments: string[] = [];
  let phase = 1;

  // Calculate army strengths with all modifiers applied
  const armyStrengths = armies.map(army => {
    const modifiers = calculateBattleModifiers(army, terrain, armies.find(a => a !== army)!);
    const baseStrength = calculateBaseStrength(army);
    const totalModifier = calculateTotalModifier(modifiers);
    
    return {
      army,
      strength: baseStrength * totalModifier,
      modifiers,
      casualties: { infantry: 0, cavalry: 0, archers: 0, total: 0 }
    };
  });

  // Simulate battle phases
  simulateArcheryPhase(armyStrengths, battleNarrative, keyMoments, phase++);
  simulateCavalryPhase(armyStrengths, battleNarrative, keyMoments, phase++, terrain);
  simulateInfantryPhase(armyStrengths, battleNarrative, keyMoments, phase++);

  // Determine winner based on final strength calculations
  const winner = armyStrengths.reduce((prev, current) => 
    prev.strength > current.strength ? prev : current
  );

  // Calculate realistic casualties
  const casualties = calculateCasualties(armyStrengths, winner);

  // Generate tactical analysis
  const tacticalAnalysis = generateTacticalAnalysis(winner, terrain);

  return {
    winner: winner.army.house,
    casualties,
    battleNarrative: battleNarrative.join('\n\n'),
    keyMoments,
    tacticalAnalysis,
    duration: `${Math.floor(Math.random() * 6) + 2} hours`
  };
}

/**
 * Calculates base army strength from troop numbers
 */
function calculateBaseStrength(army: Army): number {
  return army.infantry * TROOP_EFFECTIVENESS.INFANTRY + 
         army.cavalry * TROOP_EFFECTIVENESS.CAVALRY + 
         army.archers * TROOP_EFFECTIVENESS.ARCHERS;
}

/**
 * Calculates total modifier from all battle factors
 */
function calculateTotalModifier(modifiers: BattleModifiers): number {
  return 1 + modifiers.terrainAdvantage + modifiers.commanderBonus + 
         modifiers.moraleBonus + modifiers.equipmentBonus + modifiers.tacticalAdvantage;
}

/**
 * Simulates the archery duel phase of battle
 */
function simulateArcheryPhase(armyStrengths: any[], battleNarrative: string[], keyMoments: string[], phase: number): void {
  battleNarrative.push(`**Phase ${phase}: The Archery Duel**`);
  const strongestArchers = armyStrengths.reduce((prev, current) => 
    prev.army.archers > current.army.archers ? prev : current
  );
  keyMoments.push(`${strongestArchers.army.house} gains early advantage with superior archery`);
}

/**
 * Simulates the cavalry charge phase of battle
 */
function simulateCavalryPhase(armyStrengths: any[], battleNarrative: string[], keyMoments: string[], phase: number, terrain: string): void {
  battleNarrative.push(`**Phase ${phase}: The Cavalry Charge**`);
  const strongestCavalry = armyStrengths.reduce((prev, current) => 
    prev.army.cavalry > current.army.cavalry ? prev : current
  );
  
  if (terrain === 'plains') {
    keyMoments.push(`${strongestCavalry.army.house} cavalry charges devastate enemy lines on the open field`);
  } else {
    keyMoments.push(`Cavalry charges are hampered by the ${terrain} terrain`);
  }
}

/**
 * Simulates the infantry melee phase of battle
 */
function simulateInfantryPhase(armyStrengths: any[], battleNarrative: string[], keyMoments: string[], phase: number): void {
  battleNarrative.push(`**Phase ${phase}: The Infantry Melee**`);
  const strongestInfantry = armyStrengths.reduce((prev, current) => 
    prev.army.infantry > current.army.infantry ? prev : current
  );
  keyMoments.push(`${strongestInfantry.army.house} infantry holds the center in brutal melee combat`);
}

/**
 * Calculates realistic casualties for all participating armies
 */
function calculateCasualties(armyStrengths: any[], winner: any): { [key: string]: { infantry: number; cavalry: number; archers: number; total: number } } {
  const casualties: { [key: string]: { infantry: number; cavalry: number; archers: number; total: number } } = {};

  armyStrengths.forEach(armyData => {
    const isWinner = armyData === winner;
    const casualtyRate = isWinner 
      ? BASE_CASUALTY_RATE.WINNER.MIN + Math.random() * (BASE_CASUALTY_RATE.WINNER.MAX - BASE_CASUALTY_RATE.WINNER.MIN)
      : BASE_CASUALTY_RATE.LOSER.MIN + Math.random() * (BASE_CASUALTY_RATE.LOSER.MAX - BASE_CASUALTY_RATE.LOSER.MIN);
    
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

  return casualties;
}

/**
 * Generates tactical analysis based on battle outcome
 */
function generateTacticalAnalysis(winner: any, terrain: string): string {
  const winnerTraits = HOUSE_TRAITS[winner.army.house];
  if (!winnerTraits) {
    return 'Victory achieved through superior tactics and battlefield coordination.';
  }
  
  const terrainEffect = winner.modifiers.terrainAdvantage > 0 ? 'favored' : 'hindered';
  return `Victory achieved through ${winnerTraits.specialty.toLowerCase()}. ${winnerTraits.description}. The ${terrain} terrain ${terrainEffect} their tactics.`;
}

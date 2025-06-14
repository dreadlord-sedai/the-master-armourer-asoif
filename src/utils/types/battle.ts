
/**
 * @fileoverview Battle System Type Definitions
 * 
 * Core type definitions for the Game of Thrones battle simulation system.
 * Provides type safety and clear contracts for all battle-related functionality.
 * 
 * @author Westeros Military Academy
 * @version 1.0.0
 */

/** Supported terrain types that affect battle outcomes */
export type TerrainType = 'plains' | 'mountains' | 'forest' | 'desert' | 'riverlands';

/** Supported unit types in the military system */
export type UnitType = 'infantry' | 'cavalry' | 'archers';

/** Great Houses participating in battles */
export type HouseName = 
  | 'House Stark' 
  | 'House Lannister' 
  | 'House Tyrell' 
  | 'House Baratheon' 
  | 'House Martell' 
  | 'House Arryn';

/**
 * Represents a military army in the battle simulation
 */
export interface Army {
  /** The Great House this army belongs to */
  house: HouseName;
  /** Number of infantry soldiers */
  infantry: number;
  /** Number of cavalry units */
  cavalry: number;
  /** Number of archer units */
  archers: number;
  /** Name of the commanding officer */
  commander: string;
  /** Type of terrain where the battle takes place */
  terrain: TerrainType;
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
 * Casualty breakdown by unit type
 */
export interface CasualtyBreakdown {
  /** Infantry casualties */
  infantry: number;
  /** Cavalry casualties */
  cavalry: number;
  /** Archer casualties */
  archers: number;
  /** Total casualties across all unit types */
  total: number;
}

/**
 * Comprehensive battle result with narrative elements
 */
export interface DetailedBattleResult {
  /** Name of the victorious house */
  winner: HouseName;
  /** Detailed casualty breakdown by house and unit type */
  casualties: Record<string, CasualtyBreakdown>;
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
 * House-specific military characteristics
 */
export interface HouseTraits {
  /** Military specialty description */
  specialty: string;
  /** Base discipline rating (0.0 - 1.0) */
  discipline: number;
  /** Base morale rating (0.0 - 1.0) */
  morale: number;
  /** Base equipment quality (0.0 - 1.0) */
  equipment: number;
  /** Terrain-specific bonuses */
  terrainBonuses: Partial<Record<TerrainType, number>>;
  /** Commander effectiveness bonus */
  commanderBonus: number;
  /** Lore-accurate description */
  description: string;
}

/**
 * Battle phase enumeration
 */
export enum BattlePhase {
  ARCHERY = 1,
  CAVALRY_CHARGE = 2,
  INFANTRY_MELEE = 3
}

/**
 * Army strength calculation with modifiers
 */
export interface ArmyStrengthData {
  /** The army being analyzed */
  army: Army;
  /** Calculated effective strength */
  strength: number;
  /** All applied modifiers */
  modifiers: BattleModifiers;
  /** Casualties sustained */
  casualties: CasualtyBreakdown;
}

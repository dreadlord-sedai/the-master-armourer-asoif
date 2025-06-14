
/**
 * @fileoverview Battle System Constants
 * 
 * Centralized constants for battle calculations and game balance.
 * These values control the behavior and outcomes of battle simulations.
 * 
 * @author Westeros Military Academy
 * @version 1.0.0
 */

import { HouseTraits, HouseName } from '../types/battle';

/** Base casualty rates for winners and losers */
export const BASE_CASUALTY_RATE = {
  WINNER: { MIN: 0.15, MAX: 0.25 },
  LOSER: { MIN: 0.35, MAX: 0.55 }
} as const;

/** Combat effectiveness multipliers by unit type */
export const TROOP_EFFECTIVENESS = {
  INFANTRY: 1.0,    // Baseline effectiveness
  CAVALRY: 1.5,     // Superior battlefield impact
  ARCHERS: 0.8      // Support role effectiveness
} as const;

/** Battle phase enumeration for simulation order */
export const BATTLE_PHASES = {
  ARCHERY: 1,
  CAVALRY_CHARGE: 2,
  INFANTRY_MELEE: 3
} as const;

/** Minimum army requirements for battle eligibility */
export const ARMY_REQUIREMENTS = {
  MIN_TOTAL_TROOPS: 100,
  MIN_ARMIES_FOR_BATTLE: 2,
  MAX_ARMIES_PER_BATTLE: 6
} as const;

/** Battle duration ranges in hours */
export const BATTLE_DURATION = {
  MIN_HOURS: 2,
  MAX_HOURS: 8
} as const;

/**
 * House-specific military characteristics based on Game of Thrones lore
 * Each house has unique strengths, weaknesses, and tactical preferences
 */
export const HOUSE_TRAITS: Record<HouseName, HouseTraits> = {
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

/** Tactical advantage thresholds */
export const TACTICAL_THRESHOLDS = {
  CAVALRY_ADVANTAGE_THRESHOLD: 0.1,
  ARCHER_ADVANTAGE_THRESHOLD: 0.05,
  CAVALRY_PLAINS_BONUS: 0.15,
  ARCHER_SUPERIORITY_BONUS: 0.1
} as const;

/** Modifier calculation constants */
export const MODIFIER_CONSTANTS = {
  MORALE_BASELINE: 0.5,
  MORALE_IMPACT_MULTIPLIER: 0.3,
  EQUIPMENT_BASELINE: 0.5,
  EQUIPMENT_IMPACT_MULTIPLIER: 0.2
} as const;

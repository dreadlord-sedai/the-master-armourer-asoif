
/**
 * @fileoverview Army Strength Calculator
 * 
 * Handles base strength calculations and applies all modifiers to determine
 * final army effectiveness in battle scenarios.
 * 
 * @author Westeros Military Academy
 * @version 1.0.0
 */

import { Army, ArmyStrengthData, CasualtyBreakdown } from '../types/battle';
import { TROOP_EFFECTIVENESS } from '../constants/battleConstants';
import { calculateBattleModifiers, calculateTotalModifier } from './modifierCalculator';

/**
 * Calculates base army strength from troop numbers
 * 
 * @param army - Army to calculate strength for
 * @returns Base strength value before modifiers
 */
export function calculateBaseStrength(army: Army): number {
  return army.infantry * TROOP_EFFECTIVENESS.INFANTRY + 
         army.cavalry * TROOP_EFFECTIVENESS.CAVALRY + 
         army.archers * TROOP_EFFECTIVENESS.ARCHERS;
}

/**
 * Calculates complete army strength data including all modifiers
 * 
 * @param army - Army to analyze
 * @param terrain - Battlefield terrain
 * @param enemyArmy - Opposing army for tactical calculations
 * @returns Complete army strength analysis
 */
export function calculateArmyStrength(
  army: Army, 
  terrain: string, 
  enemyArmy: Army
): ArmyStrengthData {
  const modifiers = calculateBattleModifiers(army, terrain as any, enemyArmy);
  const baseStrength = calculateBaseStrength(army);
  const totalModifier = calculateTotalModifier(modifiers);
  
  return {
    army,
    strength: baseStrength * totalModifier,
    modifiers,
    casualties: createEmptyCasualties()
  };
}

/**
 * Creates an empty casualty breakdown
 */
function createEmptyCasualties(): CasualtyBreakdown {
  return { infantry: 0, cavalry: 0, archers: 0, total: 0 };
}

/**
 * Validates army composition for battle eligibility
 * 
 * @param army - Army to validate
 * @throws Error if army is invalid
 */
export function validateArmy(army: Army): void {
  const totalTroops = army.infantry + army.cavalry + army.archers;
  
  if (totalTroops <= 0) {
    throw new Error(`Army ${army.house} must have at least one unit`);
  }
  
  if (army.infantry < 0 || army.cavalry < 0 || army.archers < 0) {
    throw new Error(`Army ${army.house} cannot have negative unit counts`);
  }
  
  if (army.morale < 0 || army.morale > 1) {
    throw new Error(`Army ${army.house} morale must be between 0 and 1`);
  }
  
  if (army.discipline < 0 || army.discipline > 1) {
    throw new Error(`Army ${army.house} discipline must be between 0 and 1`);
  }
  
  if (army.equipment < 0 || army.equipment > 1) {
    throw new Error(`Army ${army.house} equipment must be between 0 and 1`);
  }
}

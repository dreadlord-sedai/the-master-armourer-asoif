
/**
 * @fileoverview Game of Thrones Battle Simulation Engine
 * 
 * Main orchestrator for battle simulations in the Seven Kingdoms.
 * Coordinates between different battle systems to provide comprehensive
 * and realistic combat outcomes with narrative elements.
 * 
 * @author Westeros Military Academy
 * @version 2.0.0
 */

// Re-export types for backward compatibility
export type { Army, BattleModifiers, DetailedBattleResult } from './types/battle';

// Re-export constants for backward compatibility
export { HOUSE_TRAITS } from './constants/battleConstants';

// Re-export main functions for backward compatibility
export { calculateBattleModifiers } from './battle/modifierCalculator';

import { Army, DetailedBattleResult, ArmyStrengthData, BattlePhase } from './types/battle';
import { BASE_CASUALTY_RATE, BATTLE_DURATION, ARMY_REQUIREMENTS } from './constants/battleConstants';
import { calculateArmyStrength, validateArmy } from './battle/strengthCalculator';
import { calculateBattleCasualties } from './battle/casualtyCalculator';
import { generateBattleNarrative, generateTacticalAnalysis } from './battle/narrativeGenerator';

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
 * @throws Error if input validation fails
 */
export function simulateDetailedBattle(armies: Army[], terrain: string = 'plains'): DetailedBattleResult {
  // Validate input
  validateBattleInput(armies);
  
  // Validate each army
  armies.forEach(validateArmy);

  // Calculate army strengths with all modifiers applied
  const armyStrengths = armies.map(army => 
    calculateArmyStrength(army, terrain, armies.find(a => a !== army)!)
  );

  // Simulate battle phases and generate narrative
  const { battleNarrative, keyMoments } = generateBattleNarrative(armyStrengths, terrain);

  // Determine winner based on final strength calculations
  const winner = determineWinner(armyStrengths);

  // Calculate realistic casualties
  const casualties = calculateBattleCasualties(armyStrengths, winner);

  // Generate tactical analysis
  const tacticalAnalysis = generateTacticalAnalysis(winner, terrain);

  // Generate battle duration
  const duration = generateBattleDuration();

  return {
    winner: winner.army.house,
    casualties,
    battleNarrative,
    keyMoments,
    tacticalAnalysis,
    duration
  };
}

/**
 * Validates battle input parameters
 */
function validateBattleInput(armies: Army[]): void {
  if (armies.length < ARMY_REQUIREMENTS.MIN_ARMIES_FOR_BATTLE) {
    throw new Error(`Battle simulation requires at least ${ARMY_REQUIREMENTS.MIN_ARMIES_FOR_BATTLE} armies`);
  }
  
  if (armies.length > ARMY_REQUIREMENTS.MAX_ARMIES_PER_BATTLE) {
    throw new Error(`Battle simulation supports maximum ${ARMY_REQUIREMENTS.MAX_ARMIES_PER_BATTLE} armies`);
  }
}

/**
 * Determines the winner based on army strengths
 */
function determineWinner(armyStrengths: ArmyStrengthData[]): ArmyStrengthData {
  return armyStrengths.reduce((prev, current) => 
    prev.strength > current.strength ? prev : current
  );
}

/**
 * Generates realistic battle duration
 */
function generateBattleDuration(): string {
  const hours = Math.floor(Math.random() * (BATTLE_DURATION.MAX_HOURS - BATTLE_DURATION.MIN_HOURS + 1)) + BATTLE_DURATION.MIN_HOURS;
  return `${hours} hours`;
}

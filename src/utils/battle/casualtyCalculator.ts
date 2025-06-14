
/**
 * @fileoverview Battle Casualty Calculator
 * 
 * Handles realistic casualty calculations based on battle outcomes,
 * army strengths, and historical medieval combat patterns.
 * 
 * @author Westeros Military Academy
 * @version 1.0.0
 */

import { ArmyStrengthData, CasualtyBreakdown } from '../types/battle';
import { BASE_CASUALTY_RATE } from '../constants/battleConstants';

/**
 * Calculates realistic casualties for all participating armies
 * 
 * @param armyStrengths - Array of army strength data
 * @param winner - The victorious army
 * @returns Casualty breakdown by house
 */
export function calculateBattleCasualties(
  armyStrengths: ArmyStrengthData[], 
  winner: ArmyStrengthData
): Record<string, CasualtyBreakdown> {
  const casualties: Record<string, CasualtyBreakdown> = {};

  armyStrengths.forEach(armyData => {
    const isWinner = armyData === winner;
    const casualtyRate = calculateCasualtyRate(isWinner);
    
    casualties[armyData.army.house] = calculateArmyCasualties(armyData.army, casualtyRate);
  });

  return casualties;
}

/**
 * Calculates casualty rate based on battle outcome
 */
function calculateCasualtyRate(isWinner: boolean): number {
  const rates = isWinner ? BASE_CASUALTY_RATE.WINNER : BASE_CASUALTY_RATE.LOSER;
  return rates.MIN + Math.random() * (rates.MAX - rates.MIN);
}

/**
 * Calculates casualties for a specific army
 */
function calculateArmyCasualties(army: any, casualtyRate: number): CasualtyBreakdown {
  const infantryCasualties = Math.floor(army.infantry * casualtyRate);
  const cavalryCasualties = Math.floor(army.cavalry * casualtyRate);
  const archerCasualties = Math.floor(army.archers * casualtyRate);
  
  return {
    infantry: infantryCasualties,
    cavalry: cavalryCasualties,
    archers: archerCasualties,
    total: infantryCasualties + cavalryCasualties + archerCasualties
  };
}

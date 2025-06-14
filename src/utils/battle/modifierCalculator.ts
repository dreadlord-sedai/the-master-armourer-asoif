
/**
 * @fileoverview Battle Modifier Calculator
 * 
 * Handles all calculations related to battle modifiers including terrain advantages,
 * commander bonuses, morale effects, and tactical superiority.
 * 
 * @author Westeros Military Academy
 * @version 1.0.0
 */

import { Army, BattleModifiers, TerrainType } from '../types/battle';
import { HOUSE_TRAITS, TACTICAL_THRESHOLDS, MODIFIER_CONSTANTS } from '../constants/battleConstants';

/**
 * Calculates comprehensive battle modifiers for an army
 * 
 * @param army - The army to calculate modifiers for
 * @param terrain - The battlefield terrain type
 * @param enemyArmy - The opposing army (for tactical calculations)
 * @returns Object containing all applicable battle modifiers
 */
export function calculateBattleModifiers(
  army: Army, 
  terrain: TerrainType, 
  enemyArmy: Army
): BattleModifiers {
  const houseTraits = HOUSE_TRAITS[army.house];
  
  // Return neutral modifiers if house traits not found
  if (!houseTraits) {
    console.warn(`House traits not found for ${army.house}`);
    return createNeutralModifiers();
  }

  return {
    terrainAdvantage: calculateTerrainAdvantage(houseTraits, terrain),
    commanderBonus: houseTraits.commanderBonus,
    moraleBonus: calculateMoraleBonus(army.morale),
    equipmentBonus: calculateEquipmentBonus(army.equipment),
    tacticalAdvantage: calculateTacticalAdvantage(army, enemyArmy, terrain)
  };
}

/**
 * Creates neutral modifiers when house traits are not found
 */
function createNeutralModifiers(): BattleModifiers {
  return { 
    terrainAdvantage: 0, 
    commanderBonus: 0, 
    moraleBonus: 0, 
    equipmentBonus: 0, 
    tacticalAdvantage: 0 
  };
}

/**
 * Calculates terrain-based advantages for a house
 */
function calculateTerrainAdvantage(houseTraits: any, terrain: TerrainType): number {
  return houseTraits.terrainBonuses[terrain] || 0;
}

/**
 * Calculates morale impact on army performance
 */
function calculateMoraleBonus(morale: number): number {
  return (morale - MODIFIER_CONSTANTS.MORALE_BASELINE) * MODIFIER_CONSTANTS.MORALE_IMPACT_MULTIPLIER;
}

/**
 * Calculates equipment quality impact on army performance
 */
function calculateEquipmentBonus(equipment: number): number {
  return (equipment - MODIFIER_CONSTANTS.EQUIPMENT_BASELINE) * MODIFIER_CONSTANTS.EQUIPMENT_IMPACT_MULTIPLIER;
}

/**
 * Calculates tactical advantages based on troop composition and terrain
 * 
 * @param army - The army being analyzed
 * @param enemyArmy - The opposing army
 * @param terrain - The battlefield terrain
 * @returns Tactical advantage modifier
 */
function calculateTacticalAdvantage(army: Army, enemyArmy: Army, terrain: TerrainType): number {
  const totalTroops = getTotalTroops(army);
  const enemyTotal = getTotalTroops(enemyArmy);
  
  // Prevent division by zero
  if (totalTroops === 0 || enemyTotal === 0) {
    return 0;
  }
  
  let tacticalAdvantage = 0;
  
  // Calculate unit composition advantages
  tacticalAdvantage += calculateCavalryAdvantage(army, enemyArmy, terrain, totalTroops, enemyTotal);
  tacticalAdvantage += calculateArcherAdvantage(army, enemyArmy, totalTroops, enemyTotal);
  
  return tacticalAdvantage;
}

/**
 * Calculates total troop count for an army
 */
function getTotalTroops(army: Army): number {
  return army.infantry + army.cavalry + army.archers;
}

/**
 * Calculates cavalry-based tactical advantages
 */
function calculateCavalryAdvantage(
  army: Army, 
  enemyArmy: Army, 
  terrain: TerrainType, 
  totalTroops: number, 
  enemyTotal: number
): number {
  const cavalryRatio = army.cavalry / totalTroops;
  const enemyCavalryRatio = enemyArmy.cavalry / enemyTotal;
  
  // Cavalry advantage on open terrain
  if (cavalryRatio > enemyCavalryRatio + TACTICAL_THRESHOLDS.CAVALRY_ADVANTAGE_THRESHOLD && terrain === 'plains') {
    return TACTICAL_THRESHOLDS.CAVALRY_PLAINS_BONUS;
  }
  
  return 0;
}

/**
 * Calculates archer-based tactical advantages
 */
function calculateArcherAdvantage(
  army: Army, 
  enemyArmy: Army, 
  totalTroops: number, 
  enemyTotal: number
): number {
  const archerRatio = army.archers / totalTroops;
  const enemyArcherRatio = enemyArmy.archers / enemyTotal;
  
  // Archer superiority advantage
  if (archerRatio > enemyArcherRatio + TACTICAL_THRESHOLDS.ARCHER_ADVANTAGE_THRESHOLD) {
    return TACTICAL_THRESHOLDS.ARCHER_SUPERIORITY_BONUS;
  }
  
  return 0;
}

/**
 * Calculates total modifier from all battle factors
 */
export function calculateTotalModifier(modifiers: BattleModifiers): number {
  return 1 + modifiers.terrainAdvantage + modifiers.commanderBonus + 
         modifiers.moraleBonus + modifiers.equipmentBonus + modifiers.tacticalAdvantage;
}

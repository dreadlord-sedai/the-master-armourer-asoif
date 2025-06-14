
/**
 * @fileoverview Battle Narrative Generator
 * 
 * Generates immersive battle narratives and tactical analysis
 * based on army compositions, terrain, and battle outcomes.
 * 
 * @author Westeros Military Academy
 * @version 1.0.0
 */

import { ArmyStrengthData, TerrainType, BattlePhase } from '../types/battle';
import { HOUSE_TRAITS } from '../constants/battleConstants';

/**
 * Generates complete battle narrative with key moments
 */
export function generateBattleNarrative(
  armyStrengths: ArmyStrengthData[], 
  terrain: string
): { battleNarrative: string; keyMoments: string[] } {
  const battleNarrative: string[] = [];
  const keyMoments: string[] = [];

  // Simulate each battle phase
  simulateArcheryPhase(armyStrengths, battleNarrative, keyMoments);
  simulateCavalryPhase(armyStrengths, battleNarrative, keyMoments, terrain);
  simulateInfantryPhase(armyStrengths, battleNarrative, keyMoments);

  return {
    battleNarrative: battleNarrative.join('\n\n'),
    keyMoments
  };
}

/**
 * Simulates the archery duel phase of battle
 */
function simulateArcheryPhase(
  armyStrengths: ArmyStrengthData[], 
  battleNarrative: string[], 
  keyMoments: string[]
): void {
  battleNarrative.push(`**Phase ${BattlePhase.ARCHERY}: The Archery Duel**`);
  
  const strongestArchers = armyStrengths.reduce((prev, current) => 
    prev.army.archers > current.army.archers ? prev : current
  );
  
  battleNarrative.push(
    `The battle begins with volleys of arrows darkening the sky. ` +
    `${strongestArchers.army.house} archers loose coordinated salvos, ` +
    `forcing enemy formations to raise shields and advance under cover.`
  );
  
  keyMoments.push(`${strongestArchers.army.house} gains early advantage with superior archery`);
}

/**
 * Simulates the cavalry charge phase of battle
 */
function simulateCavalryPhase(
  armyStrengths: ArmyStrengthData[], 
  battleNarrative: string[], 
  keyMoments: string[], 
  terrain: string
): void {
  battleNarrative.push(`**Phase ${BattlePhase.CAVALRY_CHARGE}: The Cavalry Charge**`);
  
  const strongestCavalry = armyStrengths.reduce((prev, current) => 
    prev.army.cavalry > current.army.cavalry ? prev : current
  );
  
  if (terrain === 'plains') {
    battleNarrative.push(
      `Thunder of hooves shakes the earth as ${strongestCavalry.army.house} cavalry ` +
      `charges across the open field. Their heavy horse smashes into enemy lines ` +
      `with devastating force, splintering formations and spreading chaos.`
    );
    keyMoments.push(`${strongestCavalry.army.house} cavalry charges devastate enemy lines on the open field`);
  } else {
    battleNarrative.push(
      `The ${terrain} terrain hampers cavalry movements. Horses struggle with ` +
      `footing and obstacles, limiting the effectiveness of mounted charges.`
    );
    keyMoments.push(`Cavalry charges are hampered by the ${terrain} terrain`);
  }
}

/**
 * Simulates the infantry melee phase of battle
 */
function simulateInfantryPhase(
  armyStrengths: ArmyStrengthData[], 
  battleNarrative: string[], 
  keyMoments: string[]
): void {
  battleNarrative.push(`**Phase ${BattlePhase.INFANTRY_MELEE}: The Infantry Melee**`);
  
  const strongestInfantry = armyStrengths.reduce((prev, current) => 
    prev.army.infantry > current.army.infantry ? prev : current
  );
  
  battleNarrative.push(
    `Steel rings against steel as infantry formations clash in brutal melee. ` +
    `${strongestInfantry.army.house} soldiers maintain disciplined ranks, ` +
    `their training evident as they push forward through the carnage.`
  );
  
  keyMoments.push(`${strongestInfantry.army.house} infantry holds the center in brutal melee combat`);
}

/**
 * Generates tactical analysis based on battle outcome
 */
export function generateTacticalAnalysis(winner: ArmyStrengthData, terrain: string): string {
  const winnerTraits = HOUSE_TRAITS[winner.army.house];
  
  if (!winnerTraits) {
    return 'Victory achieved through superior tactics and battlefield coordination.';
  }
  
  const terrainEffect = winner.modifiers.terrainAdvantage > 0 ? 'favored' : 'hindered';
  
  return `Victory achieved through ${winnerTraits.specialty.toLowerCase()}. ` +
         `${winnerTraits.description} ` +
         `The ${terrain} terrain ${terrainEffect} their tactics, ` +
         `${terrainEffect === 'favored' ? 'amplifying' : 'limiting'} their natural advantages.`;
}

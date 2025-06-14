
# 📚 Battle Simulation API Documentation

## Overview

The Game of Thrones Military Command Center uses a sophisticated battle simulation engine that calculates realistic combat outcomes based on house characteristics, terrain effects, and tactical considerations.

## Core Functions

### `simulateDetailedBattle(armies, terrain)`

The primary battle simulation function that orchestrates complete military engagements.

**Parameters:**
- `armies: Army[]` - Array of participating armies (minimum 2)
- `terrain: string` - Battlefield terrain type

**Returns:** `DetailedBattleResult`

**Example:**
```typescript
const armies = [
  {
    house: 'House Stark',
    infantry: 10000,
    cavalry: 2000,
    archers: 1500,
    commander: 'Robb Stark',
    terrain: 'plains',
    morale: 0.85,
    discipline: 0.9,
    equipment: 0.8
  },
  {
    house: 'House Lannister',
    infantry: 8000,
    cavalry: 3000,
    archers: 2000,
    commander: 'Tywin Lannister',
    terrain: 'plains',
    morale: 0.8,
    discipline: 0.95,
    equipment: 0.95
  }
];

const result = simulateDetailedBattle(armies, 'plains');
```

### `calculateBattleModifiers(army, terrain, enemyArmy)`

Calculates all tactical modifiers affecting an army's performance.

**Parameters:**
- `army: Army` - The army to analyze
- `terrain: string` - Battlefield terrain
- `enemyArmy: Army` - Opposition for comparative calculations

**Returns:** `BattleModifiers`

## Data Structures

### Army Interface
```typescript
interface Army {
  house: string;                    // Great House name
  infantry: number;                 // Infantry unit count
  cavalry: number;                  // Cavalry unit count
  archers: number;                  // Archer unit count
  commander: string;                // Commanding officer
  terrain: TerrainType;            // Battle terrain
  morale: number;                  // Morale factor (0.0-1.0)
  discipline: number;              // Discipline factor (0.0-1.0)
  equipment: number;               // Equipment quality (0.0-1.0)
}
```

### BattleModifiers Interface
```typescript
interface BattleModifiers {
  terrainAdvantage: number;        // Terrain-based bonus
  commanderBonus: number;          // Leadership effectiveness
  moraleBonus: number;             // Morale impact
  equipmentBonus: number;          // Equipment advantage
  tacticalAdvantage: number;       // Tactical superiority
}
```

### DetailedBattleResult Interface
```typescript
interface DetailedBattleResult {
  winner: string;                  // Victorious house name
  casualties: CasualtyReport;      // Detailed loss breakdown
  battleNarrative: string;         // Multi-phase battle story
  keyMoments: string[];           // Critical battle events
  tacticalAnalysis: string;        // Strategic assessment
  duration: string;                // Battle length
}
```

## Battle Mechanics

### Phase System
1. **Archery Phase**: Ranged combat effectiveness
2. **Cavalry Charge**: Mounted unit impact
3. **Infantry Melee**: Close combat resolution

### Terrain Effects
- **Plains**: +25% cavalry effectiveness for Tyrell
- **Mountains**: +35% defensive bonus for Arryn
- **Forest**: +20% advantage for Stark forces
- **Desert**: +40% effectiveness for Martell
- **Riverlands**: Balanced terrain with mixed bonuses

### House Specializations
Each house has unique military characteristics:
- **Discipline**: Training and formation quality
- **Morale**: Fighting spirit and resilience
- **Equipment**: Armor and weapon superiority
- **Terrain Bonuses**: Regional tactical advantages
- **Commander Bonus**: Leadership effectiveness

## Calculation Algorithms

### Base Strength Calculation
```typescript
baseStrength = (infantry * 1.0) + (cavalry * 1.5) + (archers * 0.8)
```

### Total Modifier Application
```typescript
totalModifier = 1 + terrainAdvantage + commanderBonus + 
                moraleBonus + equipmentBonus + tacticalAdvantage
```

### Final Army Strength
```typescript
finalStrength = baseStrength * totalModifier
```

### Casualty Calculation
- **Winners**: 15-25% casualties
- **Losers**: 35-55% casualties
- Modified by relative strength differences

## Constants and Configuration

### Troop Effectiveness Multipliers
```typescript
const TROOP_EFFECTIVENESS = {
  INFANTRY: 1.0,    // Baseline effectiveness
  CAVALRY: 1.5,     // Superior battlefield impact
  ARCHERS: 0.8      // Support role effectiveness
}
```

### Casualty Rate Ranges
```typescript
const BASE_CASUALTY_RATE = {
  WINNER: { MIN: 0.15, MAX: 0.25 },
  LOSER: { MIN: 0.35, MAX: 0.55 }
}
```

## Error Handling

### Common Errors
- **Insufficient Armies**: Minimum 2 armies required
- **Invalid House**: House not found in HOUSE_TRAITS
- **Invalid Terrain**: Unsupported terrain type
- **Negative Values**: Army counts must be positive

### Error Prevention
```typescript
if (armies.length < 2) {
  throw new Error('Battle simulation requires at least 2 armies');
}
```

## Performance Considerations

### Optimization Strategies
- Efficient array operations for large armies
- Memoized calculations for repeated simulations
- Minimal DOM manipulation during calculations
- Optimized random number generation

### Scaling Factors
- Supports up to 6 simultaneous armies
- Handles army sizes up to 100,000 troops
- Sub-second calculation times for typical battles

## Integration Examples

### React Component Usage
```typescript
const BattleComponent = () => {
  const [result, setResult] = useState<DetailedBattleResult | null>(null);
  
  const handleBattle = () => {
    const armies = generateArmies();
    const battleResult = simulateDetailedBattle(armies, 'plains');
    setResult(battleResult);
  };
  
  return (
    <div>
      <button onClick={handleBattle}>Start Battle</button>
      {result && <BattleResults result={result} />}
    </div>
  );
};
```

### Custom House Integration
```typescript
// Add new house to HOUSE_TRAITS
const HOUSE_TRAITS = {
  ...HOUSE_TRAITS,
  'House Tully': {
    specialty: 'River Navy',
    discipline: 0.78,
    morale: 0.85,
    equipment: 0.75,
    terrainBonuses: { riverlands: 0.3 },
    commanderBonus: 0.12,
    description: 'Masters of river warfare and defensive tactics'
  }
};
```

## Testing and Validation

### Unit Test Examples
```typescript
describe('Battle Simulation', () => {
  test('should determine winner correctly', () => {
    const armies = createTestArmies();
    const result = simulateDetailedBattle(armies, 'plains');
    expect(result.winner).toBeDefined();
  });
  
  test('should calculate realistic casualties', () => {
    const result = simulateDetailedBattle(armies, 'plains');
    const totalCasualties = Object.values(result.casualties)
      .reduce((sum, house) => sum + house.total, 0);
    expect(totalCasualties).toBeGreaterThan(0);
  });
});
```

### Validation Rules
- Winner must be one of the participating houses
- Total casualties should be proportional to army sizes
- Terrain bonuses should affect appropriate houses
- Battle duration should be realistic (2-8 hours)

## Future Enhancements

### Planned Features
- **Siege Warfare**: Castle and fortification mechanics
- **Naval Combat**: Ship-based battle simulation
- **Campaign Mode**: Multi-battle war simulation
- **Unit Veterancy**: Experience-based improvements
- **Weather Effects**: Environmental battle modifiers

### API Extensions
- Webhook integration for battle events
- Real-time battle streaming
- Historical battle replay system
- Advanced statistical analysis
- Machine learning outcome prediction

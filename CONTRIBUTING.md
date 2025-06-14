# 🤝 Contributing to Game of Thrones Military Command Center

Thank you for your interest in contributing to our Westeros military simulation! Whether you're fixing bugs, adding features, or improving documentation, your contributions help make this project better for everyone.

## 🎯 Project Goals

- **Lore Accuracy**: Maintain authenticity to Game of Thrones military themes
- **User Experience**: Create intuitive and engaging interfaces
- **Performance**: Ensure smooth operation across all devices
- **Code Quality**: Write maintainable, well-documented code

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git for version control
- Basic knowledge of React and TypeScript

### Development Setup
1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/got-military-center.git
   cd got-military-center
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```
5. **Open your browser** to `http://localhost:5173`

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui component library
│   └── *.tsx           # Custom components
├── pages/              # Main application pages
├── utils/              # Utility functions and logic
│   └── battleLogic.ts  # Core battle simulation
├── lib/                # Configuration and utilities
└── types/              # TypeScript type definitions
```

## 📝 Contribution Guidelines

### Code Style Standards

#### TypeScript Best Practices
```typescript
// ✅ Good: Explicit types and interfaces
interface ArmyStats {
  infantry: number;
  cavalry: number;
  archers: number;
}

// ✅ Good: Descriptive function names with JSDoc
/**
 * Calculates total army strength including modifiers
 * @param army - Army data to analyze
 * @returns Calculated strength value
 */
function calculateArmyStrength(army: Army): number {
  // Implementation
}

// ❌ Bad: Implicit any types
function processData(data) {
  return data.map(item => item.value);
}
```

#### React Component Guidelines
```typescript
// ✅ Good: Functional components with TypeScript
interface HouseCardProps {
  house: HouseData;
  onSelect: (houseId: string) => void;
}

const HouseCard: React.FC<HouseCardProps> = ({ house, onSelect }) => {
  // Component implementation
};

// ✅ Good: Use React.memo for performance when needed
export default React.memo(HouseCard);
```

#### Styling Conventions
```typescript
// ✅ Good: Tailwind classes with logical grouping
<div className="flex items-center space-x-2 p-4 rounded-lg border border-gold-500/30 bg-parchment-100">

// ✅ Good: Custom CSS classes for complex styling
<div className="parchment-card battle-simulation-grid">

// ❌ Bad: Inline styles (avoid unless absolutely necessary)
<div style={{ backgroundColor: '#fff', padding: '16px' }}>
```

### Documentation Standards

#### Component Documentation
```typescript
/**
 * @fileoverview Battle Result Display Component
 * 
 * Renders comprehensive battle outcomes including casualties,
 * tactical analysis, and narrative descriptions.
 * 
 * @example
 * <BattleResult 
 *   result={battleResult} 
 *   onNewBattle={handleNewBattle}
 * />
 */

/**
 * Battle Result Display Component
 * 
 * Shows detailed battle outcomes with visual charts and narrative text.
 * Includes casualty breakdowns, key moments, and tactical analysis.
 * 
 * @param props - Component properties
 * @param props.result - Detailed battle result data
 * @param props.onNewBattle - Callback for starting new battle
 * @returns JSX.Element Complete battle result interface
 */
```

#### Function Documentation
```typescript
/**
 * Validates army composition for battle eligibility
 * 
 * Ensures armies meet minimum requirements for battle simulation:
 * - At least 100 total troops
 * - All troop counts are non-negative
 * - Valid house assignment
 * 
 * @param army - Army data to validate
 * @returns ValidationResult with success status and error messages
 * @throws ValidationError if critical validation fails
 * 
 * @example
 * ```typescript
 * const validation = validateArmy(starkArmy);
 * if (!validation.isValid) {
 *   console.error('Army validation failed:', validation.errors);
 * }
 * ```
 */
```

## 🏰 Adding New Houses

### House Data Structure
```typescript
// Add to HOUSE_TRAITS in battleLogic.ts
'House Tully': {
  specialty: 'River Defense',
  discipline: 0.78,
  morale: 0.85,
  equipment: 0.75,
  terrainBonuses: { 
    riverlands: 0.30,
    plains: 0.10 
  },
  commanderBonus: 0.12,
  description: 'Masters of river warfare and defensive tactics'
}
```

### Visual Assets
```typescript
// Add to armyData in ArmyComparisonTool.tsx
'house-tully': {
  name: 'House Tully',
  troops: 25000,
  cavalry: 4000,
  infantry: 18000,
  archers: 3000,
  specialty: 'River Defense & Naval Tactics',
  commander: 'Edmure Tully',
  stronghold: 'Riverrun',
  color: 'text-blue-500',
  sigil: '🐟',
  // ... other properties
}
```

### Testing New Houses
```typescript
// Create comprehensive tests
describe('House Tully Integration', () => {
  test('should have valid house traits', () => {
    expect(HOUSE_TRAITS['House Tully']).toBeDefined();
    expect(HOUSE_TRAITS['House Tully'].discipline).toBeGreaterThan(0);
  });
  
  test('should perform well in riverlands terrain', () => {
    const tully = createTullyArmy();
    const modifiers = calculateBattleModifiers(tully, 'riverlands', enemyArmy);
    expect(modifiers.terrainAdvantage).toBeGreaterThan(0.2);
  });
});
```

## 🔧 Common Contribution Types

### Bug Fixes
1. **Identify the Issue**: Reproduce the bug consistently
2. **Create Issue**: Document steps to reproduce
3. **Write Test**: Add test case that fails with the bug
4. **Fix Implementation**: Resolve the issue
5. **Verify Fix**: Ensure test passes and no regressions

### New Features
1. **Feature Proposal**: Create GitHub issue with detailed description
2. **Design Discussion**: Collaborate on implementation approach
3. **Implementation**: Build feature with comprehensive tests
4. **Documentation**: Update README and API docs
5. **Review Process**: Submit PR for team review

### Performance Improvements
1. **Identify Bottleneck**: Profile application performance
2. **Measure Baseline**: Establish current performance metrics
3. **Implement Optimization**: Make targeted improvements
4. **Validate Results**: Confirm performance gains
5. **Update Documentation**: Document optimization techniques

## 🧪 Testing Guidelines

### Unit Testing
```typescript
// Test battle logic functions
describe('Battle Simulation', () => {
  test('should calculate correct army strength', () => {
    const army = createTestArmy();
    const strength = calculateArmyStrength(army);
    expect(strength).toBeGreaterThan(0);
  });
  
  test('should apply terrain modifiers correctly', () => {
    const stark = createStarkArmy();
    const modifiers = calculateBattleModifiers(stark, 'forest', enemyArmy);
    expect(modifiers.terrainAdvantage).toBe(0.2);
  });
});
```

### Component Testing
```typescript
// Test React components
describe('HouseCard Component', () => {
  test('should render house information', () => {
    render(<HouseCard house={mockHouse} onSelect={mockOnSelect} />);
    expect(screen.getByText('House Stark')).toBeInTheDocument();
  });
  
  test('should call onSelect when clicked', () => {
    const mockOnSelect = jest.fn();
    render(<HouseCard house={mockHouse} onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByText('House Stark'));
    expect(mockOnSelect).toHaveBeenCalledWith('stark');
  });
});
```

### Integration Testing
```typescript
// Test complete user workflows
describe('Battle Simulation Workflow', () => {
  test('should complete full battle simulation', () => {
    // Deploy armies
    deployArmy('stark', { x: 25, y: 25 });
    deployArmy('lannister', { x: 75, y: 75 });
    
    // Start battle
    fireEvent.click(screen.getByText('Begin Battle'));
    
    // Verify results
    expect(screen.getByText(/victorious/i)).toBeInTheDocument();
  });
});
```

## 📊 Performance Standards

### Metrics to Monitor
- **Bundle Size**: Keep under 2MB for main bundle
- **Load Time**: Initial page load under 3 seconds
- **Interaction Response**: UI updates within 100ms
- **Memory Usage**: Stable memory consumption during battles

### Optimization Techniques
```typescript
// Use React.memo for expensive components
const BattleChart = React.memo(({ data }) => {
  return <ComplexChart data={data} />;
});

// Lazy load heavy components
const BattleSimulator = lazy(() => import('./pages/BattleSimulator'));

// Optimize re-renders with useMemo and useCallback
const memoizedArmyData = useMemo(() => 
  processArmyData(rawData), [rawData]
);
```

## 🎨 Design Guidelines

### Visual Consistency
- **Colors**: Use Game of Thrones inspired palette
- **Typography**: Cinzel for headings, Cormorant for body text
- **Spacing**: Consistent Tailwind spacing scale
- **Components**: Utilize shadcn/ui component library

### Accessibility Requirements
- **WCAG 2.1 AA Compliance**: Ensure all content is accessible
- **Keyboard Navigation**: Full keyboard operation support
- **Screen Readers**: Proper ARIA labels and descriptions
- **Color Contrast**: Minimum 4.5:1 contrast ratio

### Responsive Design
```typescript
// Mobile-first responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Responsive text sizing
<h1 className="text-2xl md:text-4xl lg:text-6xl font-cinzel">

// Adaptive layouts
<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
```

## 🔍 Code Review Process

### Review Checklist
- [ ] **Functionality**: Feature works as intended
- [ ] **Tests**: Comprehensive test coverage
- [ ] **Documentation**: Updated docs and comments
- [ ] **Performance**: No performance regressions
- [ ] **Accessibility**: WCAG compliance maintained
- [ ] **Lore Accuracy**: Authentic to Game of Thrones

### Review Guidelines
1. **Be Constructive**: Provide helpful, specific feedback
2. **Ask Questions**: Seek clarification on unclear code
3. **Suggest Improvements**: Offer alternative approaches
4. **Praise Good Work**: Acknowledge quality contributions
5. **Test Thoroughly**: Verify functionality in multiple scenarios

## 🚨 Security Considerations

### Data Validation
```typescript
// Validate user inputs
function validateArmyInput(input: unknown): Army {
  const schema = z.object({
    infantry: z.number().min(0).max(100000),
    cavalry: z.number().min(0).max(50000),
    archers: z.number().min(0).max(30000),
    house: z.enum(['House Stark', 'House Lannister', /* ... */])
  });
  
  return schema.parse(input);
}
```

### Safe Operations
```typescript
// Prevent XSS with proper sanitization
const sanitizedHouseName = DOMPurify.sanitize(userInput);

// Use type-safe operations
const armyTotal = army.infantry + army.cavalry + army.archers;
if (armyTotal <= 0) {
  throw new Error('Army must have troops');
}
```

## 📋 Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Performance improvement
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Performance impact assessed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or breaking changes documented)

## Screenshots
Add screenshots for UI changes.

## Additional Notes
Any additional context or considerations.
```

## 🎉 Recognition

Contributors will be recognized in:
- **README Credits**: Listed in acknowledgments section
- **Release Notes**: Major contributions highlighted
- **Hall of Fame**: Special recognition for significant contributions

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Discord**: Real-time chat with maintainers
- **Documentation**: Comprehensive guides and API reference

Thank you for contributing to the defense of the Seven Kingdoms! 🗡️⚔️🏰

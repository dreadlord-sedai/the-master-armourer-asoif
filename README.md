
# 🏰 Game of Thrones: Military Command Center

> *"In the game of thrones, you win or you die"* - Cersei Lannister

A comprehensive, interactive web application that brings the military strategies and political dynamics of Westeros to life. Experience authentic Game of Thrones warfare through advanced battle simulations, house analytics, and immersive storytelling.

[![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-ff69b4.svg)](https://lovable.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🎯 Overview

The **Game of Thrones Military Command Center** is a sophisticated web application that allows users to:

- **🗡️ Simulate Epic Battles**: Deploy armies with authentic tactical considerations
- **📊 Analyze Military Strength**: Compare the capabilities of Great Houses
- **🗺️ Explore Interactive Maps**: Navigate the geography of Westeros
- **👑 Create Characters**: Design custom lords and ladies
- **🏆 Host Tournaments**: Organize medieval competitions
- **📚 Access Lore Library**: Explore rich Game of Thrones content

## ✨ Key Features

### 🗡️ Advanced Battle Simulator
- **Multi-Phase Combat**: Archery → Cavalry → Infantry phases
- **Terrain-Based Tactics**: 5 different battlefield types with unique advantages
- **House Specializations**: Each Great House has authentic military strengths
- **Realistic Casualty System**: Based on historical medieval warfare
- **Narrative Generation**: Rich storytelling with battle chronicles

### 📊 Military Analytics Dashboard
- **Force Composition Analysis**: Visual breakdowns of army structures
- **Statistical Comparisons**: Side-by-side house military assessments
- **Quality Metrics**: Discipline, morale, and equipment ratings
- **Strategic Profiles**: Detailed tactical doctrine analysis

### 🗺️ Interactive Westeros Map
- **Clickable Locations**: Explore castles and major cities
- **House Information**: Detailed profiles for each location
- **Population Data**: Realistic demographic information
- **Defense Analysis**: Strategic importance of locations

### 👑 Character & Economy Systems
- **Character Creator**: Design custom nobles with unique traits
- **Tournament System**: Organize jousting and melee competitions
- **Economic Dashboard**: Trade routes and resource management
- **Prophecy System**: Interactive mystical elements

## 🏰 Featured Great Houses

| House | Specialty | Key Strength | Terrain Bonus |
|-------|-----------|--------------|---------------|
| 🐺 **Stark** | Heavy Infantry | Disciplined formations | Forest (+20%) |
| 🦁 **Lannister** | Professional Army | Superior equipment | Plains (+15%) |
| 🌹 **Tyrell** | Heavy Cavalry | Devastating charges | Plains (+25%) |
| 🦌 **Baratheon** | Storm Knights | Battle fury | Plains (+20%) |
| ☀️ **Martell** | Guerrilla Warfare | Desert tactics | Desert (+40%) |
| 🦅 **Arryn** | Mountain Defense | Defensive positioning | Mountains (+35%) |

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 16.0.0
npm >= 7.0.0 or yarn >= 1.22.0
```

### Installation & Development

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd game-of-thrones-military-center
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## 🛠️ Technology Stack

### Core Framework
- **React 18** with TypeScript for type-safe development
- **Vite** for lightning-fast builds and HMR
- **React Router** for seamless navigation

### UI & Styling
- **Tailwind CSS** utility-first styling
- **shadcn/ui** high-quality component library
- **Lucide React** beautiful SVG icons
- **Custom animations** with CSS transitions

### Data & State Management
- **TanStack Query** for server state management
- **React Hooks** for local state
- **Zod** for runtime type validation

### Visualization
- **Recharts** responsive data visualization
- **Custom charts** for military analytics
- **Interactive maps** with SVG overlays

## 📁 Project Architecture

```
src/
├── components/              # Reusable UI components
│   ├── ui/                 # shadcn/ui component library
│   ├── Navigation.tsx      # Main navigation
│   ├── HeroSection.tsx     # Landing page hero
│   └── ...
├── pages/                  # Application pages
│   ├── Index.tsx          # Homepage
│   ├── BattleSimulator.tsx # Battle interface
│   ├── Houses.tsx         # House profiles
│   ├── InteractiveMap.tsx # Map interface
│   └── ...
├── utils/                  # Core logic and utilities
│   ├── types/             # TypeScript definitions
│   ├── constants/         # Game configuration
│   ├── battle/            # Battle simulation modules
│   └── battleLogic.ts     # Main battle engine
└── lib/                   # Configuration utilities
```

### Battle System Architecture

```
utils/battle/
├── types/
│   └── battle.ts          # Core type definitions
├── constants/
│   └── battleConstants.ts # Game balance constants
├── battle/
│   ├── modifierCalculator.ts    # Tactical bonuses
│   ├── strengthCalculator.ts    # Army strength
│   ├── casualtyCalculator.ts    # Damage calculations
│   └── narrativeGenerator.ts    # Story generation
└── battleLogic.ts         # Main orchestrator
```

## 🎮 Usage Guide

### Battle Simulation
1. Navigate to **Battle Simulator**
2. Select terrain type (plains, mountains, forest, etc.)
3. Configure armies with unit compositions
4. Deploy armies on the battlefield by clicking
5. Click **"Begin Battle"** to start simulation
6. View detailed results with narrative analysis

### House Comparison
1. Go to **Military Analytics**
2. Select two houses from dropdowns
3. Compare statistics and specializations
4. Analyze terrain advantages and weaknesses

### Interactive Features
- **Map Exploration**: Click locations for detailed information
- **Character Creation**: Design custom nobles with traits
- **Tournament System**: Host competitive events
- **Economic Management**: Trade and resource systems

## ⚔️ Battle Mechanics Deep Dive

### Combat Phases
1. **Archery Phase**: Ranged combat determines initial advantages
2. **Cavalry Charge**: Mounted units impact enemy formations  
3. **Infantry Melee**: Close combat decides final outcome

### Modifier System
- **Terrain Bonuses**: Each house excels in specific environments
- **Commander Effects**: Leadership quality affects army performance
- **Morale Impact**: Troop spirit influences combat effectiveness
- **Equipment Quality**: Superior gear provides tactical advantages

### Casualty Calculation
```typescript
// Winner casualties: 15-25% of forces
// Loser casualties: 35-55% of forces
// Modified by relative strength differences
```

## 🔧 Configuration & Customization

### Adding New Houses
```typescript
// In src/utils/constants/battleConstants.ts
'House NewHouse': {
  specialty: 'Unique Military Focus',
  discipline: 0.85,
  morale: 0.90,
  equipment: 0.80,
  terrainBonuses: { plains: 0.15, forest: 0.10 },
  commanderBonus: 0.12,
  description: 'Detailed military doctrine description'
}
```

### Custom Terrain Types
```typescript
// Extend TerrainType in src/utils/types/battle.ts
export type TerrainType = 'plains' | 'mountains' | 'forest' | 'desert' | 'riverlands' | 'swamp';
```

### Battle Balance Tuning
```typescript
// Adjust in src/utils/constants/battleConstants.ts
export const BASE_CASUALTY_RATE = {
  WINNER: { MIN: 0.10, MAX: 0.20 },  // Reduce winner casualties
  LOSER: { MIN: 0.40, MAX: 0.60 }    // Increase loser casualties
};
```

## 📊 Performance Features

- **Code Splitting**: Lazy-loaded routes reduce initial bundle size
- **Tree Shaking**: Only imported icons/components included
- **Memoization**: React.memo prevents unnecessary re-renders
- **Optimized Builds**: Vite's efficient bundling and minification

### Bundle Analysis
```bash
npm run build
npm run analyze  # View bundle composition
```

## 🧪 Testing Strategy

### Unit Tests
```bash
npm run test
```

### Type Checking
```bash
npm run type-check
```

### Linting & Formatting
```bash
npm run lint
npm run format
```

## 🚀 Deployment Options

### Lovable Hosting (Recommended)
1. Click **Publish** in Lovable editor
2. Automatic deployment to `yourapp.lovable.app`
3. Optional custom domain configuration

### External Hosting
```bash
npm run build
# Deploy dist/ folder to:
# - Vercel
# - Netlify
# - GitHub Pages
# - Any static hosting service
```

### Environment Variables
```bash
# .env.local
VITE_API_URL=https://api.example.com
VITE_APP_TITLE="Custom Title"
```

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Development Workflow
1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Enforced code quality rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Structured commit messages

## 📚 API Reference

### Core Functions

#### `simulateDetailedBattle(armies, terrain)`
```typescript
const result = simulateDetailedBattle([starkArmy, lannisterArmy], 'plains');
// Returns: DetailedBattleResult with winner, casualties, narrative
```

#### `calculateBattleModifiers(army, terrain, enemyArmy)`
```typescript
const modifiers = calculateBattleModifiers(army, 'forest', enemyArmy);
// Returns: BattleModifiers with all tactical bonuses
```

See [API.md](API.md) for complete documentation.

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**
```bash
# Check for type mismatches
npm run type-check
```

**Performance Issues**
- Check React DevTools Profiler
- Verify proper memoization usage
- Monitor bundle size with `npm run analyze`

## 📈 Roadmap

### Version 2.0 (Planned)
- [ ] **Siege Warfare**: Castle assault mechanics
- [ ] **Naval Combat**: Ship-based battles
- [ ] **Campaign Mode**: Multi-battle wars
- [ ] **Multiplayer**: Real-time battle coordination
- [ ] **AI Opponents**: Strategic computer adversaries

### Version 2.1 (Future)
- [ ] **Unit Veterancy**: Experience-based improvements
- [ ] **Weather Effects**: Environmental modifiers
- [ ] **Diplomatic System**: Alliance mechanics
- [ ] **Custom Maps**: User-generated battlefields

## 📄 License

Built with [Lovable](https://lovable.dev) - Educational and entertainment use.

## 🙏 Acknowledgments

- **George R.R. Martin** - Creator of the A Song of Ice and Fire series
- **HBO** - Game of Thrones television adaptation
- **Lovable Team** - Excellent development platform
- **Open Source Community** - Amazing tools and libraries used

---

### 🎯 Links

- **[Live Demo](https://your-app.lovable.app)** - Experience the application
- **[API Documentation](API.md)** - Complete technical reference
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Lovable Platform](https://lovable.dev)** - Build your own apps

*"The night is dark and full of terrors, but your armies are ready."*

**⚔️ For the Realm! ⚔️**

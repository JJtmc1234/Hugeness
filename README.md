# Hugeness

A Vue.js incremental game about huge numbers (like Rayo's huge and beyond)

## Overview

Hugeness is an incremental/idle game built with Vue.js that explores the concept of extremely large numbers. The game features a custom number library capable of handling numbers up to Decker (10^^10 = 10^(10^(10^(10^(10^(10^(10^(10^(10^10))))))))), providing a foundation for exploring numbers at the scale of Rayo's number and beyond.

## Features

### HugeNumber Library

The custom `HugeNumber` library supports:
- **Regular numbers**: 0 to 999
- **Scientific notation**: e.g., 1.00e6 (one million)
- **Suffix notation**: K, M, B, T, Qa, Qi, Sx, Sp, Oc, No, Dc
- **Tower notation**: 10^^n for power towers
- **Arithmetic operations**: Addition, multiplication, exponentiation
- **Comparison operations**: Less than, greater than, equality

#### Number Representation

Numbers are represented using three components:
- `mantissa`: The coefficient (1.0 to 10.0)
- `exponent`: The power of 10
- `tower`: The height of the power tower

Examples:
- 1,000,000 = 1.00e6
- Googol (10^100) = 1.00e100
- Googolplex (10^10^100) = 10^^1
- Decker (10^^10) = Maximum supported number

### Game Interface

The game features an **Antimatter Dimensions-inspired** interface with:
- **Tab Navigation**: Switch between Main, Options, and Statistics tabs
- **Dark Theme**: Clean, modern UI with orange/pink/blue color scheme
- **Interactive Buttons**: Generate and multiply numbers
- **Real-time Updates**: Watch numbers grow from small to impossibly huge

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The development server will start on `http://localhost:5173/`

## Project Structure

```
Hugeness/
├── src/
│   ├── lib/
│   │   └── HugeNumber.js      # Huge number library
│   ├── components/
│   │   ├── TabButtons.vue     # Tab navigation component
│   │   ├── MainTab.vue        # Main game tab
│   │   ├── OptionsTab.vue     # Options/settings tab
│   │   └── StatisticsTab.vue  # Statistics tab
│   ├── App.vue                # Main application component
│   └── main.js                # Application entry point
├── index.html                 # HTML template
├── vite.config.js            # Vite configuration
└── package.json              # Project dependencies
```

## HugeNumber API

### Creating Numbers

```javascript
import { HugeNumber } from './src/lib/HugeNumber.js';

// From regular number
const million = HugeNumber.fromNumber(1000000);

// From components
const googol = new HugeNumber(1, 100, 0);

// From string
const number = HugeNumber.fromString("1.5e10");
```

### Operations

```javascript
const a = new HugeNumber(5, 0, 0);  // 5
const b = new HugeNumber(3, 0, 0);  // 3

const sum = a.add(b);         // 8
const product = a.multiply(b); // 15
const power = a.pow(2);        // 25

// Comparisons
a.lt(b);  // false
a.gt(b);  // true
a.eq(b);  // false
```

### Formatting

```javascript
const num = new HugeNumber(1, 6, 0);

num.toString();  // "1.00e6"
num.format();    // "1.00M"
num.toNumber();  // 1000000
```

## Technology Stack

- **Vue.js 3.4.0**: Progressive JavaScript framework
- **Vite 5.0.0**: Next-generation frontend tooling
- **JavaScript (ES6+)**: Modern JavaScript features

## Roadmap

Future enhancements planned:
- [ ] Save/load game state
- [ ] Upgrades and prestige mechanics
- [ ] More game tabs (Achievements, Challenges)
- [ ] Automation features
- [ ] Extended number support beyond Decker
- [ ] Sound effects and animations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by [Antimatter Dimensions](https://ivark.github.io/)
- Number theory concepts from mathematics and computer science
- Community feedback and contributions

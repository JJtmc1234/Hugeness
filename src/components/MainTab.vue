<template>
  <div class="main-tab">
    <h2>Main</h2>
    
    <div class="resource-display">
      <div class="resource">
        <span class="resource-label">Numbers:</span>
        <span class="resource-value">{{ numbers.format() }}</span>
      </div>
    </div>

    <div class="actions">
      <button class="game-button" @click="generateNumber">
        Generate Number
      </button>
      <button class="game-button" @click="multiplyNumbers">
        Multiply by 10
      </button>
    </div>

    <div class="info">
      <p>Click to generate and multiply numbers!</p>
      <p>Watch as they grow from small to impossibly huge.</p>
    </div>
  </div>
</template>

<script>
import HugeNumber from '../lib/HugeNumber.js';

export default {
  name: 'MainTab',
  data() {
    return {
      numbers: new HugeNumber(0, 0, 0)
    }
  },
  methods: {
    generateNumber() {
      const gain = new HugeNumber(1, 0, 0);
      this.numbers = this.numbers.add(gain);
    },
    multiplyNumbers() {
      const multiplier = new HugeNumber(1, 1, 0); // 10
      this.numbers = this.numbers.multiply(multiplier);
    }
  }
}
</script>

<style scoped>
.main-tab {
  padding: 20px;
}

h2 {
  color: #ffa500;
  margin-bottom: 30px;
  font-size: 32px;
  text-align: center;
}

.resource-display {
  background: #16213e;
  border: 2px solid #0f3460;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.resource {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  margin: 10px 0;
}

.resource-label {
  color: #e94560;
  font-weight: bold;
}

.resource-value {
  color: #ffa500;
  font-family: monospace;
  font-size: 28px;
}

.actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.game-button {
  flex: 1;
  min-width: 200px;
  padding: 15px 30px;
  background: linear-gradient(135deg, #e94560 0%, #0f3460 100%);
  color: white;
  border: 2px solid #e94560;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.game-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(233, 69, 96, 0.4);
  border-color: #ffa500;
}

.game-button:active {
  transform: translateY(0);
}

.info {
  background: #1a1a2e;
  border-left: 4px solid #e94560;
  padding: 15px;
  border-radius: 4px;
}

.info p {
  color: #c5c6c7;
  margin: 5px 0;
}
</style>

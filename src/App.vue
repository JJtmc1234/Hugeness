<script setup>
import { ref, computed } from 'vue'
import TabBar from './components/TabBar.vue'

// Main tabs configuration
const mainTabs = [
  { id: 'numbers', label: 'Numbers' },
  { id: 'upgrades', label: 'Upgrades' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'automation', label: 'Automation' },
  { id: 'statistics', label: 'Statistics' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'options', label: 'Options' }
]

// Sub-tabs configuration for each main tab
const subTabs = {
  numbers: [
    { id: 'ordinals', label: 'Ordinals' },
    { id: 'cardinals', label: 'Cardinals' },
    { id: 'functions', label: 'Functions' }
  ],
  upgrades: [
    { id: 'normal', label: 'Normal' },
    { id: 'break', label: 'Break' }
  ],
  challenges: [
    { id: 'normal', label: 'Normal' },
    { id: 'infinity', label: 'Infinity' }
  ],
  automation: [
    { id: 'autobuyers', label: 'Autobuyers' },
    { id: 'automator', label: 'Automator' }
  ],
  statistics: [
    { id: 'general', label: 'General' },
    { id: 'multipliers', label: 'Multipliers' }
  ]
}

// Current tab state
const currentMainTab = ref('numbers')
const currentSubTabs = ref({
  numbers: 'ordinals',
  upgrades: 'normal',
  challenges: 'normal',
  automation: 'autobuyers',
  statistics: 'general'
})

// Get current sub-tabs for active main tab
const currentSubTabList = computed(() => {
  return subTabs[currentMainTab.value] || null
})

// Get current sub-tab value
const currentSubTab = computed({
  get: () => currentSubTabs.value[currentMainTab.value],
  set: (value) => {
    currentSubTabs.value[currentMainTab.value] = value
  }
})
</script>

<template>
  <div class="game-container">
    <!-- Header -->
    <header class="game-header">
      <h1 class="game-title">Hugeness</h1>
      <div class="resource-display">
        <span class="resource-label">Hugeness:</span>
        <span class="resource-value">1.00e0</span>
      </div>
    </header>

    <!-- Main Tab Bar -->
    <TabBar
      :tabs="mainTabs"
      v-model="currentMainTab"
    />

    <!-- Sub Tab Bar (if current tab has sub-tabs) -->
    <TabBar
      v-if="currentSubTabList"
      :tabs="currentSubTabList"
      v-model="currentSubTab"
      subtab
    />

    <!-- Content Area -->
    <main class="tab-content">
      <!-- Numbers Tab -->
      <template v-if="currentMainTab === 'numbers'">
        <div v-if="currentSubTab === 'ordinals'" class="content-panel">
          <h2>Ordinals</h2>
          <p>Produce bigger ordinal numbers to increase your Hugeness.</p>
        </div>
        <div v-else-if="currentSubTab === 'cardinals'" class="content-panel">
          <h2>Cardinals</h2>
          <p>Cardinal numbers determine the size of infinite sets.</p>
        </div>
        <div v-else-if="currentSubTab === 'functions'" class="content-panel">
          <h2>Fast-Growing Functions</h2>
          <p>Harness the power of fast-growing hierarchies.</p>
        </div>
      </template>

      <!-- Upgrades Tab -->
      <template v-else-if="currentMainTab === 'upgrades'">
        <div v-if="currentSubTab === 'normal'" class="content-panel">
          <h2>Normal Upgrades</h2>
          <p>Spend your Hugeness on permanent upgrades.</p>
        </div>
        <div v-else-if="currentSubTab === 'break'" class="content-panel">
          <h2>Break Upgrades</h2>
          <p>Upgrades that break the boundaries of normal numbers.</p>
        </div>
      </template>

      <!-- Challenges Tab -->
      <template v-else-if="currentMainTab === 'challenges'">
        <div v-if="currentSubTab === 'normal'" class="content-panel">
          <h2>Normal Challenges</h2>
          <p>Complete challenges for powerful rewards.</p>
        </div>
        <div v-else-if="currentSubTab === 'infinity'" class="content-panel">
          <h2>Infinity Challenges</h2>
          <p>Face the infinite for even greater rewards.</p>
        </div>
      </template>

      <!-- Automation Tab -->
      <template v-else-if="currentMainTab === 'automation'">
        <div v-if="currentSubTab === 'autobuyers'" class="content-panel">
          <h2>Autobuyers</h2>
          <p>Automate your number production.</p>
        </div>
        <div v-else-if="currentSubTab === 'automator'" class="content-panel">
          <h2>Automator</h2>
          <p>Create complex automation scripts.</p>
        </div>
      </template>

      <!-- Statistics Tab -->
      <template v-else-if="currentMainTab === 'statistics'">
        <div v-if="currentSubTab === 'general'" class="content-panel">
          <h2>General Statistics</h2>
          <p>View your progress and records.</p>
        </div>
        <div v-else-if="currentSubTab === 'multipliers'" class="content-panel">
          <h2>Multiplier Breakdown</h2>
          <p>See what's boosting your production.</p>
        </div>
      </template>

      <!-- Achievements Tab (no sub-tabs) -->
      <template v-else-if="currentMainTab === 'achievements'">
        <div class="content-panel">
          <h2>Achievements</h2>
          <p>Unlock achievements for bonuses and bragging rights.</p>
        </div>
      </template>

      <!-- Options Tab (no sub-tabs) -->
      <template v-else-if="currentMainTab === 'options'">
        <div class="content-panel">
          <h2>Options</h2>
          <p>Configure your game settings.</p>
        </div>
      </template>
    </main>
  </div>
</template>

<style scoped>
.game-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.game-header {
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  padding: 20px;
  text-align: center;
  border-bottom: 2px solid #4fc3f7;
}

.game-title {
  margin: 0 0 10px 0;
  font-size: 2.5em;
  background: linear-gradient(135deg, #4fc3f7, #81c784);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(79, 195, 247, 0.3);
}

.resource-display {
  font-size: 1.5em;
}

.resource-label {
  color: #888;
  margin-right: 10px;
}

.resource-value {
  color: #4fc3f7;
  font-family: 'Courier New', monospace;
  font-weight: bold;
}

.tab-content {
  flex: 1;
  padding: 20px;
  background: #1a1a1a;
}

.content-panel {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 30px;
  max-width: 900px;
  margin: 0 auto;
}

.content-panel h2 {
  margin-top: 0;
  color: #4fc3f7;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
}

.content-panel p {
  color: #888;
  font-size: 1.1em;
}
</style>

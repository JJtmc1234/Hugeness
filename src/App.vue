<template>
  <div id="app">
    <header>
      <h1>Hugeness</h1>
      <p class="subtitle">An incremental game about huge numbers</p>
    </header>

    <TabButtons 
      :tabs="tabs" 
      :currentTab="currentTab" 
      @change-tab="changeTab"
    />

    <main class="content">
      <component :is="currentTabComponent" />
    </main>

    <footer>
      <p>Numbers up to Decker (10^^10) and beyond</p>
    </footer>
  </div>
</template>

<script>
import TabButtons from './components/TabButtons.vue';
import MainTab from './components/MainTab.vue';
import OptionsTab from './components/OptionsTab.vue';
import StatisticsTab from './components/StatisticsTab.vue';

export default {
  name: 'App',
  components: {
    TabButtons,
    MainTab,
    OptionsTab,
    StatisticsTab
  },
  data() {
    return {
      currentTab: 'main',
      tabs: [
        { id: 'main', name: 'Main' },
        { id: 'options', name: 'Options' },
        { id: 'statistics', name: 'Statistics' }
      ]
    }
  },
  computed: {
    currentTabComponent() {
      const tabMap = {
        'main': 'MainTab',
        'options': 'OptionsTab',
        'statistics': 'StatisticsTab'
      };
      return tabMap[this.currentTab] || 'MainTab';
    }
  },
  methods: {
    changeTab(tabId) {
      this.currentTab = tabId;
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #0a0a0a;
  color: #c5c6c7;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  background: #16213e;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
}

header {
  background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%);
  padding: 30px;
  text-align: center;
  border-bottom: 3px solid #e94560;
}

header h1 {
  font-size: 48px;
  color: #ffa500;
  text-shadow: 0 0 20px rgba(255, 165, 0, 0.5);
  margin-bottom: 10px;
}

.subtitle {
  color: #e94560;
  font-size: 18px;
  font-weight: 300;
}

.content {
  flex: 1;
  background: #1a1a2e;
  min-height: 500px;
}

footer {
  background: #0f3460;
  padding: 20px;
  text-align: center;
  color: #c5c6c7;
  border-top: 2px solid #e94560;
}

footer p {
  font-size: 14px;
}
</style>

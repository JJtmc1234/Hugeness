<template>
  <div class="statistics-tab">
    <h2>Statistics</h2>
    
    <div class="stat-group">
      <h3>Game Statistics</h3>
      <div class="stat">
        <span class="stat-label">Play Time:</span>
        <span class="stat-value">{{ playTime }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Total Clicks:</span>
        <span class="stat-value">{{ totalClicks }}</span>
      </div>
    </div>

    <div class="stat-group">
      <h3>Number Theory</h3>
      <div class="info-box">
        <p><strong>What is Decker?</strong></p>
        <p>Decker is 10^^10, which means:</p>
        <p>10^(10^(10^(10^(10^(10^(10^(10^(10^10))))))))</p>
        <p>An impossibly huge number with a power tower of height 10.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticsTab',
  data() {
    return {
      totalClicks: 0,
      startTime: Date.now(),
      currentTime: Date.now(),
      intervalId: null
    }
  },
  computed: {
    playTime() {
      const seconds = Math.floor((this.currentTime - this.startTime) / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      
      if (hours > 0) {
        return `${hours}h ${minutes % 60}m`;
      }
      if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
      }
      return `${seconds}s`;
    }
  },
  mounted() {
    // Update play time every second
    this.intervalId = setInterval(() => {
      this.currentTime = Date.now();
    }, 1000);
  },
  beforeUnmount() {
    // Clean up interval to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
</script>

<style scoped>
.statistics-tab {
  padding: 20px;
}

h2 {
  color: #ffa500;
  margin-bottom: 30px;
  font-size: 32px;
  text-align: center;
}

.stat-group {
  background: #16213e;
  border: 2px solid #0f3460;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

h3 {
  color: #e94560;
  margin-bottom: 15px;
  font-size: 20px;
  border-bottom: 1px solid #0f3460;
  padding-bottom: 10px;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  padding: 10px;
  background: #1a1a2e;
  border-radius: 4px;
}

.stat-label {
  color: #e94560;
  font-weight: bold;
  font-size: 16px;
}

.stat-value {
  color: #ffa500;
  font-family: monospace;
  font-size: 18px;
}

.info-box {
  background: #1a1a2e;
  border-left: 4px solid #e94560;
  padding: 15px;
  border-radius: 4px;
}

.info-box p {
  color: #c5c6c7;
  margin: 8px 0;
  line-height: 1.6;
}

.info-box strong {
  color: #ffa500;
}
</style>

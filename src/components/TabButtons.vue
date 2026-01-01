<template>
  <div class="tab-buttons">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      :class="['tab-button', { active: currentTab === tab.id }]"
      @click="$emit('change-tab', tab.id)"
    >
      {{ tab.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'TabButtons',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    currentTab: {
      type: String,
      required: true
    }
  },
  emits: ['change-tab']
}
</script>

<style scoped>
.tab-buttons {
  display: flex;
  gap: 0;
  background: #1a1a2e;
  border-bottom: 2px solid #0f3460;
  padding: 0;
}

.tab-button {
  flex: 1;
  padding: 15px 20px;
  background: #16213e;
  color: #e94560;
  border: none;
  border-right: 1px solid #0f3460;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tab-button:last-child {
  border-right: none;
}

.tab-button:hover {
  background: #1a1a2e;
  color: #ff6b9d;
}

.tab-button.active {
  background: #0f3460;
  color: #ffa500;
  border-bottom: 3px solid #ffa500;
}
</style>

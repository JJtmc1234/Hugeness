<script setup>
defineProps({
  active: Boolean,
  subtab: Boolean
})
</script>

<template>
  <button
    class="tab-button"
    :class="{ active, subtab }"
  >
    <slot />
  </button>
</template>

<style scoped>
.tab-button {
  background: transparent;
  border: 1px solid #333;
  color: #888;
  padding: 8px 16px;
  margin: 0 2px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tab-button:hover {
  color: #fff;
  border-color: #666;
  background: rgba(255, 255, 255, 0.05);
}

.tab-button.active {
  color: #4fc3f7;
  border-color: #4fc3f7;
  background: rgba(79, 195, 247, 0.1);
}

.tab-button.subtab {
  font-size: 12px;
  padding: 6px 12px;
  border-color: #2a2a2a;
}

.tab-button.subtab.active {
  color: #81c784;
  border-color: #81c784;
  background: rgba(129, 199, 132, 0.1);
}
</style>

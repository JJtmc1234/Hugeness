<script setup>
import TabButton from './TabButton.vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  subtab: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function selectTab(tabId) {
  emit('update:modelValue', tabId)
}
</script>

<template>
  <div class="tab-bar" :class="{ 'sub-tab-bar': subtab }">
    <TabButton
      v-for="tab in tabs"
      :key="tab.id"
      :active="modelValue === tab.id"
      :subtab="subtab"
      @click="selectTab(tab.id)"
    >
      {{ tab.label }}
    </TabButton>
  </div>
</template>

<style scoped>
.tab-bar {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  border-bottom: 1px solid #333;
  background: rgba(0, 0, 0, 0.3);
}

.sub-tab-bar {
  background: rgba(0, 0, 0, 0.15);
  border-bottom-color: #222;
  padding: 6px 0;
}
</style>

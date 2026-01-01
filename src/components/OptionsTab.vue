<template>
  <div class="options-tab">
    <h2>Options</h2>
    
    <div class="option-group">
      <h3>Display Settings</h3>
      <div class="option">
        <label>
          <input type="checkbox" v-model="options.showScientific" />
          Show Scientific Notation
        </label>
      </div>
      <div class="option">
        <label>
          <input type="checkbox" v-model="options.autoSave" />
          Auto Save
        </label>
      </div>
    </div>

    <div class="option-group">
      <h3>About</h3>
      <p>Hugeness - An incremental game about huge numbers</p>
      <p>Built with Vue.js and custom HugeNumber library</p>
      <p>Supports numbers up to Decker (10^^10)</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OptionsTab',
  data() {
    return {
      options: {
        showScientific: true,
        autoSave: true
      }
    }
  }
}
</script>

<style scoped>
.options-tab {
  padding: 20px;
}

h2 {
  color: #ffa500;
  margin-bottom: 30px;
  font-size: 32px;
  text-align: center;
}

.option-group {
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

.option {
  margin: 15px 0;
}

.option label {
  display: flex;
  align-items: center;
  color: #c5c6c7;
  font-size: 16px;
  cursor: pointer;
}

.option input[type="checkbox"] {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.option-group p {
  color: #c5c6c7;
  margin: 10px 0;
  line-height: 1.6;
}
</style>

<template>
  <div class="title">
    <div class="icon-container">
      <v-icon size="x-large" theme="dark" icon="mdi-rocket" />
    </div>
    <div class="text-container">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      default: "Title",
    },
  },
  setup() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon-container {
  border-top-left-radius: 34px;
  color: white;
  background: #002992;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 84px;
}

.title {
  display: flex;
}

.text-container {
  border-bottom: 5px solid #002992;
  background-color: rgba(255, 255, 255, 0.3);
  border-top-right-radius: 34px;
  display: flex;
  align-items: center;
  font-size: 24px;
  padding: 0px 36px;
  height: 84px;
  width: 100%;
}
</style>

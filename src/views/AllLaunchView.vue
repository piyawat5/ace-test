<template>
  <div>
    <LaunchesTableComponent :status="status"></LaunchesTableComponent>
  </div>
</template>

<script lang="ts">
import LaunchesTableComponent from "@/components/LaunchesTableComponent.vue";
import { statusEnum } from "@/components/type";
import { ref } from "vue";

export default {
  name: "HomeView",
  components: {
    LaunchesTableComponent,
  },
  setup() {
    const status = ref(statusEnum.ALL);
    return {
      status,
    };
  },
};
</script>

<style scoped>
.table {
  border-radius: 8px;
}
.text-link {
  cursor: pointer;
  text-decoration: underline;
  color: #002992;
}
</style>

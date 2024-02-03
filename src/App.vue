<template>
  <div>
    <div style="margin-bottom: 24px">
      <title-component
        style="margin-bottom: 10px"
        text="ตารางการปล่อยจรวด"
      ></title-component>
      <nav-component></nav-component>
    </div>

    <router-view />
  </div>
</template>

<script lang="ts">
import TitleComponent from "@/components/TitleComponent.vue";
import NavComponent from "@/components/NavComponent.vue";

export default {
  name: "HomeView",
  components: {
    TitleComponent,
    NavComponent,
  },
};
</script>

<style>
#app {
  padding: 50px 267px;
  height: 100%;
  min-height: 100vh; /* Set minimum height to the viewport height */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url("./assets/background.png");
  background-repeat: no-repeat;
  background-size: cover; /* or contain, based on your preference */
  background-position: center;
}
@media (max-width: 1275px) {
  #app {
    padding: 25px 50px;
  }
}

@media (max-width: 454px) {
  #app {
    padding: 25px 4px;
  }
}
</style>

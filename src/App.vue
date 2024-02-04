<template>
  <div>
    <div style="margin-bottom: 24px">
      <title-component
        style="margin-bottom: 10px"
        text="ตารางการปล่อยจรวด"
      ></title-component>
      <nav-component></nav-component>
    </div>

    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import TitleComponent from "@/components/TitleComponent.vue";
import NavComponent from "@/components/navComponent.vue";

export default {
  name: "HomeView",
  components: {
    TitleComponent,
    NavComponent,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;600&display=swap");

#app {
  padding: 50px 267px;
  height: 100%;
  min-height: 100vh; /* Set minimum height to the viewport height */
  font-family: "IBM Plex Sans Thai", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url("./assets/background.png");
  background-repeat: no-repeat;
  background-size: cover; /* or contain, based on your preference */
  background-position: center;
}

/* route transitions */
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.3s ease-in;
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

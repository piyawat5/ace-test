<template>
  <div>
    <nav>
      <router-link to="/">ทั้งหมด</router-link>
      <router-link to="/unlaunched">ที่กำลังจะถึง</router-link>
      <router-link to="/launched">ในอดีต</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  padding: 0px 45px;
  display: flex;
  align-items: center;
  height: 35px;
  gap: 24px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  background-color: rgba(255, 255, 255, 0.3);
}

nav a {
  color: black;
  text-decoration: none;
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

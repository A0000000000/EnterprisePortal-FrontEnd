<template>
  <div id="app">
    <div id="menu">
      <Menu></Menu>
    </div>
    <div id="page">
      <router-view />
    </div>
  </div>
</template>

<script>
import Menu from "./components/Menu";

export default {
  components: {
    Menu,
  },
  mounted() {
    this.$router.push("/");
  },
};
</script>

<style scoped>
#app {
  text-align: center;
  width: 100%;
  height: 100vh;
}
#menu {
  height: 20%;
}
#page {
  height: 80%;
}
</style>

<template>
  <div id="app">
    <div id="main">
      <router-view />
    </div>
    <div id="dock">
      <Dock></Dock>
    </div>
  </div>
</template>

<style>
#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
#dock {
  position: fixed;
  bottom: 0;
  width: 100%;
}
#main {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
</style>

<script>
import Dock from "./components/Dock";
export default {
  components: {
    Dock,
  },
};
</script>
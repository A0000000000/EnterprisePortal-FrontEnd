<template>
  <div id="app">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello World",
    };
  },
};
</script>

<style scoped>
#app {
  text-align: center;
  width: 100%;
  font-size: 20px;
}
</style>

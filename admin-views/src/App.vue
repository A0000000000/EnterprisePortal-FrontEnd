<template>
  <div id="app">
    <div id="title">
      <h1>后台管理页面</h1>
    </div>
    <router-view />
  </div>
</template>

<style>
body {
  background-color: gray;
}
#app {
  height: 100vh;
  background-color: gray;
}
img {
  max-width: 100%;
}
#title {
  text-align: center;
  width: 100%;
}
</style>

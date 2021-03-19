<template>
  <div id="main">
    <div id="app">
      <div id="menu">
        <Menu></Menu>
      </div>
      <div id="page">
        <router-view />
      </div>
      <div id="footer">
        <Footer></Footer>
      </div>
    </div>
    <div id="tools">
      <div class="item">
        <a href="#">
          <img src="./assets/images/tools/person.png" alt="个人中心" srcset />
          <p>个人中心</p>
        </a>
      </div>
      <div class="item">
        <a href="#">
          <img src="./assets/images/tools/cart.png" alt="购物车" srcset />
          <p>购物车</p>
        </a>
      </div>
      <div class="item">
        <a href="#">
          <img src="./assets/images/tools/service.png" alt="人工客服" srcset />
          <p>人工客服</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "./components/Menu";
import Footer from "./components/Footer";

export default {
  components: {
    Menu,
    Footer,
  },
  data() {
    return {};
  },
  mounted() {
    this.$router.push("/");
  },
};
</script>

<style scoped>
#main {
  height: 100vh;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#page {
  flex: auto;
}

#tools {
  bottom: 150px;
  right: 50px;
  position: absolute;
}

.item {
  text-align: center;
}

.item > a {
  color: white;
  display: block;
  padding: 5px;
}

.item > a:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
}
</style>

<template>
  <div>
    <a-menu
      class="menu"
      theme="dark"
      mode="horizontal"
      :defaultSelectedKeys="selectKey"
      @click="handleClick"
    >
      <a-menu-item key="index">首页</a-menu-item>
      <a-menu-item key="product">产品</a-menu-item>
      <a-menu-item key="bulletin">公告</a-menu-item>
      <a-menu-item key="about">关于我们</a-menu-item>
    </a-menu>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}
.menu {
  line-height: 75px;
  font-size: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      selectKey: ["index"],
    };
  },
  methods: {
    handleClick(params) {
      this.$router.push(params.key);
    },
  },
};
</script>

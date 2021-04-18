<template>
  <div id="main">
    <div v-if="flag">
      <div v-if="login">
        <p>登录</p>
        <input type="text" placeholder="请输入用户名" />
        <br />
        <input type="password" placeholder="请输入密码" />
        <br />
        <button>登录</button>
      </div>
      <div v-if="!login">
        <p>注册</p>
        
      </div>
    </div>
    <div v-if="!flag">BBBBBBB</div>
  </div>
</template>
<style scoped>
#main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 700px;
}
</style>
<script>
export default {
  mounted() {
    if (this.$store.getters.getToken) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  },
  data() {
    return {
      flag: true,
      login: true
    };
  },
};
</script>
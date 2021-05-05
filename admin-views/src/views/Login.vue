<template>
  <div id="main">
    <div id="content">
      <div class="form-item">
        <a-input placeholder="请输入用户名" v-model="username" />
      </div>
      <div class="form-item">
        <a-input-password placeholder="请输入密码" v-model="password" :visibilityToggle="false" />
      </div>
      <div class="form-item">
        <a-button type="primary" @click="login">登录</a-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
#main {
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#content {
  text-align: center;
}
.form-item {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        alert("用户名或密码不能为空.");
        return;
      }
      this.axios
        .post("user-function-provider", "/api/user/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            if (
              data.data.role !== "ROLE_ADMIN" &&
              data.data.role !== "ROLE_MANAGER"
            ) {
              alert("权限不足, 登录失败.");
              return;
            } else {
              this.$store.commit("setToken", {
                token: data.data.token,
                role: data.data.role,
              });
              if (data.data.role === "ROLE_ADMIN") {
                this.$router.push("/admin");
              } else {
                this.$router.push("/manager");
              }
            }
          } else {
            alert(data.message);
          }
        });
    },
  },
};
</script>
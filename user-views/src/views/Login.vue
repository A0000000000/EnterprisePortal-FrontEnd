<template>
  <div id="main">
    <div>
      <a @click="changePage(true)">登录</a>
      <a @click="changePage(false)">注册</a>
    </div>
    <div v-if="isLogin">
      <input type="text" class="input" v-model="loginUsername" placeholder="请输入用户名" />
      <br />
      <input type="password" class="input" v-model="loginPassword" placeholder="请输入密码" />
      <br />
      <button class="btn" @click="login">登录</button>
    </div>
    <div v-if="!isLogin">
      <input type="text" class="input" v-model="username" placeholder="用户名" />
      <br />
      <input type="email" class="input" v-model="email" placeholder="邮箱" />
      <br />
      <input type="password" class="input" v-model="password" placeholder="密码" />
      <br />
      <input type="radio" id="user" name="role" value="User" v-model="role" />
      <label for="user">普通用户</label>
      <input type="radio" id="ent" name="role" value="Enterprise" v-model="role" />
      <label for="ent">小米之家</label>
      <br />
      <div v-if="role === 'Enterprise'">
        <label for="file">验证材料</label>
        <input type="file" id="file" class="input" @change="uploadFile" />
        <br />
      </div>
      <button class="btn" @click="register">注册</button>
    </div>
  </div>
</template>
<style scoped>
#main {
  width: 100%;
  text-align: center;
}
</style>
<script>
export default {
  data() {
    return {
      isLogin: true,
      loginUsername: "",
      loginPassword: "",
      username: "",
      password: "",
      email: "",
      role: "User",
      file: null,
    };
  },
  methods: {
    changePage(param) {
      this.isLogin = param;
      return false;
    },
    login() {
      let params = {
        username: this.loginUsername,
        password: this.loginPassword,
      };
      this.axios
        .post("user-function-provider", "/api/user/login", params)
        .then((res) => {
          let data = res.data;
          if (data.code !== 200) {
            alert(data.message);
          } else {
            this.$store.commit("setToken", data.data);
            this.$router.push("/person");
          }
        });
    },
    register() {
      let form = new FormData();
      form.append("username", this.username);
      form.append("password", this.password);
      form.append("email", this.email);
      form.append("role", this.role);
      if (this.role === "Enterprise") {
        form.append("file", this.file);
      }
      this.axios
        .post("user-function-provider", "/api/user/register", form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          let data = res.data;
          if (data.code !== 200) {
            alert(data.message);
          } else {
            this.isLogin = true;
          }
        });
    },
    uploadFile(e) {
      this.file = e.target.files[0];
    },
  },
};
</script>
<template>
  <div id="main">
    <h1>登录和注册</h1>
    <div class="buttons">
      <button class="btn btn-secondary" @click="changePage(true)" v-if="!isLogin">已有账号? 进行登录</button>
      <button class="btn btn-secondary" @click="changePage(false)" v-if="isLogin">没有账号? 进行注册</button>
    </div>
    <div v-if="isLogin" class="mainContainer">
      <input type="text" class="form-control" v-model="loginUsername" placeholder="请输入用户名" />
      <br />
      <input type="password" class="form-control" v-model="loginPassword" placeholder="请输入密码" />
      <br />
      <button class="btn btn-primary" @click="login">登录</button>
    </div>
    <div v-if="!isLogin" class="mainContainer">
      <input type="text" class="form-control" v-model="username" placeholder="用户名" />
      <br />
      <input type="email" class="form-control" v-model="email" placeholder="邮箱" />
      <br />
      <input type="password" class="form-control" v-model="password" placeholder="密码" />
      <br />
      <div>
        <input type="radio" id="user" name="role" value="User" v-model="role" />
        <label for="user">普通用户</label>
        <input type="radio" id="ent" name="role" value="Enterprise" v-model="role" />
        <label for="ent">小米之家</label>
      </div>
      <br />
      <div v-if="role === 'Enterprise'" class="form-group">
        <label for="file">验证材料</label>
        <input type="file" id="file" class="form-control-file" @change="uploadFile" />
        <br />
      </div>
      <button class="btn btn-primary" @click="register">注册</button>
    </div>
  </div>
</template>
<style scoped>
#main {
  width: 100%;
  text-align: center;
}

.mainContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-control {
  width: 200px;
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
            if (
              data.data.role === "ROLE_ADMIN" ||
              data.data.role === "ROLE_MANAGER"
            ) {
              alert("管理员账户请转到后台管理页面登录.");
              return;
            }
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
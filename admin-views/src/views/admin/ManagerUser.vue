<template>
  <div id="main">
    <h2>
      所有用户
      <a href="#/admin">(首页)</a>
    </h2>
    <div id="content">
      <hr />
      <div class="item" v-for="(item, index) in users" :key="index">
        <div>用户id: {{item.id}}</div>
        <div>用户名: {{item.username}}</div>
        <div>用户邮箱: {{item.email}}</div>
        <div>用户身份: {{item.role === 'ROLE_MANAGER' ? '管理员' : item.role === 'ROLE_ENTERPRISE' ? '小米之家' : '普通用户'}}</div>
        <div>
          找回密码:
          <input type="password" placeholder="请输入新密码" v-model="item.password" />
          <a-button type="primary" @click="submit(item)">修改</a-button>
        </div>
        <hr />
      </div>
      <div class="clear"></div>
      <div id="create">
        <h2>创建新账户</h2>
        <div class="form-item">
          <a-input placeholder="请输入用户名" v-model="username" />
        </div>
        <div class="form-item">
          <a-input-password placeholder="请输入密码" v-model="password" :visibilityToggle="false" />
        </div>
        <div class="form-item">
          <a-input placeholder="请输入邮箱" v-model="email" />
        </div>
        <div class="form-item">
          <input type="radio" name="role" id="manager" @click="setRole('ROLE_MANAGER')" />
          <label for="manager">管理员</label>
          <input type="radio" name="role" id="user" @click="setRole('ROLE_USER')" checked />
          <label for="user">普通用户</label>
          <input type="radio" name="role" id="enterprise" @click="setRole('ROLE_ENTERPRISE')" />
          <label for="enterprise">小米之家</label>
        </div>
        <div class="form-item">
          <a-button type="primary" @click="create">创建</a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#main {
  text-align: center;
}
#create {
  margin-left: 30%;
  margin-right: 30%;
}
.item {
  width: 25%;
  float: left;
}
.clear {
  clear: both;
}
</style>
<script>
export default {
  mounted() {
    const token = this.$store.getters.getToken;
    const role = this.$store.getters.getRole;
    if (!token) {
      this.$router.push("/login");
      return;
    }
    if (role !== "ROLE_ADMIN") {
      this.$router.push("/manager");
      return;
    }
    this.axios
      .get("user-function-provider", "/api/user/getAllUser", {
        headers: {
          token,
        },
      })
      .then((res) => {
        const data = res.data;
        if (data.code === 200) {
          this.users = data.data;
          for (let index in this.users) {
            this.users[index].password = "";
          }
        } else {
          alert(data.message);
        }
      });
  },
  data() {
    return {
      users: [],
      username: "",
      password: "",
      email: "",
      role: "ROLE_USER",
    };
  },
  methods: {
    submit(item) {
      if (!item.password) {
        alert("新密码不能为空.");
        return;
      }
      this.axios
        .put(
          "user-function-provider",
          "/api/user/updateInfo",
          {
            id: item.id,
            password: item.password,
          },
          {
            headers: {
              token: this.$store.getters.getToken,
            },
          }
        )
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            item.password = "";
          }
          alert(data.message);
        });
    },
    setRole(role) {
      this.role = role;
    },
    create() {
      if (!this.username || !this.password || !this.email || !this.role) {
        alert("参数不能为空.");
        return;
      }
      let params = {
        username: this.username,
        password: this.password,
        email: this.email,
        role: this.role,
      };
      this.axios
        .post("user-function-provider", "/api/user/addNewUserByAdmin", params, {
          headers: {
            token: this.$store.getters.getToken,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            alert(data.message);
            this.username = "";
            this.password = "";
            this.email = "";
            this.axios
              .get("user-function-provider", "/api/user/getAllUser", {
                headers: {
                  token: this.$store.getters.getToken,
                },
              })
              .then((res) => {
                const data = res.data;
                if (data.code === 200) {
                  this.users = data.data;
                  for (let index in this.users) {
                    this.users[index].password = "";
                  }
                } else {
                  alert(data.message);
                }
              });
          } else {
            alert(data.message);
          }
        });
    },
  },
};
</script>
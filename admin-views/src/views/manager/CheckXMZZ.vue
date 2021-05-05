<template>
  <div id="main">
    <h2>
      用户列表
      <a href="#/manager">(首页)</a>
    </h2>
    <div id="content">
      <div class="item" v-for="(item, index) in users" :key="index">
        <div>用户id: {{item.id}}</div>
        <div>用户名: {{item.username}}</div>
        <div>认证状态: {{item.accountStatus === 0 ? '未认证' : '已认证'}}</div>
        <div>
          认证文件: {{item.filename ? '' : '无'}}
          <a
            :href="'http://' + realIp + ':3001/api/user/download/' + item.id"
          >{{item.filename}}</a>
        </div>
        <div v-if="item.accountStatus === 0">
          <a-button type="primary" @click="auth(item)">认证</a-button>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#main {
  text-align: center;
}
.item div {
  float: left;
  width: 20%;
}
.clear {
  clear: both;
}
</style>
<script>
export default {
  mounted() {
    this.realIp = this.ip
    const token = this.$store.getters.getToken;
    const role = this.$store.getters.getRole;
    if (!token) {
      this.$router.push("/login");
      return;
    }
    if (role === "ROLE_ADMIN") {
      this.$router.push("/admin");
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
          this.users = data.data.filter(
            (item) => item.role === "ROLE_ENTERPRISE"
          );
        } else {
          alert(data.message);
        }
      });
  },
  data() {
    return {
      users: [],
      realIp: ''
    };
  },
  methods: {
    auth(item) {
      this.axios
        .get("user-function-provider", "/api/user/authXMZZ/" + item.id, {
          headers: {
            token: this.$store.getters.getToken,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            alert("认证成功.");
            item.accountStatus = 1;
          } else {
            alert(data.message);
          }
        });
    },
  },
};
</script>
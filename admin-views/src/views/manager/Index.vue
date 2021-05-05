<template>
  <div id="main">
    <h2>管理员账户</h2>
    <div class="item">用户名: {{username}}</div>
    <div class="item">邮箱: {{email}}</div>
    <div class="item">创建时间: {{getCreateTime}}</div>
    <div id="ops">
      <h3>操作</h3>
      <div>
        <span class="opsItem">
          <a-button type="primary" @click="to('/managerGoods')" ghost>管理商品</a-button>
        </span>
        <span class="opsItem">
          <a-button type="primary" @click="to('/managerMessage')" ghost>管理信息</a-button>
        </span>
        <span class="opsItem">
          <a-button type="primary" @click="to('/managerOrder')" ghost>管理订单</a-button>
        </span>
        <span class="opsItem">
          <a-button type="primary" @click="to('/checkXMZZ')" ghost>审核小米之家用户</a-button>
        </span>
        <span class="opsItem">
          <a-button type="primary" @click="to('/dealFeedback')" ghost>处理反馈信息</a-button>
        </span>
        <span class="opsItem">
          <a-button type="primary" @click="to('/managerAbout')" ghost>管理关于信息</a-button>
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
#main {
  text-align: center;
}
#ops {
  margin-top: 50px;
}
.opsItem {
  margin: 5px;
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
    if (role === "ROLE_ADMIN") {
      this.$router.push("/admin");
      return;
    }
    this.axios
      .get("user-function-provider", "/api/user/token", {
        headers: {
          token,
        },
      })
      .then((res) => {
        const data = res.data;
        if (data.code === 200) {
          this.username = data.data.username;
          this.email = data.data.email;
          this.createTime = new Date(data.data.createTime);
        } else {
          alert(data.message);
        }
      });
  },
  data() {
    return {
      username: "",
      createTime: new Date(),
      email: "",
    };
  },
  methods: {
    to(path) {
      this.$router.push(path);
    },
  },
  computed: {
    getCreateTime() {
      return `${this.createTime.getFullYear()}-${
        this.createTime.getMonth() + 1
      }-${this.createTime.getDate()}`;
    },
  },
};
</script>
<template>
  <div id="main">
    <h1>个人中心</h1>
    <div class="item">
      <p>用户名: {{username}}</p>
    </div>
    <div class="item">
      <p>用户身份: {{getRole}}</p>
    </div>
    <div class="item">
      <p>邮箱: {{email}}</p>
    </div>
    <div class="item">
      <p>邮箱状态: {{emailStatus === 'UnCheck' ? '未验证' : '已验证'}}</p>
    </div>
    <div class="item">
      <p>创建时间: {{createTime}}</p>
    </div>
    <div class="item" v-if="getRole === '小米之家'">
      <p>账户状态: {{accountStatus === 0 ? '未认证' : '已认证'}}</p>
    </div>
    <div class="item" v-if="getRole === '小米之家'">
      <p>认证文件: {{filename}}</p>
    </div>
    <div class="item" v-if="getRole === '小米之家'">
      <p>文件信息: {{contentType}}</p>
    </div>
  </div>
</template>
<style scoped>
#main {
  text-align: center;
}
</style>
<script>
export default {
  mounted() {
    const token = this.$store.getters.getToken;
    if (!token) {
      this.$router.push("/login");
    } else {
      this.axios
        .get("user-function-provider", "/api/user/token", {
          headers: {
            token,
          },
        })
        .then((res) => {
          if (res.data && res.data.code === 200) {
            const data = res.data.data;
            this.username = data.username;
            this.email = data.email;
            this.emailStatus = data.emailStatus;
            this.createTime = new Date(data.createTime);
            this.filename = data.filename;
            this.role = data.role;
            this.accountStatus = data.accountStatus;
            this.contentType = data.contentType;
          } else {
            alert(res.data.message);
          }
        });
    }
  },
  data() {
    return {
      data: null,
      username: null,
      email: null,
      emailStatus: null,
      createTime: null,
      filename: null,
      role: null,
      accountStatus: null,
      contentType: null,
    };
  },
  computed: {
    getRole() {
      return this.role === "ROLE_ENTERPRISE" ? "小米之家" : "普通用户";
    },
  },
};
</script>
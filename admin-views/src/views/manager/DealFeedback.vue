<template>
  <div id="main">
    <h2>
      处理反馈信息
      <a href="#/manager">(首页)</a>
    </h2>
    <div id="content">
      <div class="item" v-for="(item, index) in feedbacks" :key="index">
        <div>反馈id: {{item.id}}</div>
        <div>反馈时间: {{getDate(item.createTime)}}</div>
        <div>反馈标题: {{item.title}}</div>
        <div>反馈内容: {{item.content}}</div>
        <div>反馈状态: {{item.status === 0 ? '未解答' : '已解答'}}</div>
        <div v-if="item.status === 0">
          解答:
          <input type="text" placeholder="请输入解答" v-model="item.result" />
        </div>
        <div v-else>解答内容: {{item.result}}</div>
        <div v-if="item.status === 0">
          <a-button type="primary" @click="submit(item)">提交解答</a-button>
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
  width: 14%;
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
    if (role === "ROLE_ADMIN") {
      this.$router.push("/admin");
      return;
    }
    this.axios
      .get("feedback-function-provider", "/api/feedback/getFeedbacks", {
        headers: {
          token,
        },
      })
      .then((res) => {
        const data = res.data;
        if (data.code === 200) {
          this.feedbacks = data.data;
        } else {
          alert(data.message);
        }
      });
  },
  data() {
    return {
      feedbacks: [],
    };
  },
  methods: {
    getDate(date) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    submit(item) {
      if (!item.result) {
        alert("内容不能为空.");
        return;
      }
      this.axios
        .post(
          "feedback-function-provider",
          "/api/feedback/addResult",
          {
            id: item.id,
            result: item.result,
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
            alert("解答成功.");
            item.status = 1;
          } else {
            alert(data.message);
          }
        });
    },
  },
};
</script>
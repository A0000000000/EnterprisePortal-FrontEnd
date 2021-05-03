<template>
  <div id="main">
    <h1>已反馈内容</h1>
    <div id="content">
      <div class="item" v-for="(item, index) in feedbacks" :key="index">
        <h2>{{index + 1}}. {{item.title}}</h2>
        <p>{{item.content}}</p>
        <p>状态: {{item.status === 0 ? '未解答' : '已解答'}}</p>
        <p v-if="item.status === 1">回答: {{item.result}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#main {
  text-align: center;
}
#content {
  width: 100%;
  margin-left: 20%;
  margin-right: 20%;
  text-align: left;
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
        .get("feedback-function-provider", "/api/feedback/getAllFeedback", {
          headers: {
            token,
          },
        })
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            this.feedbacks = data.data;
          } else {
            alert(data.message);
          }
        });
    }
  },
  data() {
    return {
      feedbacks: [],
    };
  },
  methods: {},
};
</script>
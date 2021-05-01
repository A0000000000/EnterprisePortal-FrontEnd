<template>
  <div id="main">
    <h1>反馈问题</h1>
    <div id="title">
      <input v-model="title" type="text" class="form-control" placeholder="请输入标题" />
    </div>
    <div id="content">
      <textarea class="form-control" rows="10" v-model="content" placeholder="请描述您的问题" />
    </div>
    <div id="submit">
      <button @click="submit" type="button" class="btn btn-primary">提交</button>
    </div>
    <div id="history">
      <h1>已提交反馈</h1>
      <div v-for="(item, index) in feedbacks" :key="index" class="item">
        <p>{{item.id}}</p>
        <p>{{item.title}}</p>
        <p>{{item.content}}</p>
        <p>{{item.status}}</p>
        <p>{{item.result}}</p>
        <p>{{item.createTime}}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
#main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#title,
#content {
  width: 400px;
  margin: 10px;
}
#main h1 {
  color: black;
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
      title: null,
      content: null,
      feedbacks: [],
    };
  },
  methods: {
    submit() {
      let params = {
        title: this.title,
        content: this.content,
      };
      this.axios
        .post(
          "feedback-function-provider",
          "/api/feedback/addNewFeedback",
          params,
          {
            headers: {
              token: this.$store.getters.getToken,
            },
          }
        )
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            this.title = "";
            this.content = "";
          }
          alert(data.message);
        });
    },
  },
};
</script>
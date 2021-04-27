<template>
  <div>
    <a href="#/message">返回信息首页</a>
    <h1>{{title}}</h1>
    <p>{{createTime}}</p>
    <div>{{content}}</div>
    <a :href="status === 0 ? '#' : '#'">{{status === 0 ? '' : '已'}}领取</a>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  mounted() {
    const id = this.$route.query.id;
    this.axios
      .get("message-function-provider", "/api/message/getMessageById/" + id)
      .then((res) => {
        let data = res.data;
        if (data.code === 200) {
          let model = data.data;
          this.id = model.id;
          this.title = model.title;
          this.createTime = model.createTime;
          this.content = model.content;
          this.url = model.url;
        } else {
          alert(data.message);
        }
      });
  },
  data() {
    return {
      id: "1",
      title: "标题",
      createTime: Date.now(),
      content: "内容",
      url: "url",
      status: 0,
    };
  },
};
</script>
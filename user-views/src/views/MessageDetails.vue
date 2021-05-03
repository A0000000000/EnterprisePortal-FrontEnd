<template>
  <div id="main">
    <h1>
      {{title}}
      <a href="#/message">(首页)</a>
    </h1>
    <p>发布时间: {{getCreateTime}}</p>
    <div v-html="getContent"></div>
    <a :href="status === 0 ? '#' : '#'">{{status === 0 ? '' : '已'}}领取</a>
  </div>
</template>

<style scoped>
#main {
  text-align: center;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
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
          this.createTime = new Date(model.createTime);
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
      createTime: new Date(),
      content: "内容",
      url: "url",
      status: 0,
    };
  },
  computed: {
    getCreateTime() {
      return `${this.createTime.getFullYear()}-${
        this.createTime.getMonth() + 1
      }-${this.createTime.getDate()}`;
    },
    getContent() {
      return this.showdown.makeHtml(this.content);
    },
  },
};
</script>
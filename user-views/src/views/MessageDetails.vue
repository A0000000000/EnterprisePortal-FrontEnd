<template>
  <div id="main">
    <h1>
      {{title}}
      <a href="#/message">(首页)</a>
    </h1>
    <p>发布时间: {{getCreateTime}}</p>
    <button class="btn btn-primary" v-if="status !== 0" @click="receiver">领取</button>
    <div v-html="getContent"></div>
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
import axios from "axios";
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
          if (!this.url) {
            this.status = 0;
          } else {
            this.status = 1;
          }
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
  methods: {
    receiver() {
      if (!this.$store.getters.getToken) {
        this.$router.push("/login");
        return;
      }
      axios
        .get(this.url, {
          headers: {
            token: this.$store.getters.getToken,
          },
        })
        .then((res) => {
          const data = res.data;
          alert(data.message);
        });
    },
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
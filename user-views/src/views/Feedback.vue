<template>
  <div>
    <div id="title">
      <label for="title">主题</label>
      <input id="title" v-model="title" type="text" />
    </div>
    <div id="content">
      <label for="content">内容</label>
      <textarea id="content" v-model="content" />
    </div>
    <div id="submit">
      <button @click="submit">提交</button>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  mounted() {
    const token = this.$store.getters.getToken;
    if (!token) {
      this.$router.push("/login");
    }
    this.axios.get('http://localhost:3003/api/feedback/getAllFeedback', {
      headers: {
        token
      }
    }).then(res => {
      let data = res.data
      console.log(data)
    })
  },
  data() {
    return {
      title: null,
      content: null,
    };
  },
  methods: {
    submit() {
      let params = {
        title: this.title,
        content: this.content,
      };
      this.axios
        .post("http://localhost:3003/api/feedback/addNewFeedback", params, {
          headers: {
            token: this.$store.getters.getToken,
          },
        })
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            this.title = "";
            this.content = "";
          }
          console.log(data.message);
          alert(data.message);
        });
    },
  },
};
</script>
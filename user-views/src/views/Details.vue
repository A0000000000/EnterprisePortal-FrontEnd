<template>
  <div id="main">
    <h1>
      {{name}}
      <a href="#/shop">(首页)</a>
    </h1>
    <div v-html="getDetails"></div>
  </div>
</template>
<style scoped>
#main {
  text-align: center;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
<script>
export default {
  mounted() {
    const id = this.$route.query.id;
    this.axios
      .get("good-function-provider", "/api/good/getGoodById/" + id)
      .then((res) => {
        const data = res.data;
        if (data.code === 200) {
          const model = data.data;
          this.id = model.id;
          this.details = model.details;
          this.name = model.name;
          this.picture = model.picture;
          this.count = model.count;
          this.price = model.price;
          this.time = new Date(model.time);
          this.type = model.type;
        } else {
          alert(data.message);
        }
      });
  },
  data() {
    return {
      id: null,
      details: null,
      name: null,
      picture: null,
      count: 0,
      price: 0,
      time: null,
      type: null,
    };
  },
  computed: {
    getDetails() {
      return this.showdown.makeHtml(this.details);
    },
  },
};
</script>
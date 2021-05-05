<template>
  <div id="introduction">
    <h1>永远相信美好的事情即将发生</h1>
    <div class="content" v-for="(item, i) in infos" :key="i">
      <p v-for="(content, j) in item.contents" :key="j">{{ content }}</p>
      <img :src="item.image" width="100%" />
    </div>
  </div>
</template>

<style scoped>
#introduction h1 {
  margin-bottom: 10px;
}
#introduction div p {
  text-align: justify;
  text-justify: inter-ideograph;
  font-size: 20px;
  text-indent: 2em;
}
</style>

<script>
export default {
  mounted() {
    this.realIp = this.ip;
    this.axios
      .get("guest-function-provider", "/api/introduction/getIntroductions")
      .then((res) => {
        const data = res.data;
        if (data.code === 200) {
          let arr = data.data;
          for (let item in arr) {
            this.infos.push({
              image:
                `http://${this.realIp}:3002/api/introduction/getImage/` +
                arr[item].image +
                "?type=" +
                arr[item].type,
              contents: arr[item].contents,
              order: arr[item].order,
            });
          }
          this.infos.sort((i, j) => i.order - j.order);
        }
      });
  },
  data() {
    return {
      infos: [],
      realIp: "",
    };
  },
};
</script>
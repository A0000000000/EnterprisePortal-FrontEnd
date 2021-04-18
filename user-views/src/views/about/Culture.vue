<template>
  <div id="culture">
    <div id="title">
      <h2>公司文化</h2>
    </div>
    <img src="../../assets/images/Culture.jpg" alt srcset />
    <div v-for="(item, index) in list" :key="index" class="item">
      <h2>{{ item.title }}</h2>
      <p v-for="(i, j) in item.content" :key="j">{{ i }}</p>
      <img :src="item.image" alt srcset />
    </div>
  </div>
</template>
<style scoped>
#title {
  width: 100%;
  text-align: center;
  font-size: 40px;
}
#culture div p {
  text-align: justify;
  text-justify: inter-ideograph;
  font-size: 20px;
  text-indent: 2em;
}

#culture div img,
#culture img {
  width: 100%;
}
</style>
<script>
export default {
  mounted() {
    this.axios
      .get("http://localhost:3002/api/culture/getCultures")
      .then((data) => {
        if (data.status === 200) {
          let arr = data.data;
          for (let i in arr) {
            let item = {
              title: arr[i].title,
              content: arr[i].contents,
              image:
                "http://localhost:3002/api/culture/getImage/" +
                arr[i].image +
                "?type=" +
                arr[i].type,
              order: arr[i].order,
            };
            this.list.push(item);
          }
          this.list.sort((i, j) => i.order - j.order);
        }
      });
  },
  data() {
    return {
      list: [],
    };
  },
};
</script>
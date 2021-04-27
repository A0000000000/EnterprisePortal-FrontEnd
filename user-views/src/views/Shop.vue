<template>
  <div>
    <div>
      <button @click="getGoods('Phone')">手机</button>
      <button @click="getGoods('Laptop')">笔记本</button>
      <button @click="getGoods('Router')">路由器</button>
      <button @click="getGoods('MiHome')">米家</button>
      <button @click="getGoods('MiHome')" v-if="role">套餐(小米之家专享)</button>
    </div>
    <div>
      <div class="item" v-for="(item, index) in goods" :key="index">
        <p>{{item.name}}</p>
        <p>{{item.price}}</p>
        <img :src="item.picture" alt="缩略图" />
        <p>{{item.count}}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>

<script>
export default {
  mounted() {
    this.role = this.$store.getters.getRole == "ROLE_ENTERPRISE";
  },
  data() {
    return {
      role: false,
      title: "手机",
      goods: [
        {
          id: "1",
          name: "小米11",
          price: 3999,
          picture: "#",
          count: 1000,
          type: "Phone",
        },
      ],
    };
  },
  methods: {
    getGoods(type) {
      console.log(type);
    },
  },
};
</script>
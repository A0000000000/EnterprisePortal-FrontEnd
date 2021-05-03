<template>
  <div id="main">
    <h1>购物车</h1>
    <div id="content">
      <div class="item" v-for="(item, index) in items" :key="index">
        <div class="subItem">
          <img
            :src="'http://localhost:3005/api/good/getImage/' + item.picture"
            alt="缩略图"
            width="200px"
            height="150px"
          />
        </div>
        <div class="subItem">
          <p>商品名称: {{item.name}}</p>
          <p>商品价格: {{item.price}}</p>
          <button @click="removeGoodsFromCart(item.id)" type="button" class="btn btn-warning">移除购物车</button>
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="toCoupon()">结算</button>
    </div>
  </div>
</template>
<style scoped>
#main {
  text-align: center;
}

#main h1 {
  color: black;
}

.item {
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px;
}
</style>

<script>
export default {
  mounted() {
    const cart = this.$store.getters.getCart;
    const goods = cart.goods;
    if (!goods || goods.length === 0) {
      this.$router.push("/shop");
    }
    goods.forEach((item) => {
      this.axios
        .get("good-function-provider", "/api/good/getGoodById/" + item)
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            this.items.push(data.data);
          } else {
            alert(data.message);
          }
        });
    });
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    removeGoodsFromCart(id) {
      this.$store.commit("deleteGoodFromCart", id);
      const cart = this.$store.getters.getCart;
      const goods = cart.goods;
      this.items = [];
      goods.forEach((item) => {
        this.axios
          .get("good-function-provider", "/api/good/getGoodById/" + item)
          .then((res) => {
            const data = res.data;
            if (data.code === 200) {
              this.items.push(data.data);
            } else {
              alert(data.message);
            }
          });
      });
    },
    toCoupon() {
      if (this.$store.getters.getCart.goods.length > 0) {
        this.$router.push("/coupon");
      } else {
        this.$router.push("/shop");
      }
    },
  },
};
</script>
<template>
  <div id="main">
    <div class="btn-group" role="group" aria-label="类别">
      <button class="btn btn-secondary" @click="getGoods('phone')">手机</button>
      <button class="btn btn-secondary" @click="getGoods('laptop')">笔记本</button>
      <button class="btn btn-secondary" @click="getGoods('router')">路由器</button>
      <button class="btn btn-secondary" @click="getGoods('miHome')">米家</button>
      <button class="btn btn-secondary" @click="getGoods('miEnterprise')" v-if="role">套餐(小米之家专享)</button>
    </div>
    <div id="content">
      <div class="item" v-for="(item, index) in goods" :key="index">
        <div v-show="item.count > 0">
          <a :href="'#/details?id=' + item.id">
            <img
              :src="'http://localhost:3005/api/good/getImage/' + item.picture"
              alt="缩略图"
              width="200px"
              height="150px"
            />
          </a>
          <br />
          <p>{{item.name}}</p>
          <p>售价: {{item.price}}元</p>
          <button
            type="button"
            class="btn btn-primary"
            @click="cartOps(item.id, isInCart(item.id))"
          >{{ isInCart(item.id) ? "从购物车移除" : "添加到购物车"}}</button>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<style scoped>
#main {
  display: flex;
  flex-direction: column;
}

#content {
  width: 100%;
  margin-top: 50px;
}

#content .item {
  float: left;
  width: 20%;
  text-align: center;
  color: black;
}

#content .item * {
  margin: 0;
  padding: 0;
}

.clear {
  clear: both;
}
</style>

<script>
export default {
  mounted() {
    this.role = this.$store.getters.getRole == "ROLE_ENTERPRISE";
    this.axios
      .get("good-function-provider", "/api/good/getAllGoods/" + "phone")
      .then((res) => {
        const data = res.data;
        if (data.code === 200) {
          this.goods = data.data;
        } else {
          alert(data.message);
        }
      });
  },
  data() {
    return {
      role: false,
      title: "手机",
      goods: [],
    };
  },
  methods: {
    getGoods(type) {
      this.axios
        .get("good-function-provider", "/api/good/getAllGoods/" + type)
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            this.goods = data.data;
          } else {
            alert(data.message);
          }
        });
    },
    cartOps(id, flag) {
      if (flag) {
        this.removeGoodsFromCart(id);
      } else {
        this.addGoodsToCart(id);
      }
    },
    addGoodsToCart(id) {
      this.$store.commit("addGoodToCart", id);
    },
    removeGoodsFromCart(id) {
      this.$store.commit("deleteGoodFromCart", id);
    },
    isInCart(id) {
      return this.$store.getters.getCart.goods.includes(id);
    },
  },
  computed: {},
};
</script>
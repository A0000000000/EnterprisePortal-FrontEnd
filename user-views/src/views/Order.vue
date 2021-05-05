<template>
  <div id="main">
    <h1>确认订单</h1>
    <div id="content">
      <h2>商品列表</h2>
      <div id="goods">
        <div class="item-good" v-for="(item, index) in goods" :key="index">
          <div class="subItem">
            <img
              :src="'http://' + realIp + ':3005/api/good/getImage/' + item.picture"
              alt="缩略图"
              width="200px"
              height="150px"
            />
          </div>
          <div class="subItem">
            <p>商品名称: {{item.name}}</p>
            <p>商品价格: {{item.price}}</p>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <hr />
      <h2>优惠券</h2>
      <div id="coupon" v-if="!!coupon.type">
        <p>优惠券类型: {{ coupon.type }}</p>
        <p>优惠券条件: 满{{ coupon.condition }}元</p>
        <p>优惠金额: {{ coupon.money }}元</p>
        <div class="clear"></div>
      </div>
      <hr />
      <h2>收货地址</h2>
      <div id="location">
        <p>收货地址: {{location.name}}</p>
        <p>收货详情: {{location.details}}</p>
        <div class="clear"></div>
      </div>
      <hr />
      <div id="footer">
        <div class="footer-content">
          合计: {{ sumPrice }} 元
          <button class="btn btn-primary" @click="submit">结算</button>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#main {
  text-align: center;
  padding: 20px;
}
#content {
  text-align: left;
}
#goods {
  width: 100%;
}
.item-good {
  text-align: center;
  width: 20%;
  margin: 20px;
  float: left;
}
.clear {
  clear: both;
}

#coupon p,
#location p {
  float: left;
  width: 25%;
  text-align: center;
}
.footer-content {
  color: red;
  float: right;
}
</style>

<script>
export default {
  mounted() {
    this.realIp = this.ip
    if (!this.$store.getters.getToken) {
      this.$router.push("/login");
      return;
    }
    if (this.$store.getters.getCart.goods.length === 0) {
      this.$router.push("/shop");
      return;
    }
    const cart = this.$store.getters.getCart;
    const token = this.$store.getters.getToken;
    cart.goods.forEach((item) => {
      this.axios
        .get("good-function-provider", "/api/good/getGoodById/" + item)
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            this.goods.push(data.data);
          } else {
            alert(data.message);
          }
        });
    });
    if (cart.coupon) {
      this.axios
        .get(
          "coupon-function-provider",
          "/api/couponInfo/getCouponByInfoId/" + cart.coupon,
          {
            headers: {
              token,
            },
          }
        )
        .then((res) => {
          const couponData = res.data;
          if (couponData.code === 200) {
            const model = {
              id: cart.coupon,
              couponId: couponData.data.id,
              condition: couponData.data.condition,
              money: couponData.data.money,
              type: couponData.data.type === "REGISTER" ? "新人专享" : "满减",
            };
            this.coupon = model;
          } else {
            alert(couponData.message);
          }
        });
    }
    if (cart.location.type === "USE_OLD") {
      this.axios
        .get(
          "user-function-provider",
          "/api/location/getLocationById/" + cart.location.id,
          {
            headers: {
              token,
            },
          }
        )
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            this.location = data.data;
            this.location.type = cart.location.type;
          } else {
            alert(data.message);
          }
        });
    } else {
      this.location = cart.location;
    }
  },
  data() {
    return {
      goods: [],
      coupon: {},
      location: {},
      realIp: ''
    };
  },
  methods: {
    submit() {
      const token = this.$store.getters.getToken;
      const params = this.$store.getters.getCart;
      this.axios
        .post("order-function-provider", "/api/order/createNewOrder", params, {
          headers: {
            token,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            const id = data.data;
            this.$router.push({
              path: "/orderDetails",
              query: {
                id,
              },
            });
            this.$store.commit("clearCart");
          } else {
            alert(data.message);
          }
        });
    },
  },
  computed: {
    sumPrice() {
      let ans = 0;
      for (let index in this.goods) {
        ans += this.goods[index].price;
      }
      if (this.coupon.money) ans -= this.coupon.money;
      return ans;
    },
  },
};
</script>
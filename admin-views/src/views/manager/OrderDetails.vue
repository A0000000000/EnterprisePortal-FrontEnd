<template>
  <div id="main">
    <h1>
      订单详情
      <a href="#/managerOrder">(首页)</a>
    </h1>
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
          <span v-if="status === 0">状态: 待发货</span>
          <span v-if="status === 1">状态: 待收货</span>
          <span v-if="status === 2">状态: 已收货</span>
          <button class="btn btn-primary" v-if="status === 0" @click="submit">确认发货</button>
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

.footer-content span {
  margin-right: 20px;
}
</style>
<script>
export default {
  mounted() {
    this.realIp = this.ip;
    if (!this.$store.getters.getToken) {
      this.$router.push("/login");
      return;
    }
    const id = this.$route.query.id;
    const token = this.$store.getters.getToken;
    this.orderId = id;
    this.axios
      .get("order-function-provider", "/api/order/getOrderById/" + id, {
        headers: {
          token,
        },
      })
      .then((res) => {
        const ret = res.data;
        if (ret.code === 200) {
          const data = ret.data;
          this.status = data.status;
          data.goods.forEach((item) => {
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
          if (data.coupon) {
            this.axios
              .get(
                "coupon-function-provider",
                "/api/couponInfo/getCouponByInfoId/" + data.coupon,
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
                    id: data.coupon,
                    couponId: couponData.data.id,
                    condition: couponData.data.condition,
                    money: couponData.data.money,
                    type:
                      couponData.data.type === "REGISTER" ? "新人专享" : "满减",
                  };
                  this.coupon = model;
                } else {
                  alert(couponData.message);
                }
              });
          }
          this.axios
            .get(
              "user-function-provider",
              "/api/location/getLocationById/" + data.location,
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
              } else {
                alert(data.message);
              }
            });
        } else {
          alert(ret.message);
        }
      });
  },
  data() {
    return {
      goods: [],
      coupon: {},
      location: {},
      status: 0,
      orderId: null,
      realIp: "",
    };
  },
  methods: {
    submit() {
      this.axios
        .get("order-function-provider", "/api/order/sureSend/" + this.orderId, {
          headers: {
            token: this.$store.getters.getToken,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            this.status = 1;
          } else {
            alert(data.message);
          }
        });
    },
  },
};
</script>
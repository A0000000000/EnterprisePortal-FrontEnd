<template>
  <div id="main">
    <h1>请选择您要使用的优惠券</h1>
    <div class="item" v-for="(item, index) in couponsDeal" :key="index">
      <label for="ok" v-if="item.status">
        <p>优惠券类型: {{ item.type }}</p>
        <p>优惠券条件: 满{{ item.condition }}元</p>
        <p>优惠金额: {{ item.money }}元</p>
        <p>使用此优惠券</p>
      </label>
      <input type="radio" @click="useCoupon(item.id)" id="ok" name="coupon" v-if="item.status" />
      <label for="no" v-if="!item.status">
        <p>优惠券类型: {{ item.type }}</p>
        <p>优惠券条件: {{ item.condition }}</p>
        <p>优惠金额: {{ item.money }}元</p>
        <p>使用此优惠券(不可用)</p>
      </label>
      <input
        type="radio"
        @click="useCoupon(item.id)"
        id="no"
        name="coupon"
        v-if="!item.status"
        disabled
      />
    </div>
    <div class="clear"></div>
    <button @click="subOrder" class="btn btn-primary">结算</button>
  </div>
</template>

<style scoped>
#main {
  text-align: center;
  padding: 20px;
  width: 100%;
}
.item {
  float: left;
  width: 20%;
  background-color: #66ccff;
  opacity: 0.7;
  margin: 10px;
}

.clear {
  clear: both;
}
</style>

<script>
export default {
  mounted() {
    const token = this.$store.getters.getToken;
    if (!token) {
      this.$router.push("/login");
    } else {
      this.axios
        .get("coupon-function-provider", "/api/couponInfo/allCouponNotUse", {
          headers: {
            token,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            let infos = data.data;
            this.coupons = [];
            this.axios
              .post("good-function-provider", "/api/good/getPrices", {
                goods: this.$store.getters.getCart.goods,
              })
              .then((resp) => {
                const priceData = resp.data;
                if (priceData.code === 200) {
                  let sumPrice = priceData.data;
                  for (let index in infos) {
                    const item = infos[index];
                    this.axios
                      .get(
                        "coupon-function-provider",
                        "/api/couponInfo/getCouponByInfoId/" + item.id,
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
                            id: item.id,
                            couponId: couponData.data.id,
                            condition: couponData.data.condition,
                            money: couponData.data.money,
                            type: couponData.data.type,
                            status: couponData.data.condition <= sumPrice,
                          };
                          this.coupons.push(model);
                        } else {
                          alert(couponData.message);
                        }
                      });
                  }
                } else {
                  alert(data.message);
                }
              });
          } else {
            alert(data.message);
          }
        });
    }
  },
  data() {
    return {
      coupons: [],
    };
  },
  methods: {
    useCoupon(id) {
      this.$store.commit("setCoupon", id);
    },
    subOrder() {
      this.$router.push("/location");
    },
  },
  computed: {
    couponsDeal() {
      let ans = [];
      const arr = this.coupons;
      for (let index in arr) {
        const item = arr[index];
        let res = {};
        res.condition = item.condition;
        if (item.type === "REGISTER") {
          res.type = "新人专享";
        } else if (item.type === "FULL_SUB") {
          res.type = "满减";
        } else {
          res.type = "神秘优惠券.";
        }
        res.money = item.money;
        res.id = item.id;
        res.status = item.status;
        ans.push(res);
      }
      return ans;
    },
  },
};
</script>
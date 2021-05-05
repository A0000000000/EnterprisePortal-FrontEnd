<template>
  <div id="main">
    <h1>所有订单</h1>
    <div id="content">
      <div class="item" v-for="(item, index) in orders" :key="index">
        <div>订单id: {{item.id}}</div>
        <div v-if="item.status === 0">订单状态: 待发货</div>
        <div v-if="item.status === 1">订单状态: 待收货</div>
        <div v-if="item.status === 2">订单状态: 已收货</div>
        <div>创建时间: {{getDate(new Date(item.createTime))}}</div>
        <div>
          <a :href="'#/orderDetails?id=' + item.id">查看详情</a>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#main {
  text-align: center;
}
.item div {
  width: 25%;
  float: left;
}
.clear {
  clear: both !important;
}
</style>
<script>
export default {
  mounted() {
    const token = this.$store.getters.getToken;
    if (!token) {
      this.$router.push("/login");
      return;
    }
    this.axios
      .get("order-function-provider", "/api/order/getOrders", {
        headers: {
          token,
        },
      })
      .then((res) => {
        const data = res.data;
        if (data.code === 200) {
          this.orders = data.data;
        } else {
          alert(data.message);
        }
      });
  },
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    getDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
  },
};
</script>
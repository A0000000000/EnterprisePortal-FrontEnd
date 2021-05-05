<template>
  <div id="main">
    <h2>
      所有订单
      <a href="#/manager">(首页)</a>
    </h2>
    <div id="content">
      <div class="item" v-for="(item, index) in orders" :key="index">
        <div class="item-content">订单id: {{item.id}}</div>
        <div class="item-content">下单时间: {{formatDate(item.createTime)}}</div>
        <div
          class="item-content"
        >订单状态: {{item.status === 0 ? '已下单' : item.status === 1 ? '已发货' : '已完成'}}</div>
        <div class="item-content">
          <a :href="'#/orderDetails?id=' + item.id">订单详情</a>
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
.item-content {
  float: left;
  width: 25%;
}
.clear {
  clear: both;
}
</style>
<script>
export default {
  mounted() {
    const token = this.$store.getters.getToken;
    const role = this.$store.getters.getRole;
    if (!token) {
      this.$router.push("/login");
      return;
    }
    if (role === "ROLE_ADMIN") {
      this.$router.push("/admin");
      return;
    }
    this.axios
      .get("order-function-provider", "/api/order/getAllOrders", {
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
    formatDate(date) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
  },
};
</script>
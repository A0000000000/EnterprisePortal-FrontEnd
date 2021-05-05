<template>
  <div id="main">
    <h2>
      查看销售数据
      <a href="#/admin">(首页)</a>
    </h2>
    <div id="content">
      <div class="item" v-for="(item, index) in getSortGoods" :key="index">
        <img
          :src="'http://' + realIp + ':3005/api/good/getImage/' + item.picture"
          alt="缩略图"
          width="200px"
          height="150px"
        />
        <br />
        <p>{{item.name}}</p>
        <p>售价: {{item.price}}元</p>
        <p>已经售出: {{item.soldCount}}</p>
        <p>库存: {{item.count}}</p>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<style scoped>
#main {
  text-align: center;
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
    this.realIp = this.ip;
    const token = this.$store.getters.getToken;
    const role = this.$store.getters.getRole;
    if (!token) {
      this.$router.push("/login");
      return;
    }
    if (role !== "ROLE_ADMIN") {
      this.$router.push("/manager");
      return;
    }
    this.axios
      .get("order-function-provider", "/api/order/getAllOrders", {
        headers: {
          token,
        },
      })
      .then((res) => {
        let ret = res.data;
        if (ret.code === 200) {
          const data = ret.data;
          let ans = [];
          let tmp = {};
          for (let i in data) {
            for (let j in data[i].goods) {
              if (tmp[data[i].goods[j]]) {
                tmp[data[i].goods[j]]++;
              } else {
                tmp[data[i].goods[j]] = 1;
              }
            }
          }
          for (let i in tmp) {
            ans.push({
              id: i,
              count: tmp[i],
            });
          }
          for (let index in ans) {
            this.axios
              .get(
                "good-function-provider",
                "/api/good/getGoodById/" + ans[index].id
              )
              .then((res) => {
                const data = res.data;
                if (data.code === 200) {
                  let model = data.data;
                  model.soldCount = ans[index].count;
                  this.goods.push(model);
                } else {
                  alert(data.message);
                }
              });
          }
        } else {
          alert(ret.message);
        }
      });
  },
  data() {
    return {
      goods: [],
      realIp: "",
    };
  },
  computed: {
    getSortGoods() {
      return this.goods.sort((i, j) => j.soldCount - i.soldCount);
    },
  },
};
</script>
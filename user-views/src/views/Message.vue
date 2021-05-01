<template>
  <div id="main">
    <h1>活动和公告</h1>
    <div id="content">
      <div class="item" v-for="(item, index) in messagesOrder" :key="index">
        {{ item.title }}
        <button
          type="button"
          class="btn btn-info"
          @click="handleDetails(item.id)"
        >查看详情</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
#main {
  color: black;
  text-align: center;
}
#content {
  margin-top: 50px;
}
.item {
  width: 100%;
  text-align: center;
  font-size: 48px;
  color: black;
}
</style>

<script>
export default {
  mounted() {
    this.messages = [];
    this.axios
      .get("message-function-provider", "/api/message/getMessageTitle")
      .then((res) => {
        const data = res.data;
        if (data.code === 200) {
          let arr = data.data;
          arr.forEach((item) => {
            this.messages.push({
              id: item.id,
              order: item.order,
              title: item.title,
            });
          });
        } else {
          alert(data.message);
        }
      });
  },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    handleDetails(id) {
      this.$router.push({
        path: "/messageDetails",
        query: {
          id,
        },
      });
      return false;
    },
  },
  computed: {
    messagesOrder() {
      return this.messages.sort((i, j) => i.order - j.order);
    },
  },
};
</script>
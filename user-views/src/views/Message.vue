<template>
  <div>
    <div class="item" v-for="(item, index) in messagesOrder" :key="index">
      <button @click="handleDetails(item.id)">{{item.title}}</button>
    </div>
  </div>
</template>
<style scoped>
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
    },
  },
  computed: {
    messagesOrder() {
      return this.messages.sort((i, j) => i.order - j.order);
    },
  },
};
</script>
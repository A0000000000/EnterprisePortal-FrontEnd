<template>
  <div id="main">
    <h2>
      所有微服务
      <a href="#/admin">(首页)</a>
    </h2>
    <div id="content">
      <div v-for="(item, index) in services" :key="index" class="item">
        <a-card :title="'微服务' + (index + 1)" style="width: 100%">
          <p>服务名称: {{ item.name}}</p>
          <p>服务地址: {{ item.url }}</p>
          <p>服务端口: {{ item.port }}</p>
          <p>
            <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />&nbsp;Running
          </p>
        </a-card>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<style scoped>
#main {
  text-align: center;
}
.item {
  width: 18%;
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: 15px;
  float: left;
  padding: 20px;
  text-align: left;
}
.clear {
  clear: both;
}
</style>
<script>
import axios from "axios";
export default {
  mounted() {
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
    axios.get("http://" + this.ip + ":8000").then((res) => {
      const data = res.data;
      if (data.code === 200) {
        for (let item in data.data) {
          this.services.push({
            name: item,
            url: data.data[item].url,
            port: data.data[item].port,
          });
        }
        this.services.sort((i, j) => i.port - j.port);
      } else {
        alert(data.message);
      }
    });
  },
  data() {
    return {
      services: [],
    };
  },
  methods: {},
};
</script>
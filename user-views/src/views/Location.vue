<template>
  <div id="main">
    <h1>选择收货地址</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">地址</th>
          <th scope="col">详情</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="item"
          v-for="(item, index) in locations"
          :key="index"
          @click="handleRadioClick('USE_OLD', item.id)"
        >
          <td>
            <label :for="'location' + index">{{ item.name }}</label>
          </td>
          <td>
            <label :for="'location' + index">{{ item.details }}</label>
          </td>
          <td>
            <input type="radio" name="location" :id="'location' + index" />
          </td>
        </tr>
        <tr>
          <td @click="handleRadioClick('CREATE')">
            <label for="newLocation">
              <input type="text" v-model="name" class="form-control" placeholder="请输入地址" />
            </label>
          </td>
          <td>
            <label for="newLocation">
              <input
                type="text"
                v-model="details"
                id="newLocation"
                class="form-control"
                placeholder="请输入详情"
              />
            </label>
          </td>
          <td>
            <input type="radio" name="location" />
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="handleSubmit" class="btn btn-primary">结算</button>
  </div>
</template>
<style scoped>
#main {
  text-align: center;
  padding: 20px;
}
</style>
<script>
export default {
  mounted() {
    if (!this.$store.getters.getToken) {
      this.$router.push("/login");
      return;
    }
    this.axios
      .get("user-function-provider", "/api/location/getAllLocation", {
        headers: {
          token: this.$store.getters.getToken,
        },
      })
      .then((res) => {
        const data = res.data;
        if (data.code === 200) {
          this.locations = data.data;
        } else {
          alert(data.message);
        }
      });
  },
  data() {
    return {
      locations: [],
      name: "",
      details: "",
      type: null,
      id: null,
    };
  },
  methods: {
    handleRadioClick(type, id) {
      this.type = type;
      this.id = id;
    },
    handleSubmit() {
      const type = this.type;
      if (!type) {
        alert("请先选择您的收货地址.");
        return;
      }
      if (type === "USE_OLD") {
        this.$store.commit("setLocation", {
          type,
          id: this.id,
        });
      } else {
        if (!this.name || !this.details) {
          alert("收货地址不能为空.");
        }
        this.$store.commit("setLocation", {
          type,
          name: this.name,
          details: this.details,
        });
      }
      this.$router.push('/order')
    },
  },
};
</script>
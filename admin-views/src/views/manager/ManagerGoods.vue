<template>
  <div id="main">
    <h2>
      管理商品
      <a href="#/manager">(首页)</a>
    </h2>
    <div id="content">
      <div class="item" v-for="(item, index) in goods" :key="index">
        <img
          :src="'http://' + realIp + ':3005/api/good/getImage/' + item.picture"
          alt="缩略图"
          width="200px"
          height="150px"
        />
        <br />
        <p>{{item.name}}</p>

        <p>
          售价:
          <input type="text" v-model="item.price" />元
        </p>
        <p>
          库存:
          <input type="text" v-model="item.count" />件
        </p>
        <a-button type="primary" @click="changeGood(item)">修改</a-button>
      </div>
      <div class="clear"></div>
    </div>
    <hr />
    <div id="addGood">
      <h2>添加商品</h2>
      <div class="form-control">
        商品名称:
        <input type="text" name id v-model="name" />
      </div>
      <div class="form-control">
        商品价格:
        <input type="number" name id v-model="price" />
      </div>
      <div class="form-control">
        商品库存:
        <input type="number" name id v-model="count" />
      </div>
      <div class="form-control">
        <p>选择商品类型</p>
        <input type="radio" @click="changeType('phone')" name="type" id="phone" checked />
        <label for="phone">手机</label>
        <input type="radio" @click="changeType('laptop')" name="type" id="laptop" />
        <label for="laptop">笔记本</label>
        <input type="radio" @click="changeType('router')" name="type" id="router" />
        <label for="router">路由器</label>
        <input type="radio" @click="changeType('miHome')" name="type" id="miHome" />
        <label for="miHome">米家</label>
        <input type="radio" @click="changeType('miEnterprise')" name="type" id="miEnterprise" />
        <label for="miEnterprise">套餐</label>
      </div>
      <div class="form-control">
        <label for="image">上传预览图</label>
        <input type="file" name id="image" @change="upload" />
      </div>
      <div>
        <a-button type="primary" @click="submit">添加</a-button>
      </div>
      <div class="form-control">
        <div class="details">
          <h3>输入商品详情</h3>
          <textarea class="content" v-model="details"></textarea>
        </div>
        <div class="details">
          <h3>预览详情</h3>
          <div v-html="getDetailsResult" class="content"></div>
        </div>
        <div class="details">
          <h3>上传图片</h3>
          <input type="file" name id @change="uploadImage" />
          <br />
          <a-button type="primary" @click="sureUploadImage">上传图片</a-button>
          <div>
            <h4>已上传图片</h4>
            <p
              v-for="(item, index) in images"
              :key="index"
            >![图片](http://{{realIp}}:3005/api/good/getImage/{{item}})</p>
          </div>
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
.item {
  float: left;
  width: 20%;
}
.clear {
  clear: both;
}
.form-control {
  width: 100%;
}
.details {
  width: 33%;
  float: left;
}
.clear {
  clear: both;
}
.content {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  height: 200px;
  background-color: white;
  overflow: auto;
  text-align: left;
}
</style>
<script>
export default {
  mounted() {
    this.realIp = this.ip
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
      .get("good-function-provider", "/api/good/getAllGoods/" + "all")
      .then((res) => {
        const data = res.data;
        if (data.code === 200) {
          this.goods = data.data;
        } else {
          alert(data.message);
        }
      });
  },
  data() {
    return {
      goods: [],
      name: "",
      price: 0,
      count: "",
      type: "phone",
      picture: null,
      details: "",
      file: null,
      images: [],
      realIp
    };
  },
  methods: {
    changeGood(item) {
      this.axios
        .put("good-function-provider", "/api/good/updateGood", item, {
          headers: {
            token: this.$store.getters.getToken,
          },
        })
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            alert("修改成功.");
          } else {
            alert(data.message);
          }
        });
    },
    changeType(type) {
      this.type = type;
    },
    upload(e) {
      this.picture = e.target.files[0];
    },
    submit() {
      if (
        !this.name ||
        !this.price ||
        !this.count ||
        !this.type ||
        !this.details ||
        !this.picture
      ) {
        alert("参数不足.");
        return;
      }
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("price", this.price);
      formData.append("count", this.count);
      formData.append("details", this.details);
      formData.append("type", this.type);
      formData.append("image", this.picture);
      this.axios
        .post("good-function-provider", "/api/good/addNewGood", formData, {
          headers: {
            token: this.$store.getters.getToken,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            alert("增加成功.");
            this.name = "";
            this.price = 0;
            this.count = 0;
            this.details = "";
            this.picture = null;
            this.axios
              .get("good-function-provider", "/api/good/getAllGoods/" + "all")
              .then((res) => {
                const data = res.data;
                if (data.code === 200) {
                  this.goods = data.data;
                } else {
                  alert(data.message);
                }
              });
          } else {
            alert(data.message);
          }
        });
    },
    uploadImage(e) {
      this.file = e.target.files[0];
    },
    sureUploadImage() {
      if (!this.file) {
        alert("请选择一张新图片");
      }
      let formData = new FormData();
      formData.append("image", this.file);
      this.axios
        .post("good-function-provider", "/api/good/uploadImage", formData, {
          headers: {
            token: this.$store.getters.getToken,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            alert(data.message);
            this.images.push(data.data);
          } else {
            alert(data.message);
          }
        });
    },
  },
  computed: {
    getDetailsResult() {
      return this.showdown.makeHtml(this.details);
    },
  },
};
</script>
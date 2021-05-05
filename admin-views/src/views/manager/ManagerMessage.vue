<template>
  <div id="main">
    <h2>
      管理信息
      <a href="#/manager">(首页)</a>
    </h2>
    <div id="content">
      <div>
        消息标题:
        <input type="text" name id v-model="title" />
      </div>
      <div>
        优惠券条件:
        <input type="number" v-model="condition" name id />元
      </div>
      <div>
        优惠券金额:
        <input type="number" v-model="money" name id />元
      </div>
      <div>
        优惠券数量:
        <input type="number" v-model="count" name id />张
      </div>
      <div>
        <div class="content">
          <h3>请输入内容</h3>
          <textarea class="content-item" name id v-model="content"></textarea>
        </div>
        <div class="content">
          <h3>预览内容</h3>
          <div class="content-item" v-html="getContent"></div>
        </div>
        <div class="content">
          <h3>上传图片</h3>
          <input type="file" name id @change="uploadImage" />
          <a-button type="primary" @click="upload">上传</a-button>
          <div>
            <p
              v-for="(item, index) in images"
              :key="index"
            >![图片](http://{{realIp}}:3004/api/message/image/{{item}})</p>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div>
        <a-button type="primary" @click="submit">提交</a-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
#main {
  text-align: center;
}
.content {
  width: 33%;
  background-color: white;
  height: 700px;
  float: left;
}
.clear {
  clear: both;
}

.content-item {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  height: 90%;
  background-color: white;
  overflow: auto;
  text-align: left;
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
    if (role === "ROLE_ADMIN") {
      this.$router.push("/admin");
      return;
    }
  },
  data() {
    return {
      title: "",
      content: "",
      images: [],
      file: null,
      money: 0,
      condition: 0,
      count: 0,
      realIp: "",
    };
  },
  computed: {
    getContent() {
      return this.showdown.makeHtml(this.content);
    },
  },
  methods: {
    submit() {
      if (!this.title || !this.content) {
        alert("参数不足.");
        return;
      }
      if (this.money && this.condition && this.count) {
        this.axios
          .post(
            "coupon-function-provider",
            "/api/coupon/addNewCoupon",
            {
              money: this.money,
              condition: this.condition,
              count: this.count,
              type: "FULL_SUB",
            },
            {
              headers: {
                token: this.$store.getters.getToken,
              },
            }
          )
          .then((res) => {
            const data = res.data;
            if (data.code === 200) {
              const id = data.data;
              const url =
                "http://" + this.realIp + ":3006/api/couponInfo/receiveCoupon/" + id;
              this.axios
                .post(
                  "message-function-provider",
                  "/api/message/addNewMessage",
                  {
                    title: this.title,
                    content: this.content,
                    url,
                    order: 0,
                  },
                  {
                    headers: {
                      token: this.$store.getters.getToken,
                    },
                  }
                )
                .then((res) => {
                  const msgData = res.data;
                  if (msgData.code === 200) {
                    alert("发布成功.");
                    this.$router.push("/manager");
                  } else {
                    alert(msgData.message);
                  }
                });
            } else {
              alert(data.message);
            }
          });
      } else {
        this.axios
          .post(
            "message-function-provider",
            "/api/message/addNewMessage",
            {
              title: this.title,
              content: this.content,
              order: 0,
            },
            {
              headers: {
                token: this.$store.getters.getToken,
              },
            }
          )
          .then((res) => {
            const msgData = res.data;
            if (msgData.code === 200) {
              alert("发布成功.");
              this.$router.push("/manager");
            } else {
              alert(msgData.message);
            }
          });
      }
    },
    uploadImage(e) {
      this.file = e.target.files[0];
    },
    upload() {
      if (!this.file) {
        alert("请先选择图片.");
        return;
      }
      let formData = new FormData();
      formData.append("image", this.file);
      this.axios
        .post(
          "message-function-provider",
          "/api/message/addNewImage",
          formData,
          {
            headers: {
              token: this.$store.getters.getToken,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            this.images.push(data.data);
            alert("上传成功.");
            this.file = null;
          } else {
            alert(data.message);
          }
        });
    },
  },
};
</script>
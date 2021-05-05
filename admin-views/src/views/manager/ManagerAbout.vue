<template>
  <div id="main">
    <h2>
      管理关于信息
      <a href="#/manager">(首页)</a>
    </h2>
    <div class="router">
      <div class="router-item">
        <input type="radio" @click="setIntroductions" name="about" id="introduction" checked />
        <label for="introduction">管理介绍信息</label>
      </div>
      <div class="router-item">
        <input type="radio" @click="setCultures" name="about" id="culture" />
        <label for="culture">管理文化信息</label>
      </div>
      <div class="router-item">
        <input type="radio" @click="setCivilizations" name="about" id="civilization" />
        <label for="civilization">管理发展经历信息</label>
      </div>
      <div class="clear"></div>
    </div>
    <div class="content" v-if="page === 1">
      <h3>管理介绍信息</h3>
      <div class="content-item">
        <div class="content" v-for="(item, i) in introductions" :key="i">
          <p>
            条目id: {{item.id}}
            <!-- <a-button type="primary" @click="deleteIntroduction(item.id)">删除</a-button> -->
          </p>
          <p v-for="(content, j) in item.contents" :key="j">{{ content }}</p>
          <img :src="item.image" width="100%" />
        </div>
      </div>
      <div class="content-item">
        <h3>添加新条目</h3>
        <div>
          条目图片:
          <input type="file" @change="uploadIntroductionImage" />
          条目段落:
          <input type="text" placeholder="请输入一段文字." v-model="text" />
          <a-button @click="addText" type="primary" ghost>添加一段文字</a-button>
        </div>
        <a-button type="primary" @click="addIntroduction">增加</a-button>
        <div>
          <h3>已添加段落</h3>
          <p v-for="(item, index) in introduction.lines" :key="index">{{item}}</p>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="content" v-if="page === 2">
      <h3>管理文化信息</h3>
      <div class="content-item">
        <div v-for="(item, index) in cultures" :key="index" class="item">
          <h2>{{ item.title }}</h2>
          <p v-for="(i, j) in item.content" :key="j">{{ i }}</p>
          <img :src="item.image" alt srcset />
        </div>
      </div>
      <div class="content-item">
        <h3>添加新条目</h3>标题:
        <input type="text" name id v-model="culture.title" />
        <br />内容:
        <textarea name id v-model="culture.content" cols="30" rows="10"></textarea>
        <br />图片:
        <input type="file" name id @change="uploadCultureImage" />
        <br />
        <a-button @click="addCulture" type="primary">添加</a-button>
      </div>
      <div class="clear"></div>
    </div>
    <div class="content" v-if="page === 3">
      <h3>管理发展经历信息</h3>
      <div class="content-item">
        <div class="item" v-for="(item, index) in formatTimeline" :key="index">
          <div class="time">{{ item.time }}</div>
          <div class="cv-content">{{ item.content }}</div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="content-item">
        <h3>添加新的经历</h3>选择时间:
        <input type="date" name v-model="civilization.time" id />
        <br />内容:
        <textarea type="text" name v-model="civilization.content" cols="30" rows="10"></textarea>
        <br />
        <a-button type="primary" @click="addCivilization">提交</a-button>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<style scoped>
#main {
  text-align: center;
}
.router-item {
  float: left;
  width: 33%;
}
.clear {
  clear: both;
}
.content {
  padding-top: 30px;
  background-color: gray;
}
.content-item {
  float: left;
  width: 50%;
  background-color: gray;
}
.time {
  width: 25%;
  float: left;
  font-size: 20px;
  font-weight: bolder;
  text-align: left;
}

.cv-content {
  width: 75%;
  float: left;
  font-size: 18px;
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
    this.setIntroductions();
  },
  data() {
    return {
      page: 1,
      realIp: "",
      introductions: [],
      cultures: [],
      civilizations: [],
      introduction: {
        image: null,
        lines: [],
        order: 0,
      },
      text: "",
      culture: {
        title: "",
        content: "",
        image: null,
        order: 0,
      },
      civilization: {
        time: new Date(),
        content: "",
      },
    };
  },
  methods: {
    setIntroductions() {
      this.page = 1;
      this.axios
        .get("guest-function-provider", "/api/introduction/getIntroductions")
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            let arr = data.data;
            this.introductions = [];
            for (let item in arr) {
              this.introductions.push({
                id: arr[item].id,
                image:
                  `http://${this.realIp}:3002/api/introduction/getImage/` +
                  arr[item].image +
                  "?type=" +
                  arr[item].type,
                contents: arr[item].contents,
                order: arr[item].order,
              });
            }
          } else {
            alert(data.message);
          }
        });
    },
    setCultures() {
      this.page = 2;
      this.axios
        .get("guest-function-provider", "/api/culture/getCultures")
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            let arr = data.data;
            this.cultures = [];
            for (let i in arr) {
              let item = {
                title: arr[i].title,
                content: arr[i].contents,
                image:
                  `http://${this.realIp}:3002/api/culture/getImage/` +
                  arr[i].image +
                  "?type=" +
                  arr[i].type,
                order: arr[i].order,
              };
              this.cultures.push(item);
            }
          } else {
            alert(data.message);
          }
        });
    },
    setCivilizations() {
      this.page = 3;
      this.axios
        .get("guest-function-provider", "/api/civilization/getCivilizations")
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            this.civilizations = data.data;
          } else {
            alert(data.message);
          }
        });
    },
    deleteIntroduction(id) {
      this.axios
        .delete(
          "guest-function-provider",
          "/api/introduction/deleteItem/" + id,
          {
            headers: {
              token: this.$store.getters.getToken,
            },
          }
        )
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            alert("删除成功.");
            this.setIntroductions();
          } else {
            alert(data.message);
          }
        });
    },
    addText() {
      this.introduction.lines.push(this.text);
      this.text = "";
    },
    uploadIntroductionImage(e) {
      this.introduction.image = e.target.files[0];
    },
    addIntroduction() {
      let formData = new FormData();
      formData.append("image", this.introduction.image);
      let content = "";
      this.introduction.lines.forEach((item) => (content += item + "\n"));
      if (!content) {
        alert("内容不能为空!");
        return;
      }
      formData.append("content", content);
      formData.append("order", this.introduction.order);
      this.axios
        .post(
          "guest-function-provider",
          "/api/introduction/addNewPart",
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
            alert("上传成功.");
            this.introduction = {
              image: null,
              lines: [],
              order: 0,
            };
            this.setIntroductions();
          } else {
            alert(data.message);
          }
        });
    },
    uploadCultureImage(e) {
      this.culture.image = e.target.files[0];
    },
    addCulture() {
      if (!this.culture.title || !this.culture.content) {
        alert("参数不足.");
        return;
      }
      let formData = new FormData();
      formData.append("title", this.culture.title);
      formData.append("content", this.culture.content);
      formData.append("image", this.culture.image);
      formData.append("order", 0);
      this.axios
        .post("guest-function-provider", "/api/culture/addNewPart", formData, {
          headers: {
            token: this.$store.getters.getToken,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.code === 200) {
            alert("添加成功.");
            this.culture.title = "";
            this.culture.content = "";
            this.setCultures();
          } else {
            alert(data.message);
          }
        });
    },
    addCivilization() {
      if (!this.civilization.content) {
        alert("内容不能为空.");
        return;
      }
      this.civilization.time = new Date(this.civilization.time);
      this.axios
        .post(
          "guest-function-provider",
          "/api/civilization/addNewCivilization",
          {
            year: this.civilization.time.getFullYear(),
            month: this.civilization.time.getMonth() + 1,
            day: this.civilization.time.getDate(),
            content: this.civilization.content,
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
            alert("添加成功.");
            this.civilization.content = "";
            this.setCivilizations();
          } else {
            alert(data.message);
          }
        });
    },
  },
  computed: {
    formatTimeline() {
      return this.civilizations.map((item) => {
        item.time = new Date(item.time);
        let time = `${item.time.getFullYear()}年${
          item.time.getMonth() + 1
        }月${item.time.getDate()}日`;
        return {
          time,
          content: item.content,
        };
      });
    },
  },
};
</script>
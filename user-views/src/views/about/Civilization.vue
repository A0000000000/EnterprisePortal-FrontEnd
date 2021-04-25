<template>
  <div>
    <img src="../../assets/images/Civilization.jpg" alt srcset />
    <div class="item" v-for="(item, index) in formatTimeline" :key="index">
      <div class="time">{{ item.time }}</div>
      <div class="content">{{ item.content }}</div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%;
}

.item {
  width: 100%;
  margin-top: 15px;
}

.time {
  width: 25%;
  float: left;
  font-size: 20px;
  font-weight: bolder;
  text-align: left;
}

.content {
  width: 75%;
  float: left;
  font-size: 18px;
}

.clear {
  clear: both;
}
</style>

<script>
export default {
  mounted() {
    this.axios
      .get("http://localhost:3002/api/civilization/getCivilizations")
      .then((res) => {
        const data = res.data
        if (data.code === 200) {
          this.timeline = data.data.map((item) => ({
            time: new Date(item.time),
            content: item.content,
          }));
          this.timeline.sort((i, j) => j.time.getTime() - i.time.getTime());
        }
      });
  },
  data() {
    return {
      timeline: [],
    };
  },
  computed: {
    formatTimeline() {
      return this.timeline.map((item) => {
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
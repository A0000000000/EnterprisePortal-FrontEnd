<template>
  <div class="index">
    <p>
      <img src="../assets/images/milogo.png" alt="小米" />&nbsp;&nbsp;小米公司
    </p>
    <p>{{ tipsData }}</p>
  </div>
</template>

<style scoped>
.index {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 28px;
  background-image: url("../assets/images/mi.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      tips: "让全球每个人都能享受科技带来的美好生活",
      index: 0,
    };
  },
  methods: {},
  mounted() {
    let timer = () => {
      if (this.index < this.tips.length) {
        this.index++;
        setTimeout(timer, 300 + Math.random() * 100);
      }
    };
    timer();
  },
  computed: {
    tipsData() {
      return (
        this.tips.substring(0, this.index) +
        (this.index === this.tips.length ? "" : "__")
      );
    },
  },
};
</script>

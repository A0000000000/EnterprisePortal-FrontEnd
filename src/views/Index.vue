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
  height: 60%;
}
</style>

<script>
export default {
  data() {
    return {
      tips: "致力于让每个人享受科技的乐趣",
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

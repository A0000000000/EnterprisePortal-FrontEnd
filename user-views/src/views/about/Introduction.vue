<template>
  <div id="introduction">
    <h1>永远相信美好的事情即将发生</h1>
    <div v-for="(item, i) in infos" :key="i">
      <p v-for="(content, j) in item.contents" :key="j">{{ content }}</p>
      <img src="../../assets/images/test.jpg" width="100%" />
    </div>
  </div>
</template>

<style scoped>
#introduction h1 {
  margin-bottom: 10px;
}
#introduction div p {
  text-align: justify;
  text-justify: inter-ideograph;
  font-size: 14px;
}
</style>

<script>
export default {
  mounted() {
    this.infos = [
      {
        image: "../../assets/images/test.jpg",
        contents: [
          "小米公司正式成立于2010年4月，是一家以手机、智能硬件和 IoT 平台为核心的互联网公司。创业仅7年时间，小米的年收入就突破了千亿元人民币。截止2018年，小米的业务遍及全球80多个国家和地区。",
          "小米的使命是，始终坚持做“感动人心、价格厚道”的好产品，让全球每个人都能享受科技带来的美好生活。",
        ],
      },
    ];
  },
  data() {
    return {
      infos: [],
    };
  },
};
</script>
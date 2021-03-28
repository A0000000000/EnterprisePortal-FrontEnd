<template>
  <div class="index">
    <div id="enterpriseName">
      <img src="../assets/images/milogo.png" alt="小米" />
      <span>小米公司</span>
    </div>
    <p>{{ tipsData }}</p>
    <div id="content">
      <p>小米公司正式成立于2010年4月，是一家以手机、智能硬件和 IoT 平台为核心的互联网公司。创业仅7年时间，小米的年收入就突破了千亿元人民币。截止2018年，小米的业务遍及全球80多个国家和地区。</p>
      <p>小米的使命是，始终坚持做“感动人心、价格厚道”的好产品，让全球每个人都能享受科技带来的美好生活。</p>
      <p>“和用户交朋友，做用户心中最酷的公司”的愿景都在驱动着我们努力创新，不断追求极致的产品和效率，成就了一个不断缔造成长奇迹的小米。</p>
      <p>
        目前，小米是全球第四大智能手机制造商，在30余个国家和地区的手机市场进入了前五名，特别是在印度，连续5个季度保持手机出货量第一。通过独特的“生态链模式”，小米投资、带动了更多志同道合的创业者，同时建成了连接超过1.3亿台智能设备的IoT平台。
        2018年7月9日，小米成功在香港主板上市，成为了港交所首个同股不同权上市公司，创造了香港史上最大规模科技股IPO，以及当时历史上全球第三大科技股IPO。
        感谢您关注小米，和我们并肩投身于创造商业效率新典范，用科技改善人类生活的壮丽事业。许商业以敦厚，许科技以温暖，许大众以幸福，我们的征途是星辰大海，请和我们一起，永远相信美好的事情即将发生。
      </p>
    </div>
  </div>
</template>

<style scoped>
.index {
  text-align: center;
  font-size: 28px;
  background-image: url("../assets/images/mi.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

#enterpriseName {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
}

#enterpriseName span {
  margin: 0 20px;
}

#content {
  font-size: 20px;
  margin: 5% 25%;
  text-align: left;
}

#content p {
  text-indent: 2em;
  text-align: justify;
  text-justify: inter-ideograph;
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
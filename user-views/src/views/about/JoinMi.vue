<template>
  <div id="container">
    <div class="item">
      <h1>社会招聘</h1>
      <div>
        <div>
          <p>小米崇尚创新、快速的互联网文化</p>
          <p>正在寻找富有创意和想法的你</p>
        </div>
        <a href="http://job.hr.xiaomi.com/apply/xiaomi/287/#/">前往社会招聘></a>
      </div>
    </div>
    <div class="item">
      <h1>校园招聘</h1>
      <div>
        <div>
          <p>让未来的你喜欢现在的自己</p>
          <p>加入我们，在行动中收获梦想</p>
        </div>
        <a href="http://campus.hr.xiaomi.com/campus_apply/xiaomi/286/#/">前往校园招聘></a>
      </div>
    </div>
  </div>
</template>
<style scoped>
#container {
  display: flex;
  flex-direction: row;
}
.item {
  width: 50%;
}

.item div div p {
  font-size: 24px;
}

.item div div {
  margin-top: 20px;
  margin-bottom: 20px;
}

.item a {
  color: #ff6700;
}
</style>
<script>
export default {};
</script>
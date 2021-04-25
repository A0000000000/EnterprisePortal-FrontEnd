<template>
  <div>
    <div id="title">关于小米</div>
    <div id="about">
      <div id="left">
        <ul>
          <li>
            <router-link to="/about/introduction">公司简介</router-link>
          </li>
          <li>
            <router-link to="/about/miCulture">小米文化</router-link>
          </li>
          <li>
            <router-link to="/about/civilization">发展经历</router-link>
          </li>
          <li>
            <router-link to="/about/joinMi">加入小米</router-link>
          </li>
        </ul>
      </div>
      <div id="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
#title {
  text-align: center;
  font-size: 48px;
  margin: 10px;
  font-weight: bolder;
  color: #FF6A00;
}
#about {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5% 0;
}
#left {
  width: 15%;
  margin-left: 7.5%;
  margin-right: 7.5%;
  text-align: center;
}

#left ul {
  list-style: none;
  font-size: 20px;
}

#left ul li {
  margin: 25px 0;
}

#left ul li a {
  text-decoration: none;
}

#right {
  margin-right: 15%;
  width: 55%;
  text-align: center;
}
</style>
<template>
  <div class="glass">
    <ul class="dock">
      <li
        v-for="(item, i) in routers"
        :key="i"
        class="item"
        @mousemove="mouseMoveHandle($event)"
        @mouseleave="mouseLeaveHandle"
        @click="clickHandle($event, i)"
        :title="routers[i].name"
      >{{ item.image }}</li>
    </ul>
  </div>
</template>

<style scoped>
.glass {
  width: 100%;
  height: 8rem;
  background-color: #eee;
  display: flex;
  justify-content: center;
  opacity: 0.7;
}
.dock {
  --scale: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
  font-size: calc(6rem * var(--scale));
  padding: 0.5rem;
  cursor: default;
  position: relative;
  top: calc((6rem * var(--scale) - 6rem) / 2 * -1);
  transition: 200ms all ease-out;
}

.item.loading {
  animation: 1s loading ease-in infinite;
}

@keyframes loading {
  0%,
  100% {
    transform: translateY(0px);
  }
  60% {
    transform: translateY(-40px);
  }
}
</style>

<script>
export default {
  data() {
    return {
      scale: 0.6,
      routers: [
        {
          path: "/index",
          name: "首页",
          image: "😀",
        },
        {
          path: "/shop",
          name: "商城",
          image: "😁",
        },
        {
          path: "/message",
          name: "信息",
          image: "😂",
        },
        {
          path: "/cart",
          name: "购物车",
          image: "🤣",
        },
        {
          path: "/person",
          name: "个人中心",
          image: "😅",
        },
        {
          path: "/feedback",
          name: "反馈",
          image: "🤗",
        },
        {
          path: "/about",
          name: "关于我们",
          image: "😋",
        },
      ],
    };
  },
  methods: {
    mouseMoveHandle(e) {
      let item = e.target;
      let itemRect = item.getBoundingClientRect();
      let offset = Math.abs(e.clientX - itemRect.left) / itemRect.width;
      let prev = item.previousElementSibling || null;
      let next = item.nextElementSibling || null;
      document.querySelectorAll(".item").forEach((li) => {
        li.style.setProperty("--scale", 1);
      });
      if (prev) {
        prev.style.setProperty(
          "--scale",
          1 + this.scale * Math.abs(offset - 1)
        );
      }
      item.style.setProperty("--scale", 1 + this.scale);
      if (next) {
        next.style.setProperty("--scale", 1 + this.scale * offset);
      }
    },
    mouseLeaveHandle() {
      document.querySelectorAll(".item").forEach((li) => {
        li.style.setProperty("--scale", 1);
      });
    },
    clickHandle(e, index) {
      let currentTarget = e.currentTarget;
      currentTarget.classList.add("loading");
      if (window.location.hash.substring(1) !== this.routers[index].path) {
        this.$router.push(this.routers[index].path);
      }
      setTimeout(() => {
        currentTarget.classList.remove("loading");
      }, 1000);
    },
  },
};
</script>
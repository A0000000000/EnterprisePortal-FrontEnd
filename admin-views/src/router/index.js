import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import('../views/Login.vue'),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/Login.vue'),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import('../views/admin/Index.vue'),
  },
  {
    path: "/managerUser",
    name: "ManagerUser",
    component: () => import('../views/admin/ManagerUser.vue'),
  },
  {
    path: "/soldData",
    name: "SoldData",
    component: () => import('../views/admin/SoldData.vue'),
  },
  {
    path: "/devops",
    name: "Devops",
    component: () => import('../views/admin/Devops.vue'),
  },
  {
    path: "/manager",
    name: "Manager",
    component: () => import('../views/manager/Index.vue'),
  },
  {
    path: "/checkXMZZ",
    name: "CheckXMZZ",
    component: () => import('../views/manager/CheckXMZZ.vue'),
  },
  {
    path: "/dealFeedback",
    name: "DealFeedback",
    component: () => import('../views/manager/DealFeedback.vue'),
  },
  {
    path: "/managerAbout",
    name: "ManagerAbout",
    component: () => import('../views/manager/ManagerAbout.vue'),
  },
  {
    path: "/managerGoods",
    name: "ManagerGoods",
    component: () => import('../views/manager/ManagerGoods.vue'),
  },
  {
    path: "/managerMessage",
    name: "ManagerMessage",
    component: () => import('../views/manager/ManagerMessage.vue'),
  },
  {
    path: "/managerOrder",
    name: "ManagerOrder",
    component: () => import('../views/manager/ManagerOrder.vue'),
  },
  {
    path: "/orderDetails",
    name: "OrderDetails",
    component: () => import('../views/manager/OrderDetails.vue'),
  }
];

const router = new VueRouter({
  routes,
});

export default router;

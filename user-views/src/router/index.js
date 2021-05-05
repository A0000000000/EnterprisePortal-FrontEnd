import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/Shop.vue')
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('../views/Details.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/coupon',
    name: 'Coupon',
    component: () => import('../views/Coupon.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message.vue')
  },
  {
    path: '/messageDetails',
    name: 'MessageDetails',
    component: () => import('../views/MessageDetails.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/person',
    name: 'Person',
    component: () => import('../views/Person.vue')
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('../views/Feedback.vue')
  },
  {
    path: '/location',
    name: 'Location',
    component: () => import('../views/Location.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import('../views/OrderList.vue')
  },
  {
    path: '/orderDetails',
    name: 'OrderDetails',
    component: () => import('../views/OrderDetails.vue')
  },
  {
    path: '/feedbackList',
    name: 'FeedbackList',
    component: () => import('../views/FeedbackList.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    children: [
      {
        path: '/about/',
        component: () => import('../views/about/Introduction.vue')
      },
      {
        path: '/about/introduction',
        component: () => import('../views/about/Introduction.vue')
      },
      {
        path: '/about/miCulture',
        component: () => import('../views/about/Culture.vue')
      },
      {
        path: '/about/civilization',
        component: () => import('../views/about/Civilization.vue')
      },
      {
        path: '/about/joinMi',
        component: () => import('../views/about/JoinMi.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

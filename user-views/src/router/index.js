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
        component: () => import('../views/about/Introduction.vue')
      },
      {
        path: '/about/civilization',
        component: () => import('../views/about/Introduction.vue')
      },
      {
        path: '/about/joinMi',
        component: () => import('../views/about/Introduction.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

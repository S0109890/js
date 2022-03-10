import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('../views/BS-index.vue'),
    children: [
      {
        path: '/home',
        component: () => import('../views/BS-index.vue')
      }
    ]
  },
  {
    path: '/review',
    component: () => import('../views/BS-review.vue')
  },
  {
    path: '/write',
    component: () => import('../views/BS-write.vue')
  },
  {
    path: '*',
    component: () => import('../components/NotFound.vue'),
    meta: { header: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

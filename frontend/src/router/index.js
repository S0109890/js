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
  // {
  //   path: '/review',
  //   component: () => import('../views/BS-review.vue')
  // },
  // {
  //   path: '/regi',
  //   component: () => import('../views/BS-regi.vue'),
  //   meta: { write: false }
  // },
  {
    path: '/mqtt',
    component: () => import('../views/BS-mqtt.vue')
  },
  {
    // path: '*'는 not found route 처리를 위한 것으로 항상 routes 배열 최하단에 위치해 있어야 합니다.
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

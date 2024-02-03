import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/AllLaunchView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'allLaunch',
    component: HomeView
  },
  {
    path: '/launched',
    name: 'launched',
    component: () => import('../views/LaunchedView.vue')
  },
  {
    path: '/unlaunched',
    name: 'unlaunched',
    component: () => import('../views/UnLaunchView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

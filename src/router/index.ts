import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import GameView from '../views/GameView.vue' 
import RegisterView from '../views/RegisterView.vue' 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Game',
    component: GameView  
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView  
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

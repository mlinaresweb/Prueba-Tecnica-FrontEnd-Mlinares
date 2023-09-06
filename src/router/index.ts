import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import GameView from '../views/GameView.vue' 
import RegisterView from '../views/RegisterView.vue' 
import StartPage from '../views/StartPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'start',
    component: StartPage  
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView  
  },
  {
    path: '/game',
    name: 'game',
    component: GameView  
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const clientInfo = localStorage.getItem('client');

  if (to.path === '/register' || to.path === '/game') {
    if (!clientInfo && to.path === '/game') {
      next('/');
    } else {
      next();
    }
  } else if (to.path === '/') {
    if (clientInfo) {
      next('/game');
    } else {
      next();
    }
  } else {
    if (clientInfo) {
      next();
    } else {
      next('/');
    }
  }
});


export default router

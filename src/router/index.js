import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import LogoutPage from '../views/LogoutPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import AllSubscriptions from '../views/AllSubscriptions.vue'
import UserSubscriptions from '../views/UserSubscriptions.vue'
import ErrorPage from '../components/ErrorPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AllSubscriptions,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next();
        } else {
          next({ name: 'ErrorPage' });
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/subscriptions',
      name: 'subscriptions',
      component: AllSubscriptions
    },
    {
      path: '/mysubscriptions',
      name: 'mysubscriptions',
      component: UserSubscriptions,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next();
        } else {
          next({ name: 'ErrorPage' });
        }
      }
    },
    {
      path: '/error',
      name: 'ErrorPage',
      component: ErrorPage
    },
  ]
})

export default router

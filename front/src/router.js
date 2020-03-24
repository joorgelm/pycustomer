import Vue from 'vue'
import Router from 'vue-router'

// pages
import Login from './pages/Login/Login'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },

    { path: '*', redirect: '/' }
  ]
});



export default router
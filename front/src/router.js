import Vue from 'vue'
import Router from 'vue-router'

// pages
import Login from './pages/Login/Login'
import Home from "./pages/Home/Home";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },

    { path: '*', redirect: '/' }
  ]
});



export default router
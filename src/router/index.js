import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Quill from '../components/Quill/Index.vue'
import Prosmirror from '../components/Prosmirror/Index.vue'
import TinyMCE from '../components/TinyMCE/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/quill',
    name: 'Quill',
    component: Quill
  },
  {
    path: '/prosmirror',
    name: 'Prosmirror',
    component: Prosmirror
  },
  {
    path: '/tinyMCE',
    name: 'TinyMCE',
    component: TinyMCE
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

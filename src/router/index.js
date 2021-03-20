import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import BlogDetail from '../views/BlogDetail.vue'
import Blogs from '../views/Blogs.vue'
import BlogEdit from '../views/BlogEdit.vue'
import Manage from "../views/Manage";
import Echarts from "../views/Echarts";
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: "Blogs"}
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage
    },
    {
      path: '/echarts',
      name: 'Echarts',
      component: Echarts
    },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

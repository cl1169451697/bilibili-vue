import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/views/register.vue'
import Login from '@/views/Login.vue'
import Userinfo from '@/views/user/userinfo.vue'
import Redact from '@/views/user/redact.vue'
import Home from '@/views/home/Home.vue'
import Article from '@/views/article/article.vue'
import Editcategory from '@/views/home/editcategory.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    name:'home',
    component:Home,
    meta:{
      keepalive:true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/userinfo',
    name:'userinfo',
    component:Userinfo,
    meta:{
      istoken:true // 必须带有token(有权限)才能访问的页面
    }
  },
  {
    path:'/redact',
    name:'redact',
    component:Redact,
    meta:{
      istoken:true
    }
  },
  {
    path:'/article/:id',
    name:'article',
    component:Article
  },
  {
    path:'/editcategory',
    name:'editcategory',
    component:Editcategory
  }
]

const router = new VueRouter({
  routes,
  // mode:'history'
})

router.beforeEach((to,from,next)=>{
  // 如果没有toen 或者 没有 id , 并且 meta.istoken == true ,才执行判断
  if(!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken == true ){
    router.push('/login')// 就重定向到登录页面
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next() // 否则就放行(因为有些页面不需要 登录 也可以访问)
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Emp from '../components/Emp.vue'
import Sal from '../components/Sal.vue'
import Man from '../components/Man.vue'
import Pro from '../components/Pro.vue'
import Vis from '../components/Vis.vue'
import EmpDetail from '../components/EmpDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/home',
    name:'主页',
    component:Home,
    children:[
      {
        path:'/emp',
        name:'员工管理',
        component:Emp
      },
      {
        path:'/edetail',
        name:'编辑员工',
        component:EmpDetail
      },
      {
        path:'/man',
        name:'经理管理',
        component:Man
      },
      {
        path:'/pro',
        name:'项目管理',
        component:Pro
      },
      {
        path:'/sal',
        name:'工资管理',
        component:Sal
      },
      {
        path:'/vis',
        name:'可视化',
        component:Vis
      },
  ]
  },{
    path:'/',
    name:'Login',
    component:Login
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


const coms = {
  login: () => import('@/views/login/login'),
  layout:() => import('@/views/layout/layout'),
  index: () => import('@/views/index/index'),
  adduser: () => import('@/views/adduser/adduser'),
  users: () => import('@/views/users/users'),
  classlist: () => import('@/views/classlist/classlist'),
  userEdit: () => import('@/views/userEdit/index')
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: coms.login
    },
    {
      path:'/layout',
      name:'layout',
      component:coms.layout,
      redirect:'/layout/index',
      meta:{
        title:'首页'
      },
      children:[
        {
          path:'index',
          name:'index',
          component:coms.index
        },
        {
          path:'adduser',
          name:'adduser',
          component:coms.adduser
        },
        {
          path:'users',
          name:'users',
          meta:{
            title:'用户列表'
          },
          component:coms.users
        },
        {
          path:'classlist',
          name:'classlist',
          component:coms.classlist
        },
        {
          path:'userEdit',
          name:'userEdit',
          component:coms.userEdit
        }

      ]
    }
  ]
})

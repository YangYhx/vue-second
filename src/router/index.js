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
  userEdit: () => import('@/views/userEdit/index'),
  classAdd: () => import('@/views/classlist/addclass'),
  classEdit: () => import('@/views/classlist/classEdit'),
  userDetail: () => import('@/views/users/userDetail'),
  bookslist: () => import('@/views/books/bookslist'),
  Editpass: () => import('@/views/users/Editpass'),
  addSwiper: () => import('@/views/swiper/addswiper')
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
      meta:{title:'首页'},
      children:[
        {
          path:'index',
          name:'index',
          meta:{title:'首界面'},
          component:coms.index
        },
        {
          path:'adduser',
          name:'adduser',
          component:coms.adduser
        },
        {
          path:'userslist',
          name:'userslist',
          meta:{title:'用户列表'},
          component:coms.users
        },
        {
          path:'classlist',
          name:'classlist',
          meta:{title : '分类列表'},
          component:coms.classlist
        },
        {
          path:'userEdit',
          name:'userEdit',
          meta:{title:'修改个人信息'},
          component:coms.userEdit
        },
        {
          path:'classAdd',
          name:'classAdd',
          meta:{title: '添加分类'},
          component:coms.classAdd
        },
        {
          path:'classEdit',
          name:'classEdit',
          component:coms.classEdit
        },
        {
          path:'userDetail',
          name:'userDetail',
          meta:{title:'修改分类'},
          component:coms.userDetail
        },
        {
          path:'bookslist',
          name:'bookslist',
          meta:{title:'书籍列表'},
          component:coms.bookslist
        },
        {
          path:'Editpass',
          name:'Editpass',
          meta:{title:'修改密码'},
          component:coms.Editpass
        },
        {
          path:'addswiper',
          name:'addswiper',
          meta:{title:'添加轮播图'},
          component:coms.addSwiper
        }


      ]
    }
  ]
})

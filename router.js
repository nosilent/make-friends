import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from './src/components/login'
import Register from './src/components/register'
import Page from './src/components/page'
import Msg from './src/components/msg'
import User from './src/components/user'
import List from './src/components/list'
import Journal from './src/components/journal'
import Option from './src/components/option'
import Add from './src/components/add'
import Chat from './src/components/chat'
import Set from './src/components/setting'

export default new VueRouter({
  // mode:'history',
  routes:[
    {path:'/',component: Login},
    {path:'/login',component: Login},
    {path:'/user',component: User},
    {path:'/chat/:account',component: Chat},
    {path:'/register',component: Register},
    {path:'/option',component: Option},
    {path:'/add',component: Add},
    {path:'/setting',component: Set},
    {path:'/page',component: Page,children:[
      {path: 'journal',component:Journal},
      {path: 'msg',component:Msg},
      {path: 'list',component:List}
    ]}
  ]
})
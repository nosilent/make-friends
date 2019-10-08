const Router = require('koa-router')
const action = require('./actions')
const router = new Router()

router
  //获取用户信息
  .get('/api/user/:account',action.userInfo)
  .get('/api/chat_id/:chat_id',action.get_chat_list)
  //登录验证
  .post('/api/login', action.login)
  
  //注册
  .post('/api/register', action.register)
  
  //获取好友列表
  .post('/api/get_friend_list',action.get_friend_list)

  //在线状态改变
  .post('/api/online',action.online)

module.exports = router
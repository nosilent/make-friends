function product(count = 9) {
  let arr = '0123456789'.split('')
  let account = '1'
  for (let i = 0; i < count; i++) {
    account += arr[Math.floor(Math.random() * arr.length)]
  }
  return account
}

function split_friendId(data, account) {
  let arr = []
  for (item of data) {
    let temp = item.friend_id.split('_')
    if (temp[0] !== account) {
      arr.push(temp[0])
    } else {
      arr.push(temp[1])
    }
  }
  return arr
}
module.exports = {
  async userInfo(ctx, next) {
    let {
      account
    } = ctx.params
    await ctx.db(`select * from user where account=?`, [account]).then(res => {
      if (res.length) {
        ctx.body = {
          code: 0,
          userInfo: Object.assign({}, res[0], {
            password: ''
          })
        }
      } else {
        ctx.body = {
          code: 1,
          msg: '未找到该用户'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 1,
        msg: '后台出错,操作失败',
        err
      }
    })
  },
  async login(ctx, next) {
    let {
      account,
      password
    } = ctx.request.body
    await ctx.db(`select * from user where account=? and password=?`, [account, password]).then(async res => {
      if (res.length) {
        await ctx.db(`update user set online=? where account=?`, [0, account]).then(resolve => {
          ctx.body = {
            code: 0,
            msg: '登录成功',
            info: Object.assign({}, res[0], {
              password: ''
            })
          }
        })
      } else {
        ctx.body = {
          code: 1,
          msg: '用户名或密码错误'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 1,
        msg: '后台出错,操作失败',
        err: err
      }
    })
  },
  async register(ctx, next) {
    let keys = Object.keys(ctx.request.body)
    let values = Object.values(ctx.request.body)
    keys.push('account')
    values.push(product())
    await ctx.db(`insert into user (${keys.join(',')}) values(${new Array(keys.length).fill('?').join(',')})`, values).then(res => {
      ctx.body = {
        code: 0,
        msg: '注册成功'
      }
    }).catch(err => {
      ctx.body = {
        code: 1,
        msg: '后台出错,操作失败',
        err
      }
    })
  },
  async online(ctx, next) {
    let {
      account,
      online
    } = ctx.request.body
    await ctx.db(`update user set online=? where account=?`, [online, account]).then(res => {
      console.log('res', res)
      if (res.affectedRows > 0 && res.changedRows > 0) {
        ctx.body = {
          code: 0,
          msg: '更改状态成功'
        }
      } else {
        ctx.body = {
          code: 1,
          msg: '更改状态失败'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 1,
        msg: '后台出错'
      }
    })
  },
  async get_friend_list(ctx, next) {
    let {
      account
    } = ctx.request.body
    await ctx.db(`select friend_id from friend_table where friend_id like '%${account}%'`).then(async res => {
      if (res.length) {
        let value = split_friendId(res, account).join(',')
        await ctx.db(`select * from user where account in (${value})`).then(resolve => {
          ctx.body = {
            code: 0,
            list:resolve
          }
        })
      }
    }).catch(err => {
      console.log('friend err', err)
    })
  }
}
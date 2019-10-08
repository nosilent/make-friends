const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const router = require('./router')
const db = require('./db')

const app = new Koa()
app.use(bodyparser())
app.use(router.routes())
app.context.db = db

const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
app.context.io = io
io.on('connection', client => {
  console.log('client')
  client.on('event', data => {
    io.emit('chat message', msg);
  });
  client.on('add', data => {
    console.log(data, 'dd')
    io.emit('addfriend', data)
  })
  client.on('agree', async data => {
    let keys = Object.keys(data)
    let values = Object.values(data)
    let tem = values.slice().sort().join('_')
    values.push(tem)
    keys.push('friend_id')
    console.log(keys.join(','), new Array(keys.length).fill('?').join(','))
    await db(`insert into friend_table (${keys.join(',')}) values (${new Array(keys.length).fill('?').join(',')})`, values).then(res => {
      io.emit('success',data)
    }).catch(err => {
      console.log('err', err)
    })
  })
  client.on('disconnect', () => {
    console.log('user disconnected')
  });
});
server.listen(3000, () => {
  console.log(3000)
})
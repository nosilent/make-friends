## 数据库连接问题

使用mysql8.0版本，在node中链接数据库时出现以下错误：

` Client does not support authentication protocol requested by server; consider upgrading MySQL client`

原因：由于mysql版本和node中链接数据库时，两者使用密码编码不一致，操作不能正常访问数据库

解决：更新mysql的密码，使其降低到低版本密码编码方式，使密码plugin显示为` mysql_native_password`

```mysql
//修改密码编码方式
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码'
//查看
select host,user,plugin,authentication_string from mysql.user;
```
## babel配置

插件安装：`@babel/preset-env`、`@babel/core`、`babel-plugin-import`、`babel-loader`

### .babelrc

```js
{
    "presets":["@babel/preset-env"],
    "plugins":[]
}
```

### babel-loader使用

```js
//webpack.config.js
module:{
    rules:[
        {test: /\.jsx?$/,loader:'babel-loader',exclude:/(node_modules|bower_components)/}
    ]
}
```

## 在vue组件中使用less

安装插件：`vue-style-loader`、`css-loader`、`less-loader`、`less`

```js
//webpack.config.js
module:{
    rules:[
        {test: /\.less$/,use:['vue-style-loader','css-loader','less-loader']}
    ]
}
```


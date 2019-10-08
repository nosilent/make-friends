<template>
  <div>
    <Icon />
    <a-row type="flex" justify="center" align="middle" class="mt">
      <a-col span="4" class="text-right">账号：</a-col>
      <a-col span="15" offset="1">
        <a-input  placeholder="请输入账号" v-model="account" maxlength='12'/>
      </a-col>
    </a-row>
    <br />
    <a-row type="flex" justify="center" align="middle">
      <a-col span="4" class="text-right">密码：</a-col>
      <a-col span="15" offset="1">
        <a-input placeholder="请输入密码" v-model="password" />
      </a-col>
    </a-row>
    <br />
    <a-row >
      <a-col span="20" offset='2'>
        <a-button block type="primary" size="large" @click='login'>登录</a-button>
      </a-col>
    </a-row>
    <br />
    <a-row >
      <a-col span="20" offset='2'>
        <a-button block type="primary" size="large" @click="$router.push('/register')">注册</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Icon from "./icon";
import { input, button, row, col } from "ant-design-vue";
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods:{
    ...mapMutations(['keep_info']),
    login(){
      if(this.account&&this.password){
        this.$axios.post('/api/login',{
          account: this.account,
          password: this.password
        }).then(res=>{
          console.log(res)
          if(res.data.code){
            this.$message.error(res.data.msg)
          }else{
            this.$message.success(res.data.msg)
            this.keep_info(res.data.info)
            localStorage.setItem('userid',res.data.info.id)
            localStorage.setItem('account',res.data.info.account)
            this.$router.push('/page/list')
          }
        }).catch(err=>{
          this.$message.error('请求出错')
        })
      }else{
        this.$message.warning('用户名或密码不能为空')
      }
    }
  },
  components: {
    Icon,
    aInput: input,
    aButton: button,
    aRow: row,
    aCol: col
  }
};
</script>

<style lang="less" scoped>
.text-right {
  text-align: right;
}
.mt {
  margin-top: 30px;
}
</style>
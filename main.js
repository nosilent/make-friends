import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
import axios from 'axios'
import VueSocket from 'vue-socket.io'
import {
  message
} from 'ant-design-vue'
message.config({
  top: `200px`,
  duration: 2,
  maxCount: 3,
})
Vue.prototype.$axios = axios
Vue.prototype.$message = message
Vue.use(
  new VueSocket({
    debug: true,
    connection: 'http://localhost:3000',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  })
)
import {mapState,mapMutations} from 'vuex'
new Vue({
  el: '.root',
  router,
  store,
  sockets:{
    addfriend(data){
      if(data.addto===this.info.account){
        this.addfriend(data)
      }
    },
    success(data){
      if(this.info.account === data.addto||this.info.account ===data.addfrom){
        let params = this.info.account===data.addto? data.addfrom:data.addto
        this.$axios.get(`api/user/${params}`).then(res=>{
          console.log(res,'addd')
          if(!res.data.code){
            this.change_friend_list(res.data.userInfo)
            this.clear_notify(data)
          }
        })
      }
    }
  },
  computed:{
    ...mapState(['info'])
  },
  watch:{
    info(){
      console.log('info_change')
      this.$axios.post('api/get_friend_list',{account:this.info.account}).then(res=>{
        if(!res.data.code){
          this.init_friend_list(res.data.list)
        }
      }).catch(err=>{
        console.log('err',err)
      })
    }
  },
  methods:{
    ...mapMutations(['addfriend','change_friend_list','clear_notify','init_friend_list'])
  },
  render: c => c(App),
  beforeDestroy() {
    let account = localStorage.getItem("account") || this.info.account;
    if (account) {
      localStorage.clear()
      this.$axios.post("api/online", {
        account,
        online: 1
      }).then(res => {
        console.log('1', res);
      });
    }
  }
})
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
    debug: false,
    connection: 'http://localhost:3000',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  })
)
import {
  mapState,
  mapMutations
} from 'vuex'
new Vue({
  el: '.root',
  router,
  store,
  sockets: {
    addfriend(data) {
      if (data.addto === this.info.account) {
        this.addfriend(data)
      }
    },
    friend_info_update(data) {
      if (this.friend_list.some(item => {
          return item.account === data.account
        })) {
        this.get_friend_list()
      }

    },
    success(data) {
      if (this.info.account === data.addto || this.info.account === data.addfrom) {
        let params = this.info.account === data.addto ? data.addfrom : data.addto
        this.$axios.get(`api/user/${params}`).then(res => {
          if (!res.data.code) {
            this.change_friend_list(res.data.userInfo)
            this.clear_notify(data)
          }
        })
      }
    },
    chat_send(data) {
      if (data.chat_to === this.info.account) {
        this.chat_change({
          target: data.chat_from,
          chat_content: data
        })
      }
    }
  },
  computed: {
    ...mapState(['info', 'friend_list'])
  },
  watch: {
    info() {
      this.get_friend_list()
    }
  },
  methods: {
    ...mapMutations(['addfriend', 'change_friend_list', 'clear_notify', 'init_friend_list', 'chat_change']),
    get_friend_list() {
      this.$axios.post('api/get_friend_list', {
        account: this.info.account
      }).then(res => {
        if (!res.data.code) {
          this.init_friend_list(res.data.list)
        }
      }).catch(err => {})
    }
  },
  render: c => c(App),
  beforeDestroy() {
    let account = this.info.account;
    if (account) {
      this.$axios.post("api/online", {
        account,
        online: 1
      })
    }
  }
})
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {
      info: {},
      friend_list: [],
      chat_list: {},
      addNotify: [],
      option_list: [{
          icon: '/src/icon/near.png',
          text: '附近',
          show: true
        },
        {
          icon: '/src/icon/fun.png ',
          text: '兴趣部落',
          show: false
        },
        {
          icon: '/src/icon/game.png',
          text: '游戏',
          show: false
        },
        {
          icon: '/src/icon/reading.png ',
          text: '阅读',
          show: true
        },
        {
          icon: '/src/icon/play.png ',
          text: '玩一玩',
          show: false
        },
        {
          icon: '/src/icon/look.png ',
          text: '看点',
          show: false
        },
        {
          icon: '/src/icon/video.png',
          text: '视频',
          show: false
        },
        {
          icon: '/src/icon/shopping.png ',
          text: '购物',
          show: false
        },
        {
          icon: '/src/icon/music.png ',
          text: '音乐',
          show: false
        },
        {
          icon: '/src/icon/sport.png',
          text: '运动',
          show: false
        },
        {
          icon: '/src/icon/eat.png ',
          text: '吃喝玩乐',
          show: false
        },
        {
          icon: '/src/icon/support.png ',
          text: '同城服务',
          show: false
        }
      ]
    }
  },
  getters:{
    photo(state){
      return  state.info.photo
    },
    description(state){
        return state.info.description
    }
  },
  mutations: {
    keep_info(state, value) {
      state.info = value
    },
    change(state, index) {
      let show = state.option_list[index].show
      state.option_list[index].show = !show
    },
    addfriend(state, value) {
      state.addNotify.unshift(value)
    },
    change_friend_list(state, value) {
      state.friend_list.push(value)
    },
    init_friend_list(state, value) {
      state.friend_list = value
    },
    clear_notify(state, value) {
      state.addNotify.splice(state.addNotify.indexOf(value), 1)
    },
    chat_change(state, data) {
      let key = '_' + data.target
      if (state.chat_list.hasOwnProperty(key)) {
        if(Array.isArray(data.chat_content)){
          state.chat_list[key] = data.chat_content
        }else{
          state.chat_list[key].push(data.chat_content)
        }
      } else {
        if (Array.isArray(data.chat_content)) {
          state.chat_list = Object.assign({}, state.chat_list, {
            [key]: [...data.chat_content]
          })
        } else {
          state.chat_list = Object.assign({}, state.chat_list, {
            [key]: [data.chat_content]
          })
        }
      }
    },
    logout(state){
      state.addNotify = []
      state.info = {}
      state.friend_list = []
      state.chat_list = {}
    },
    info_photo_change(state,value){
      Vue.set(state.info,'photo','/src/icon/'+value+'.png')
    },
    info_description_change(state,value){
      Vue.set(state.info,'description',value)
    },
    set_photo(state,value){
      Vue.set(state.info,'photo',value)
    },
    set_description(state,value){
      Vue.set(state.info,'description',value)
    }
  }
})
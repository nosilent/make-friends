<template>
  <div>
    <div class="navbar">
      {{title}}
      <div class="photo" @click="$router.push('/user')">
        <img :src="avatar" alt="头像" />
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
    <div class="tabbar">
      <div v-for="item in tab" :key="item.path" @click="clickHandle(item)">
        <img :src="item.activeIcon" alt v-if="item.path===active" />
        <img :src="item.icon" alt v-else />
        <p>{{item.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { list, card, row, col } from "ant-design-vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "",
      active: "",
      avatar: "/src/icon/default.png",
      tab: [
        {
          title: "消息",
          path: "/page/msg",
          text: "消息",
          icon: "/src/icon/msg.png",
          activeIcon: "/src/icon/msg-active.png"
        },
        {
          title: "联系人",
          path: "/page/list",
          text: "联系人",
          icon: "/src/icon/Contacts.png",
          activeIcon: "/src/icon/Contacts-active.png"
        },
        {
          title: "动态",
          path: "/page/journal",
          text: "动态",
          icon: "/src/icon/journal.png",
          activeIcon: "/src/icon/journal-active.png"
        }
      ]
    };
  },
  computed: {
    ...mapState(["info"])
  },
  created() {
    if (location.hash) {
      this.active = location.hash.slice(1);
      this.tab.forEach(item => {
        if (item.path === this.active) {
          this.title = item.title;
        }
      });
    } else if (location.pathname) {
      this.active = location.pathname;
      this.tab.forEach(item => {
        if (item.path === this.active) {
          this.title = item.title;
        }
      });
    }
    if (this.info.photo) {
      this.avatar = this.info.photo;
    }
  },
  methods: {
    offline() {
      let account = this.info.account;
      if (account) {
        this.$axios.post("api/online", { account, online: 1 }).then(res => {
        });
      }
    },
    clickHandle(item) {
      if (this.active === item.path) return;
      this.active = item.path;
      this.title = item.title;
      this.$router.push(item.path);
    },
    notify(){
      this.$socket.on('addfriend',data=>{
      })
    }
  },
  components: {
    aCard: card,
    aList: list,
    aListItem: list.Item,
    aCol: col,
    aRow: row
  }
};
</script>

<style lang="less" scoped>
.navbar {
  height: 45px;
  background: #1890ff;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 9999;
  text-align: center;
  line-height: 45px;
  font-size: 16px;
  .photo {
    position: absolute;
    display: flex;
    align-items: center;
    left: 15px;
    top: 50%;
    height: 40px;
    width: 40px;
    margin-top: -20px;
    border-radius: 20px;
    img {
      height: 100%;
      vertical-align: middle;
    }
  }
}
.container {
  padding-top: 45px;
  padding-bottom: 45px;
}
.tabbar {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  border-top: 1px solid #ccc;
  padding-bottom: 5px;
  background: #fff;

  div {
    text-align: center;
    flex: 1;
    p {
      margin-bottom: 0;
    }
  }
  img {
    height: 24px;
  }
}
</style>
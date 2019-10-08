<template>
  <div>
    <div class="add">
      <img src="/src/icon/watch.png" alt />
      <img src="/src/icon/add.png" alt />
    </div>
    <div class="content">
      <a-list :dataSource="addNotify" v-if="addNotify.length">
        <a-list-item slot="renderItem" slot-scope="item" class="item">
          <a slot="actions" @click="clickhandle('agree',item)">同意</a>
          <a slot="actions" @click="clickhandle('refuse',item)">拒绝</a>
          <a-list-item-meta title="好友请求通知" :description="'账号:'+item.addfrom+' 请求添加好友'">
            <a-avatar slot="avatar" src="/src/icon/notify.png" />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <a-list :dataSource="msg_list">
        <a-list-item slot-scope="item" slot="renderItem" @click='chat(item.to)'>
          <a-list-item-meta :description="item.msg">
            <div slot="title">{{item.username}}</div>
            <a-avatar slot="avatar" :src="item.photo?item.photo:'/src/icon/default.png'"></a-avatar>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { list, avatar } from "ant-design-vue";
export default {
  components: {
    aList: list,
    aListItem: list.Item,
    aListItemMeta: list.Item.Meta,
    aAvatar: avatar
  },
  computed: {
    ...mapState(["addNotify", "chat_list", "info", "friend_list"]),
    msg_list() {
      let keys = Object.keys(this.chat_list);
      let arr = [];
      keys.forEach(item => {
        let photo = null;
        let username = 12331;
        this.friend_list.forEach(i => {
          if (i.account == item.slice(1)) {
            photo = i.photo;
            username = i.username;
          }
        });
        arr.push({ ...this.chat_list[item].slice(-1)[0], photo, username,to:item.slice(1) });
      });
      return arr;
    }
  },
  // filters: {
  //   target(account) {
  //     for (let item of this.friend_list) {
  //       if (item.account === account) {
  //         return { photo: item.photo, username: item.username };
  //       }
  //     }
  //   }
  // },
  methods: {
    ...mapMutations(["clear_notify"]),
    clickhandle(flag, data) {
      if (flag === "agree") {
        this.$socket.emit("agree", data);
      } else {
        this.clear_notify(data);
      }
    },
    target(account) {
      for (let item of this.friend_list) {
        if (item.account === account) {
          return { photo: item.photo, username: item.username };
        }
      }
    },
    chat(path){
      this.$router.push(`/chat/${path}`)
    }
  }
};
</script>

<style lang='less' scoped>
.add {
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 10000;
}
.content {
  padding: 0 10px;
  word-break: break-all;
}
.ant-list-item-meta-description{
  max-height: 1.5rem;
  overflow: hidden;
}
</style>
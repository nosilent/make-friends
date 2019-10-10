<template>
  <div>
    <navbar>
      <template #title>{{chat_target.username}}</template>
      <template #icon>
        <img src="/src/icon/arrow-left.png" alt="头像" @click="$router.back(-1)" />
      </template>
    </navbar>
    <div class="content">
      <ul>
        <li v-for="item of chat_msg" :key="item.time">
          <p v-if="item.chat_from===info.account" class="right">
            <span class="msg">
              <span>{{item.msg}}</span>
            </span>
            <img :src="info.photo?info.photo:'/src/icon/default.png'" alt />
          </p>
          <p v-else class="left">
            <img :src="chat_target.photo?chat_target.photo:'/src/icon/default.png'" alt />
            <span>{{item.msg}}</span>
          </p>
        </li>
      </ul>
    </div>
    <a-input
      placeholder="输入内容"
      size="large"
      class="chat_input"
      v-model="chat_content"
      @pressEnter="send"
      v-focus
    />
  </div>
</template>

<script>
import navbar from "./navbar";
import { mapState, mapMutations } from "vuex";
import { input, list, avatar } from "ant-design-vue";
export default {
  data() {
    return {
      chat_content: ""
    };
  },
  created() {
    this.chat_list_init();
  },
  directives:{
    focus:{
      inserted(el){
        el.focus()
      }
    }
  },
  computed: {
    ...mapState(["friend_list", "info", "chat_list"]),
    chat_target() {
      for (let item of this.friend_list) {
        if (item.account === this.$route.params.account) {
          return { username: item.username, photo: item.photo };
        }
      }
    },
    chat_msg() {
      let key = "_" + this.$route.params.account;
      return this.chat_list[key];
    }
  },
  components: {
    navbar,
    aInput: input,
    aList: list,
    aListItem: list.Item,
    aListItemMeta: list.Item.Meta,
    aAvatar: avatar
  },
  methods: {
    ...mapMutations(["chat_change"]),
    chat_list_init() {
      let chat_id = [this.$route.params.account, this.info.account]
        .sort()
        .join("_");
      this.$axios.get(`/api/chat_id/${chat_id}`).then(res => {
        if (!res.data.code) {
          this.chat_change({
            chat_content: res.data.chat_content,
            target: this.$route.params.account
          });
        }
      });
    },
    send() {
      let data = {
        chat_id: [this.info.account, this.$route.params.account]
          .sort()
          .join("_"),
        time: new Date().getTime(),
        chat_from: this.info.account,
        chat_to: this.$route.params.account,
        msg: this.chat_content
      };
      this.$socket.emit("chat", data);
      this.chat_change({
        target: this.$route.params.account,
        chat_content: data
      });
      this.chat_content = "";
    }
  }
};
</script>

<style lang='less' scoped>
.chat_input {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
}
.content {
  padding: 45px 0;
  position: relative;
  overflow-y: auto;
}
ul {
  list-style: none;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  li {
    p {
      align-items: start;
      display: flex;
      word-break: break-all;
      &.right {
        justify-content: flex-end;
        img {
          margin-left: 10px;
        }
      }
      &.left {
        justify-content: flex-start;
        img {
          margin-right: 10px;
        }
        span {
          padding-right: 40px;
        }
      }
      .msg {
        display: flex;
        justify-content: flex-end;
        span {
          padding-left: 40px;
        }
      }
    }
  }
}
</style>
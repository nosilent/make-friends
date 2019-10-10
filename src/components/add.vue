<template>
  <div>
    <navbar>
      <template #title>添加</template>
      <template #icon>
        <img src="/src/icon/arrow-left.png" alt @click="$router.back(-1)" />
      </template>
    </navbar>
    <div class="conainer">
      <a-input-search
        placeholder="input search text"
        @search="search"
        size="large"
        v-model="search_account"
      />
      <br />
      <transition name="slide" mode="in-out">
        <a-list v-if="search_info">
          <a-list-item>
            <a-list-item-meta
              :title="'用户名:'+search_info.username"
              :description="'账号:'+search_info.account"
            >
              <a-avatar slot="avatar" :src="search_info.photo?info.photo:'/src/icon/default.png'" />
            </a-list-item-meta>
            <a-avatar src="/src/icon/add-2.png" v-if="show" @click="add(search_info.account)" />
          </a-list-item>
        </a-list>
      </transition>
    </div>
  </div>
</template>

<script>
import navbar from "./navbar";
import socket from "socket.io-client";
import { input, list, avatar } from "ant-design-vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      search_account: "",
      search_info: ""
    };
  },
  components: {
    navbar,
    aInputSearch: input.Search,
    aList: list,
    aListItem: list.Item,
    aListItemMeta: list.Item.Meta,
    aAvatar: avatar
  },
  computed: {
    ...mapState(["info", "friend_list"]),
    show() {
      return (
        this.info.account !== this.search_info.account &&
        this.friend_list.every(item => {
          return item.account !== this.search_info.account;
        })
      );
    }
  },
  methods: {
    search() {
      if (this.search_account) {
        this.$axios.get(`api/user/${this.search_account}`).then(res => {
          if (res.data.code) {
            this.$message.warning(res.data.msg);
          } else {
            this.search_info = res.data.userInfo;
            this.search_account = "";
          }
        });
      }
    },
    add(add_account) {
      this.show = false;
      this.$socket.emit("add", {
        addfrom: this.info.account || "000000000",
        addto: add_account
      });
    }
  }
};
</script>

<style lang='less' scoped>
.conainer {
  padding: 50px 10px;
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
</style>
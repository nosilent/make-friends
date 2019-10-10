<template>
  <div>
    <navbar>
      <template #title>个人信息</template>
      <template #icon>
        <img src="/src/icon/arrow-left.png" alt="头像" @click="$router.back(-1)" />
      </template>
    </navbar>
    <a-card hoverable class="content">
      <template class="ant-card-actions" slot="actions">
        <span @click="alert">退出登录</span>
        <a-icon type="edit" @click="$router.push('/setting')"/>
      </template>
      <a-card-meta :title="info.username" :description="info.description">
        <a-avatar slot="avatar" :src="info.photo" />
      </a-card-meta>
    </a-card>
    <a-modal  
    :visible="visible" 
    @ok="handleOk" 
    :confirmLoading="confirmLoading" 
    @cancel="handleCancel"
    cancelText = '取消'
    okText='退出'
    >
      <p>确认退出</p>
    </a-modal>
  </div>
</template>

<script>
import navbar from "./navbar";
import { list, card, icon, avatar, modal } from "ant-design-vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      visible: false,
      confirmLoading: false
    };
  },
  components: {
    navbar,
    aList: list,
    aListItem: list.Item,
    aCard: card,
    aCardMeta: card.Meta,
    aIcon: icon,
    aAvatar: avatar,
    aModal: modal
  },
  computed: {
    ...mapState(["info"])
  },
  methods: {
    ...mapMutations({
      out: "logout"
    }),
    alert() {
      this.visible = true;
    },
    handleOk() {
      this.out();
      this.$router.push("/");
    },
    handleCancel(){
      this.visible = false
    }
  }
};
</script>

<style lang='less' scoped>
.content {
  padding-top: 45px;
}
</style>
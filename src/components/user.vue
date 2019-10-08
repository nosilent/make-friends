<template>
  <div>
    <navbar>
      <template #title>个人信息</template>
      <template #icon>
        <img src="/src/icon/arrow-left.png" alt='头像' @click="$router.back(-1)" />
      </template>
    </navbar>
      <a-card hoverable class="content">
        <template class="ant-card-actions" slot="actions">
          <a-icon type="setting" />
          <a-icon type="edit" />
          <a-icon type="ellipsis" />
        </template>
        <a-card-meta :title="info.username" :description="info.description">
          <a-avatar
            slot="avatar"
            :src="info.photo"
          />
        </a-card-meta>
      </a-card>
  </div>
</template>

<script>
import navbar from "./navbar";
import { list, card, icon, avatar } from "ant-design-vue";
import { mapState } from 'vuex'
export default {
  components: {
    navbar,
    aList: list,
    aListItem: list.Item,
    aCard: card,
    aCardMeta: card.Meta,
    aIcon: icon,
    aAvatar: avatar,
  },
  computed:{
    ...mapState(['info'])
  }
};
</script>

<style lang='less' scoped>
.content {
  padding-top: 45px;
}

</style>
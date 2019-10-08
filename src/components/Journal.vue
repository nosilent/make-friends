<template>
  <div>
    <div class="option" @click="$router.push('/option')">
      <img src="/src/icon/option.png" alt />
    </div>
    <a-list class="shaky">
      <a-list-item class="list-item ">
        <a-avatar :src="shared.icon" />
        <div class="text">
          <span>{{shared.text}}</span>
          <a-icon type="right" />
        </div>
      </a-list-item>
    </a-list>
    <a-list :dataSource="option_list">
      <a-list-item slot="renderItem" slot-scope="item" class="list-item" v-if="item.show">
        <a-avatar :src="item.icon" />
        <div class="text">
          <span>{{item.text}}</span>
          <a-icon type="right" />
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { list, avatar, icon } from "ant-design-vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      shared: { text: "好友动态", icon: "/src/icon/room.png" }
    };
  },
  computed: {
    ...mapState(["option_list"])
  },
  components: {
    aList: list,
    aListItem: list.Item,
    aListItemMeta: list.Item.Meta,
    aAvatar: avatar,
    aIcon: icon
  }
};
</script>

<style lang='less' scoped>
.option {
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 10000;
}
.shaky{
  &::after {
    content: '';
    display: block;
    height: 10px;
    width: 100%;
    background: #ddd;
  }
}
.list-item {
  padding-left: 20px;
  align-items: center;
  .text {
    margin-left: 20px;
    display: flex;
    flex: 1;
    font-size: 16px;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
  }
}
</style>
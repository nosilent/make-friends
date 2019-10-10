<template>
  <div>
    <div @click="$router.push('/add')" class="addfriend">
      <img src="/src/icon/addfriend.png" alt />
    </div>
    <a-list :dataSource='friend_list' class='content'>
      <a-list-item slot-scope="item" slot="renderItem" @click='chat(item)'>
        <a-list-item-meta :title='item.username' :description='item.description'>
          <a-avatar slot='avatar' :src='item.photo?item.photo:"/src/icon/default.png"'></a-avatar>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import {list,avatar} from 'ant-design-vue'
import {mapState} from 'vuex'
export default {
  components:{
    aList:list,
    aListItem: list.Item,
    aListItemMeta: list.Item.Meta,
    aAvatar: avatar
  },
  computed:{
    ...mapState(['friend_list'])
  },
  methods:{
    chat(item){
      this.$router.push(`/chat/${item.account}`)
    }
  }
};
</script>

<style lang="less" scoped>
.addfriend {
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 10000;
}
.content{
  padding: 0 10px;
}
.ant-list-item-meta-description{
  max-height: 1.5rem;
  overflow: hidden;
}
</style>
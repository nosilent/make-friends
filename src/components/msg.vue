<template>
  <div>
    <div class="add">
      <img src="/src/icon/watch.png" alt />
      <img src="/src/icon/add.png" alt />
    </div>
    <div class="content">
      <a-list :dataSource="addNotify" v-if="addNotify.length">
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions" @click='clickhandle("agree",item)'>同意</a>
          <a slot="actions" @click='clickhandle("refuse",item)'>拒绝</a>
          <a-list-item-meta title="好友请求通知" :description="'账号:'+item.addfrom+' 请求添加好友'">
            <a-avatar slot='avatar' src='/src/icon/notify.png'/>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { list,avatar } from "ant-design-vue";
export default {
  components: {
    aList: list,
    aListItem: list.Item,
    aListItemMeta: list.Item.Meta,
    aAvatar: avatar
  },
  computed: {
    ...mapState(["addNotify"])
  },
  methods:{
    ...mapMutations(['clear_notify']),
    clickhandle(flag,data){
      if(flag==='agree'){
        this.$socket.emit('agree',data)
      }else{
        this.clear_notify(data)
      }
    }
  }
};
</script>

<style >
.add {
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 10000;
}
.content {
  padding: 0 10px;
}
</style>
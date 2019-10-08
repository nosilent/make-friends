<template>
  <div>
    <navbar>
      <template v-slot:title>动态页设置</template>
      <template v-slot:icon>
        <img src="/src/icon/arrow-left.png" alt @click="$router.back(-1)" />
      </template>
    </navbar>
    <a-list :dataSource="option_list" class="list">
      <a-list-item slot="renderItem" slot-scope="item,index" class="list-item">
        <a-avatar :src="item.icon" />
        <div class="text">
          <span>{{item.text}}</span>
          <label :class="{select:item.show}" @click.self="change(index)">
            <input type="checkbox" hidden>
          </label>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import navbar from "./navbar";
import { list, avatar } from "ant-design-vue";
import { mapState, mapMutations } from "vuex";
export default {
  created() {},
  computed: {
    ...mapState(["option_list"])
  },
  components: {
    navbar,
    aList: list,
    aListItem: list.Item,
    aAvatar: avatar
  },
  methods:{
    ...mapMutations(['change'])
  }
};
</script>

<style lang='less' scoped>
.list {
  padding-top: 45px;
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
    label {
      height: 20px;
      width: 40px;
      background: #ccc;
      border-radius: 10px;
      position: relative;
      border: 1px solid #ccc;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        height: 18px;
        width: 18px;
        margin-top: -9px;
        background: #fff;
        border-radius: 9px;
      }
    }
  }
  .select {
    background:#1890ff !important;
    &::before {
      right: 0;
    }
  }
}
</style>
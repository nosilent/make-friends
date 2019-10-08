<template>
  <a-row>
    <a-col :span="18" offset="3" class="col">
      <img src="../icon/friends.png" alt />
    </a-col>
  </a-row>
</template>

<script>
import { col, row } from "ant-design-vue";
export default {
  components: {
    aCol: col,
    aRow: row
  }
};
</script>

<style lang='less' scoped>
  .col{
    text-align: center;
    margin-top:20px;
  }
</style>
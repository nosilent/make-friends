<template>
  <div @click="$router.push('/add')" class="addfriend">
    <img src="/src/icon/addfriend.png" alt />
  </div>
</template>

<script>
export default {
  created() {}
};
</script>

<style lang="less" scoped>
.addfriend {
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 10000;
}
</style>
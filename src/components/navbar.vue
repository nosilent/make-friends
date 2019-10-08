<template>
  <div class="navbar">
    <slot name="title"></slot>
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.navbar {
  height: 45px;
  background: #1890ff;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  text-align: center;
  line-height: 45px;
  font-size: 16px;
  .icon{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 15px;
    top: 50%;
    height: 40px;
    width: 40px;
    margin-top: -20px;
    border-radius: 20px;
  }
  .extra {
    position: absolute;
    top: 5px;
    right: 10px;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
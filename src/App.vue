<template>
  <div id="app">
    <!-- keep-alive 代表当前页面不会被销毁,比如选中table栏2, 点进去之后,出来就回到table1的位置了 -->
    <keep-alive>
      <router-view  v-if="$route.meta.keepalive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<style lang="scss">
body{
  margin: 0vw;
  padding: 0vw;
  box-sizing: border-box;
  background-color: #fff;
  box-sizing: border-box;
}
p{
  margin: 0vw;
  padding: 0vw;
}
.categorytab .van-sticky--fixed{
      position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
    width: 100%;
}
.van-sticky{
  width: 85%;
}
</style>

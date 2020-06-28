<template>
  <div>
      <div class="LoginTap">
        <div></div>
        <div>{{middleTap}}</div>
        <div>
          <slot name="right"></slot>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['middleTap']

}
</script>

<style lang="scss">
.LoginTap{
    height: 12.5vw;
    display: flex;
    background-color: #fff;
    div{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4.444vw;// 适配移动端 插件px-to-vw  使用方法:alt + z
    }
}
</style>
<template>
  <div class="top" >
      <div class="baner" @click="bannerClick">
              <span>{{left}}</span>
              <span>
                  <slot name="right"></slot>
              </span>
      </div>
  </div>
</template>

<script>
export default {
    props:['left'],
    methods:{
        bannerClick(){ // 在子组件里 给 没行 绑定一个点击事件, 并且把这个事件传递到父组件中
            this.$emit('bannerClick')
        }
    }
}
</script>

<style lang="scss" scoped>

.baner{
    padding: 4.167vw 3.2vw;
    background-color: #fff;
    border-bottom: 0.278vw solid #eee;
    font-size: 3.889vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #505050;
}
</style>
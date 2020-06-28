<template>
    <div class="btnparent">
        <div class="loginBtn" @click="registerClick">{{btnitem}}</div>
    </div>
</template>

<script>
export default {
    props:['btnitem'],
    methods:{
        registerClick(){// 1. 当子组件点击的时候
            this.$emit('registerSumber')// 2. 像父元素发送一个自定义事件
        }
    }
}
</script>

<style lang="scss" scoped>
.btnparent{
    padding: 4.167vw 2.778vw;
}
.loginBtn{
    height: 12.5vw;
    background-color: #ffa9b5;
    color: #fff;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
    border-radius: 2.778vw;
}
</style>
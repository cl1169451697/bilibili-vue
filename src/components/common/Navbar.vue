<template>
  <div class="navbar">
      <div class="logo" @click="$router.push('/')">
          <img src="@/assets/logo.png" alt="">
      </div>
      <div>
          <p>
              请输入内容
              <van-icon class="ipt_icon" name="search" />
          </p>
      </div>
      <div>
          <img :src="imgUrl" alt="" v-if="imgUrl" @click="$router.push('/userinfo')">
          <img src="@/assets/default_img.jpg" alt="" v-else @click="$router.push('/login')">
          <p>下载app</p>
      </div>
  </div>
</template>

<script>
export default {
 props:['userInfo'],
 data(){
     return{
         imgUrl:''
     }
 },
 // 页面初始化完成后
async mounted(){
     if(localStorage.getItem('token')){
         const res = await this.$http.get('/user/' + localStorage.getItem('id'))
         this.imgUrl = res.data[0].user_img
     }
 }
}
</script>

<style lang="scss" scoped>
.navbar{
    height: 12.5vw;
    background-color: #fff;
    display: flex;
    .logo{
        width: 27.778vw;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 90%;
        }
    }
    div:nth-child(2){
        flex: 1;
        display: flex;
        align-items: center;
        margin: 0vw 2.778vw 0vw 0vw;
        p{
            position: relative;
            font-size: 3.333vw;
            background-color: #f4f4f4;
            height: 6.944vw;
            line-height: 7.5vw;
            width: 90%;
            padding-left:6.944vw;
            border-radius: 2.778vw;
            color: #aaa;
            .ipt_icon{
                position: absolute;
                top: 50%;
                left: 2.222vw;
                transform: translate(0,-43%);
                color: #aaa;
            }
        }
    }
    div:nth-child(3){
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 6.667vw;
            height: 6.667vw;
            border-radius: 50%;
        }
        p{
            padding: 0.833vw 2.778vw;
            margin: 0vw 2.222vw;
            background-color: #fb7299;
            font-size: 3.611vw;
            border-radius: 0.833vw;
            color: #fff;
        }
    }
}
</style>
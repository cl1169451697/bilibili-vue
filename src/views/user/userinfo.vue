<template>
  <div class="userdetail">
      <nav-Bar :userInfo="userList"></nav-Bar>
      <div class="baner">
          <img class="user_img" src="@/assets/bannerTop_new.png" alt="">
      </div> <!--           把数据 传到子组件 ,进行渲染 -->
      <user-Detail :userInfo="userList"></user-Detail>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
import userDetail from '@/components/userComponent/userDetail.vue'
export default {
    data(){
        return{
            userList:{},
        }
    },
    components:{
        'nav-Bar':Navbar,
        'user-Detail':userDetail
    },
    created(){
        this.Userget()
        this.getCollect()
        // // 收藏 记录               // 把数据传到子组件,进行渲染
        // let sclist = JSON.parse(localStorage.getItem('sclist')) 
        // this.sclist = sclist
        // // 关注 记录
        // let gzlist = JSON.parse(localStorage.getItem('gzlist')) 
        // this.gzlist = gzlist
        
    },
    methods:{
       async Userget(){
           // 获取 缓存
           let id = localStorage.getItem('id')
           let objtoken = localStorage.getItem('token')// 获取缓存token
            // 根据id获取当前的用户信息
          const res = await  this.$http.get('/user/'+id)
          this.userList = res.data[0]
        },
        async getCollect(){
            if(localStorage.getItem('token')){
                const res = await this.$http.get('/collection/'+localStorage.getItem("id"))
                console.log(res,66);
                
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.userdetail{
    .baner{
        width: 100vw;
        height: 24vw;
        overflow: hidden;
        img{
            width: 100vw;
            height: 34.66667vw;
        }
    }
}
</style>
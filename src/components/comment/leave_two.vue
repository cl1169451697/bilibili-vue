<template>
  <div class="leave_two">
       <div class="leave">
      <div class="leave_user" v-for="(item,index) in commentChild" :key="index">
          <div class="user_info">
              <div>
                  <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
                  <img v-else src="@/assets/default_img.jpg" alt="">
              </div>
              <div>
                  <span v-if="item.userinfo">{{item.userinfo.name}}</span>
                  <span v-else>此用户无姓名</span>
                  <span  v-if="item.comment_date">{{item.comment_date}}</span>
              </div>
          </div>
          <div class="title">2.1万</div>
          <!-- 二级评论 回复 -->
          <div class="pl" v-if="!temp">{{item.comment_content}} <span class="hf" @click="PostItem2(item.comment_id)">回复</span></div>
          <div class="pl" v-else> 回复 <a class="name_it" href="javascript:;">{{item.parent_user_info.name}} </a>
               : {{item.comment_content}}
               <span class="hf" @click="PostItem2(item.comment_id)">回复</span> </div>
         <!--  vue  自带的递归  三级 四级 五级... 评论-->          <!--   -->
         <commentchild-item :commentChild="item.child" :temp="true" @postChild="postchild"></commentchild-item>
      </div>
  </div>
  </div>
</template>

<script>

export default {
name:'commentchildItem',// vue自带的  递归 
props:['commentChild','temp'],
created(){
    // console.log(this.commentChild);
    
},
/* 思路 子组件leave_two 像 父组件leave 发送评论 , 父组件 再像  文章页acticle  发送评论   然后赋值到 parent_id
    这里:  使用递增 的方法  

*/
methods:{
    // 所有评论绑定一个 回复 点击事件
    PostItem2(id){
        this.$emit('postChild',id) // 触发自自定义事件 ,  发送到id 到  四级 或者 三级,(这里看用户点击回复的是几级) 递增

        this.$emit('PostPublist',id)// 触发一个自定义事件 , 并且把id 发送到  leave 父组件中
        // console.log(id);
        
    },
    // 三级, 四级, 五级 .... 所有用vue自带递归出来的组件里的     回复 功能
    postchild(id){
        this.PostItem2(id)// 调用  回复点击事件  

        this.$emit('PostPublist',id)// 触发一个自定义事件 , 并且把id 发送到  leave 父组件中
        
    }
}
}
</script>

<style lang="scss">
.leave_two{
    // padding-left: 20px;
    box-sizing: border-box;
}
.leave_user{
    border: none;
}
.leave .leave_user {
    border-bottom: none;
}
.name_it{
    color: #5090cc;
}
.pl{
    position: relative;
}
.hf{
    position: absolute;
    right: 0;
    color: red;
}
</style>
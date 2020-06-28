<template>
  <div class="leave">
      <div class="leave_user" v-for="(item,index) in commentList" :key="index">
          <div class="user_info">
              <div>
                  <img v-if="item.userinfo" :src="item.userinfo.user_img" alt="">
                  <img v-else src="@/assets/default_img.jpg" alt="">
              </div>
              <div>
                  <span v-if="item.userinfo">{{item.userinfo.name}}</span>
                  <span v-else>此用户无姓名</span>
                  <span  v-if="item.comment_date">{{item.comment_date}}</span>
              </div>
          </div>
          <div class="title">2.1万</div>
          <div class="pl">{{item.comment_content}} <span class='hf' @click="publisClick(item.comment_id)">回复</span> </div>
          <!-- 评论组件 -->                        <!-- 监听 leave_two组件传来的事件 -->
            <leave-Two :commentChild="item.child" @PostPublist="publisClick"></leave-Two>
      </div>
  </div>
</template>

<script>
import leaveTwo from '@/components/comment/leave_two.vue'
export default {
    data(){
        return{
            commentList:null
        }
    },
    components:{
        'leave-Two':leaveTwo
    },
    created(){
        this.leaveList()
    }, 
    methods:{
        // 评论请求
       async leaveList(){
            let id = this.$route.params.id
            const res = await this.$http.get('/comment/'+ id)
            const comment =  this.changCcomments(res.data) // 2. 把请求到的数据, 传入到递归函数中进行处理
            this.commentList = comment // 3. 然后把处理好的数据 传到 data中
            
            // 获取评论的长度, 传递来 父组件中
            if(res.data){
                this.$emit('lengthselect',res.data.length)
            }
        },
        //1.使用 递归 改造后的数据
        changCcomments(data){
            function fn(temp){
                let arr1 = []
                for(var i = 1; i < data.length; i++){
                    if(data[i].parent_id == temp){
                        arr1.push(data[i]);
                        data[i].child = fn(data[i].comment_id)
                    }
                }
                return arr1
            }
            return fn(null)
        },
        // 接受 leave_two组件 , 传来的事件 和 id
        publisClick(id){
            this.$emit('publisClick',id)// 触发一个事件, 携带一级评论的 id  文章页监听这个事件
        }
    }
}
</script>

<style lang="scss">
.leave{
        padding: 3.2vw;
    .leave_user{
       position: relative;
       margin: 5px 0px;
        .user_info{
            display: flex;
            div:nth-child(1){
                width: 30px;
                height: 30px;
                margin-right: 10px;
                img{
                   padding-top: 5px;
                   width: 100%;
                   height: 100%;
                   border-radius: 50%;
                }
            }
            div:nth-child(2){
                display: flex;
                flex-direction: column;
                font-size: 3.46667vw;
                color: #757575;
                span:nth-child(1){
                    margin-bottom: 5px;
                }
            }
        }
        .title{
            position: absolute;
            right: 0;
            top:8px;
             font-size: 3.46667vw;
             color: #757575;
             display: flex;
             justify-content: center;
             align-items: center;
        }
        .pl{
            padding:0px 0px 10px 38px;
            margin-top: 2.4vw;
            font-size: 3.46667vw;
            color: #212121;
            
        }
    }
}
.leave{
    div:last-child{
        // border-bottom:1px solid #ccc;

        }
}
</style>
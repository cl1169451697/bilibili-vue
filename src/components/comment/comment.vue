<template>
  <div>
     <div class="comment">
         <div class="conment_item">
             <span>评论</span>
             <span>({{dataLength}})</span>
         </div>
         <div class="conment_geren">
             <div>
                 <img :src="myuser.user_img" alt="" v-if="myuser">
                 <img src="@/assets/default_img.jpg" alt="" v-else>
             </div>
             <input  v-model="value" ref="Postipt" type="text" placeholder="说点什么吧" >
             <button @click="foucusInput">发表111</button>
         </div>
     </div>
  </div>
</template>

<script>
export default {
    props:['dataLength'],
    data(){
        return{
            myuser:{},
            value:''
        }
    },
    created(){
       if(localStorage.getItem('token')){
            this.myuserinfo()
       }
    },
    methods:{
        async myuserinfo(){
            const res = await this.$http.get('/user/'+ localStorage.getItem('id'))
            this.myuser = res.data[0]
        },
        // 如果没有 token  就不允许评论
        foucusInput(){
            if(!this.myuser && !localStorage.getItem('token') && !localStorage.getItem('id')){
                this.$msg.fail('请先登录~~')
                return
            }
            this.$emit('postComent',this.value) // 触发一个自定义事件, 携带一个参数
        },
        // input 聚焦
        focusIput(){
            this.$refs.Postipt.focus()// input聚焦
            // console.log(this.$refs.Postipt);
        },
        // input 清空
        clearIput(){
            this.value = ''
        }
    },
    // updated(){
    //     this.focusIput()
    // }
}
</script>

<style lang="scss" scoped>
.comment{
    padding: 0px 10px;
    .conment_item{
        margin: 10px 0px;
        :nth-child(1){
            color: #505050;
            margin-right: 10px;
        }
        :nth-child(2){
            color: #999;
        }
    }
    .conment_geren{
        display: flex;
        font-size: 12px;
        div{
            width: 30px;
            height: 30px;
            img{
                width: 100%;
                border-radius: 50%;
            }
        }
        input{
            background: #f4f4f4;
            outline: none;
            border: none;
            width: 170px;
            border-radius: 15px;
            margin: 0px 5px 0px 10px;
            padding-left: 15px;
            box-sizing: border-box;
        }
        button{
            border: none;
            background: #ff839b;
            border-radius: 15px;
            padding: 0px 12px;
            color: #fff;
        }
    }
}
</style>
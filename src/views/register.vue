<template>
  <div>
    <Login-Tap middleTap="注册bilibili">
      <div slot="right" style="font-size:3.333vw" @click="$router.push('/login')">切换到登录</div>
    </Login-Tap>
    <Login-Text label="姓名"
     style="margin:4.167vw 0"
     rule="^[\u4e00-\u9fa5_a-zA-Z0-9]{2,12}$" 
     placeholder="请输入姓名"
      @inputChange = "res =>model.name= res"
     />
    <Login-Text label="账号" 
     rule="^[0-9a-zA-Z_]{6,12}$" 
     placeholder="请输入账号"
     @inputChange = "res =>model.username= res"
     />
    <Login-Text label="密码" 
    type="password" 
    rule="^[0-9a-zA-Z_]{6,12}$"
     placeholder="请输入密码"
      @inputChange = "res =>model.password= res"
     />
     <!-- 3. 父组件接受 子组件传过来的方法 -->
    <Login-Btn btnitem="注册" @registerSumber="handelSumber"></Login-Btn>
  </div>
</template>

<script>
import LoginTap from '../components/common/LoginTap'
import LoginText from '@/components/common/LoginText'
import LoginBtn from '@/components/common/LoginBtn'
export default {
  data(){
    return{
      model:{
          name:'',
          username:'',
          password:''
      }
      
    }
  },
  components:{
    "Login-Tap":LoginTap,
    "Login-Text":LoginText,
    "Login-Btn":LoginBtn
  },
  methods:{
    async handelSumber(){// 4.父组件触发, 子组件的点击事件
     let rulg = /^.{6,12}$/
      if( this.model.name && rulg.test(this.model.username) && rulg.test(this.model.password)){// 所有正则都验证通过, 才可以发送接口
        const res = await this.$http.post('/register',this.model)
        this.$msg.fail(res.data.msg)// 提示信息
        console.log(res);
        
        localStorage.setItem('id',res.data.id)
        localStorage.setItem('token',res.data.objtoken)
        setTimeout(()=>{
          this.$router.push('/userinfo')
        },1000)
      }else{
        this.$msg.fail('格式不正确,请重新输入')
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
body{
  background-color:#f4f4f4;
}
</style>
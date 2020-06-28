
<template>
  <div v-if="model" class="editView">
      <nav-Bar class="bootm"></nav-Bar>
      <div class="uploader">
          <van-uploader class="uploader_img" :after-read="afterRead" preview-size="100vw" />
           <user-Redact left="头像">
            <img :src="model.user_img" slot="right" alt="" v-if="model.user_img">
            <img src="@/assets/default_img.jpg" slot="right" alt="" v-else>
            </user-Redact>
      </div>
      <!-- 此时的点击事件是 子元素通过自定义事件 ,传递来的 -->
    <user-Redact left="昵称" @bannerClick='show =true'>
        <a href="JavaScript:;" slot="right">{{model.name}}</a>
    </user-Redact>
    <user-Redact left="账号">
        <a href="JavaScript:;" slot="right">{{model.username}}</a>
    </user-Redact>
    <user-Redact left="性别" @bannerClick='gendershow =true'>
        <a href="JavaScript:;" slot="right">{{model.gender | gender}}</a>
    </user-Redact>
    <user-Redact left="个性签名" @bannerClick='textshow =true'>
        <a href="JavaScript:;" slot="right">{{model.user_desc}}</a>
    </user-Redact>

    <!-- 修改昵称弹出框 -->
    <van-dialog 
        v-model="show" 
        title="昵称" 
        show-cancel-button 
        @confirm="confirmClick"
        @cancel = "content = ''"
        >
        <van-field v-model="content" autofocus />
    </van-dialog>

    <!-- 修改个性签名弹出框 -->
    <van-dialog 
        v-model="textshow" 
        title="个性签名" 
        show-cancel-button 
        @confirm="confirmSign"
        @cancel = "content = ''"
        >
        <van-field v-model="content" autofocus />
    </van-dialog>

    <!--性别 -->
    <van-action-sheet 
        v-model="gendershow" 
        :actions="actions" 
        @select="selectGender"
        cancel-text="取消"/>

    <div class="back">
        <div @click="$router.back()">返回个人中心</div>
        <div>退出</div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
import Redact from '@/components/userComponent/userRedact.vue'
export default {
    data(){
        return{
            model:{},
            show:false,
            textshow:false,
            content:'',
            gendershow:false,
             actions: [
                        { name: '男',val:1 }, 
                        { name: '女',val:0 }, 
                      ],
        }
    },
    filters:{
        gender(val){
            return val == '1'?'男':'女'
            
        }
    },
    components:{
        'nav-Bar':Navbar,
        'user-Redact': Redact
    },
    created(){
        this.Redactget()
    },
    methods:{
       async Redactget(){
            const res = await this.$http.get('/user/'+ localStorage.getItem('id'))
            this.model = res.data[0]
        },
        // 上传图片
       async afterRead(file){
            console.log(file);
            const fromdata = new FormData()
            fromdata.append('file',file.file)
            const res = await this.$http.post('/upload',fromdata)
            this.model.user_img = res.data.url// 替换model里面的img
            this.UserUpdate()
        },
        // 把当前的 修改的 model 发送到 后台中(更新后台数据)
        async UserUpdate(){
            const res = await this.$http.post('/update/'+ localStorage.getItem('id'),this.model)
            console.log(res);
            if(res.data.code == 200){
                this.$msg.fail('修改成功')
            }
        },
        // 修改昵称
        confirmClick(){
            this.model.name = this.content
            this.UserUpdate()
            this.content = ''// 清空v-model
        },
        // 修改个性签名
        confirmSign(){
            this.model.user_desc = this.content
            this.UserUpdate()
            this.content = ''// 清空v-model
        },
        // 修改性别
        selectGender(data){
            this.model.gender = data.val
            this.UserUpdate()
        }
    }
}
</script>

<style lang="scss" scoped>
    .bootm{
        margin-bottom:2.778vw;
    }
    .editView{
        a{
            color: #999;
        }
        img{
            height: 12.778vw;
            width: 12.778vw;
        }
    }
    .uploader{
        position: relative;
        overflow: hidden;
        .uploader_img{
            position: absolute;
            opacity: 0;
        }
    }
    .back{
        background-color: #fff;
        margin-top: 2.778vw;
        div:nth-child(1){
            border-bottom: 0.278vw solid #eee;;
        }
        div{
            padding: 2.66667vw;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3.73333vw;
            color: #505050;
        }
    }
</style>
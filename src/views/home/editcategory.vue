<template>
  <div>
      <nav-bar></nav-bar>
      <!-- 分割线 -->
      <van-divider dashed :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
       现有栏目
      </van-divider>
      <div class="conten" :style="{padding: '0 16px' }">
        <span @click="handelRemove(index)" v-for="(item,index) in formList" :key="index">{{item.title}}</span>
      </div>

      <!-- 分割线 -->
      <van-divider dashed :style="{ color: '#7c3944', borderColor: '#7c3944', padding: '0 16px' }">
       已删除栏目
      </van-divider>
      <div class="conten2" :style="{padding: '0 16px' }">
        <span @click="handleCopy(index)" v-for="(item,index) in removeList" :key="index">{{item.title}}</span>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
export default {
    data(){
        return{
            formList:[],
            removeList:[]
        }
    },
    components:{
        'nav-bar':Navbar
    },
    created(){
        // 如果 缓存里面有 数据,  就读 缓存里面的 数据
        if(localStorage.getItem('formList') && localStorage.getItem('removeList')){
            // Json.parse,  把存在缓存中的 Json格式  转换为可以用的 数组格式
            this.formList = JSON.parse(localStorage.getItem('formList'))
            this.removeList = JSON.parse(localStorage.getItem('removeList'))
            return
        }
        // 如果缓存没有, 就发送接口,获取数据
        this.categoryGet()
    },
    watch:{
        // 监听  formList里面的数据,并且转换成 Json格式  存到缓存中
        formList(){
            localStorage.setItem('formList',JSON.stringify(this.formList))
            localStorage.setItem('removeList',JSON.stringify(this.removeList))
        }
    },
    methods:{
       async categoryGet(){
            const res = await this.$http.get('/category')
            console.log(res);
            this.formList = res.data
        },
        // 移除
        handelRemove(index){            // formmList[index] : 是点击的第几个
            if(this.formList.length <= 3){
                this.$msg.fail('最少选着三个~~')
                return
            }
            this.removeList.push(this.formList[index])// 把当前点击的的数据 push到 removeList数组中
            this.formList.splice(index,1)
        },
        // 拷贝
        handleCopy(index){
            this.formList.push(this.removeList[index])// 把当前点击的的数据 push到 formList数组中
            this.removeList.splice(index,1)
        }
    }
}
</script>

<style lang="scss">
    .conten{
        display: flex;
        flex-wrap: wrap;
        span{
           padding: 10px 20px;
           border: 1px solid #1989fa;
           margin: 0px 11px 13px 0px;
        }
    }
    .conten2{
        display: flex;
        flex-wrap: wrap;
        span{
           padding: 10px 20px;
           border: 1px solid #7c3944;
           margin: 0px 11px 13px 0px;
        }
    }
</style>
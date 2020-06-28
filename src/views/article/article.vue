<template>
  <div v-if="module">
    <nav-bar></nav-bar>
    <div class="acricle">
      <div class="video">
        <video controls="controls" :src="module.content"></video>
      </div>
      <div class="content">
        <div class="content_top">
          <span class="top_icon">{{module.category.title}}</span>
          <span>{{module.name}}</span>
          <span
            :class="show==true?'show iconfont icon-jiantou-xia':'show iconfont icon-jiantou-shang'"
            @click="show = !show"
          ></span>
        </div>
        <div class="content_hd">
          <a href="JavaScript:;">{{module.userinfo.name?module.userinfo.name:'善良的小矿工'}}</a>
          <span>484.7万次观看</span>
          <span>2.5万弹幕</span>
          <span>06-22</span>
          <!-- 动画 -->
          <transition name="fades">
            <div class="zk" v-if="show">
              <div>未经作者授权禁止转载</div>
              <div>
                <span>主页</span>
                <span>></span>
                <span>动画</span>
                <span>></span>
                <span>MAD-AMV</span>
              </div>
              <div class="option">
                <span>你心中的名场面</span>
                <span>BILIBILI 11周年演讲</span>
                <span>混剪</span>
                <span>多素材</span>
                <span>名梗</span>
                <span>高燃</span>
                <span>2020</span>
                <span>催泪</span>
              </div>
            </div>
          </transition>
        </div>
        <div class="content_cd">
          <span @click="handelCollect" :class="{activeclass:activeshow}">
            <i class="iconfont icon-shoucang1"></i> 收藏
          </span>
          <span @click="handleGuanzu" :class="{activeclass:activeguanzu}">
            <i class="iconfont icon-weibiaoti105" ></i>关注
          </span>
          <span>
            <i class="iconfont icon-zhuanfa1"></i>分享
          </span>
        </div>
      </div>
    </div>

    <!-- 底部table栏 -->
    <van-tabs v-model="active" 
      swipeable
      sticky
      line-height="0.417vw"
      color="#fb7299"
      title-active-color="#fb7299">
      <van-tab title="相关推荐">
         <div class="detailparent">
            <det-tail
              class="detailitem"
              :detailitme="item"
              v-for="(item,index) in recommenList"
              :key="index"
            ></det-tail>
          </div>
      </van-tab>
      <van-tab title="评论">
        <!-- 评论 -->
        <!-- 接受子组件的 值,  然后 把值 传到另外一个子组件 -->
          <com-ment :dataLength = "lens" @postComent = 'handlePost' ref="commentInput"></com-ment>
          <Leave @lengthselect = "handelLength" ref='commentPulish'  @publisClick='PostChange'></Leave>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "@/components/common/Navbar.vue";
import Detail from "@/components/home/detail.vue";
import Comment from "@/components/comment/comment.vue";
import Leave from "@/components/comment/leave.vue"
export default {
  data() {
    return {
      module: null,
      show: false,
      recommenList: [],
      active:0,
      lens:0, // 评论的条数
      Postcom:{
          comment_content:'', // 评论的内容
          comment_date:'', // 评论的日期
          parent_id:null, // 上条评论的id
          article_id:null, // 文章id
      },
      activeshow:null, // 收藏
      activeguanzu:null, // 关注
      list:[],// 收藏缓存,
      gzLlist:[],// 关注缓存
    };
  },
  components: {
    "nav-bar": NavBar,
    "det-tail": Detail,
    "com-ment": Comment,
    Leave
  },
  created() {
    this.articleget();
    this.recommen();
    this.getCollect()//  进入页面获取是否收藏 
    
  },
  watch: {
    // 监听路由的变化 ,如果发生变化 ,就重新发送请求,渲染详情页
    $route() {
      this.articleget();
      this.recommen();
      this.getCollect()//  切换路由获取是否收藏 
      this.getGuanzu()//    切换路由获取是否关注 
    }
  },
  methods: {
    async articleget() {
      let id = this.$route.params.id; // 接受路由传递来过的 id
      const res = await this.$http.get("/article/" + id);
      this.module = res.data[0];

      // 等module  有数据之后, 再调用 进入页面获取是否关注
      if(this.module){
        this.getGuanzu()//  进入页面获取是否关注   /*因为关注请求里需要的userid  在module请求有数据后, 才能调用关注请求 */
      }
    },
    async recommen() {
      const res = await this.$http.get("/commend");
      this.recommenList = res.data;
    },
    // 监听子组件传来的 值
    handelLength(res){
      this.lens = res
    },
    // 监听子组件传来的值
   async handlePost(res){
      let value = res// 输入框的内容
      const date = new Date()
      let m = (date.getMonth() + 1)
      let d = date.getDate()
      let skr =`${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d }`

      // 请求参数赋值
      this.Postcom.comment_content = res
      this.Postcom.comment_date = skr
      this.Postcom.article_id = this.$route.params.id
      console.log(this.Postcom);
      
      const result = await this.$http.post('/comment_post/'+ localStorage.getItem('id'),this.Postcom)
          console.log(result);
        if(result.status == 200){
          this.$msg.fail('发送成功')
          this.$refs.commentPulish.leaveList() // 通过 $refs 调用 Leave组件中的leaveList()方法, 来刷新页面
          this.$refs.commentInput.clearIput()// 通过 $refs 调用 Comment组件中的Comment()方法, 来清空input的 value
          this.Postcom.article_id = ''
        }
  },
    // 接受子组件传来的一级 评论的id,  当点击一级回复按钮, 
    PostChange(id){
      console.log(id);
      this.Postcom.parent_id = id// 就把当前 一级的id 传到 Postcom.parent_id 里, 这样点击发表的时候,就属于回复了
      this.$refs.commentInput.focusIput()
    },
    // 收藏
    async handelCollect(){
          if(localStorage.getItem('token')){
            const res = await this.$http.post('/collection/'+localStorage.getItem('id'),{
              article_id:this.$route.params.id
            }) 
            if(res.data.msg == '收藏成功'){
              this.activeshow = true

              // 把收藏的记录存到缓存中
              this.list.push(this.activeshow = true)
              localStorage.setItem('sclist',JSON.stringify(this.list))
            }else{
              this.activeshow = false
              
              // 把取消收藏的记录存到缓存中
              this.list.splice(0,1)
              localStorage.setItem('sclist',JSON.stringify(this.list))
            }
             this.$msg.fail(res.data.msg)
             return
          }
          this.$msg.fail('请先登录噢~~')
    },
    // 进入页面获取是否收藏    // get请求带参数要用  params
    async getCollect(){
       if(localStorage.getItem('token')){
          const res = await this.$http.get('/collection/'+localStorage.getItem("id"),{
          params:{
              article_id:this.$route.params.id
          }
        })
        this.activeshow = res.data.success // 页面一进入 查看用户是否收藏过
       }
        
    },
    // 关注
    async handleGuanzu(){
        if(localStorage.getItem('token')){
            const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'),{
          sub_id:this.module.userid
        })
        if(res.data.msg == '关注成功'){
            this.activeguanzu = true

            // 把收藏的记录存到缓存中
            this.gzLlist.push(this.activeguanzu = true)
            localStorage.setItem('gzlist',JSON.stringify(this.gzLlist))
        }else{
            this.activeguanzu = false

            // 把取消收藏的记录存到缓存中
            this.gzLlist.splice(0,1)
            localStorage.setItem('gzlist',JSON.stringify(this.gzLlist))
        }
        this.$msg.fail(res.data.msg)
        return
        }

        this.$msg.fail('请先登录噢~~')
    },
    // 进入页面获取是否关注   // get请求带参数用  params
    async getGuanzu(){
      if(localStorage.getItem('token')){
        const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'),{
          params:{
            sub_id:this.module.userid
          }
        })
        this.activeguanzu = res.data.success // 页面一进入 查看用户是否收藏过
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.acricle {
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
  .content {
    padding: 3.17vw;
    background-color: #fff;
    .content_top {
      position: relative;
      .top_icon {
        position: relative;
        display: inline-block;
        padding: 0px 10px 0px 20px;
        height: 5.33333vw;
        line-height: 5.833vw;
        color: #fb7299;
        background: #f4f4f4;
        border-radius: 3.2vw;
        vertical-align: middle;
        font-size: 3.2vw;
      }
      .show {
        position: absolute;
        right: 0px;
      }
      .top_icon::before {
        content: "\e662";
        font-family: "iconfont";
        font-size: 3.2vw; // 样式和位置，自设
        position: absolute;
        top: -0.167vw;
        left: 0.833vw;
        color: #fb7299;
      }
      :nth-child(2) {
        font-size: 4.26667vw;
        font-weight: 400;
      }
    }
    .content_hd {
      font-size: 3.2vw;
      margin-top: 2.13333vw;
      color: #999;
      a {
        color: #212121;
        margin-right: 4.8vw;
      }
      span {
        margin-right: 15px;
      }
      .zk {
        transition: all linear 0.5s;
        max-height: 190px;
        overflow: hidden;
        div {
          margin-top: 2.13333vw;
          font-size: 3.2vw;
        }
        :nth-child(1) {
          line-height: 4.8vw;
        }
        div:nth-child(2) span:nth-child(odd) {
          color: #fb7299;
        }
        .option {
          span {
            display: inline-block;
            padding: 2.13333vw 4.8vw;
            font-size: 3.2vw;
            color: #505050;
            background: #f4f4f4;
            margin-bottom: 1.6vw;
            margin-right: 2.66667vw;
            border-radius: 26.66667vw;
          }
        }
      }
    }
    .content_cd {
      margin-top: 15px;
      span {
        font-size: 14px;
        color: #999;
        vertical-align: middle;
        margin: 0px 3.33333vw;
        .icon-shoucang1 {
          margin-right: 0px;
        }
        i {
          font-style: normal;
          margin-right: 8px;
        }
      }
    }
  }
}
// vue 动画
.fades-enter-active,
.fades-leave-active {
  transition: all 0s linear;
}
.fades-enter,
.fades-leave-to {
  height: 0;
}
.fades-leave,
.fades-enter-to {
  height: 170px;
}

.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    width: 45%;
  }
}
.activeclass{
  color: #fb7299!important;
}
</style>
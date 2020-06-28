<template>
  <div>
      <div class="detail" @click="pathPush">
          <div class="ingparent">
              <img :src="detailitme.img" alt="" style="width:100% ;height:95px">
              <div class="spanitem">
                  <span class="bf">396.7万</span>
                   <span class="dm">2.3万</span>
              </div>
          </div>
          <p>{{detailitme.name}}</p>
      </div>
  </div>
</template>

<script>
export default {
    props:['detailitme'],
    methods:{
        pathPush(){
            let id = this.detailitme.id// 获取父组件传递来的 id  
            // if(this.$route.path !== '/article/'+id){// 如果当前的路径, 不等于要跳转的路径, 就跳转
            //     this.$router.push('/article/'+id)
            // }
            
           this.$router.push('/article/'+id)
            
        }
    }
}
</script>

<style lang="scss" scoped>
.detail{
        padding: 2.13333vw 0;
    p{
        font-size: 3.333vw;
        margin-top: 1.6vw;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .ingparent{
        position: relative;
        // padding: 0px 5px;
        // box-sizing: border-box;
        .spanitem{
            position: absolute;
            bottom: 1.389vw;
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
            padding: 1.389vw 1.389vw 1.389vw 6.944vw;
            box-sizing: border-box;
            span{
            font-size: 3.2vw;
            color: #fff;
        }
            .bf::before{
                content: "\e70a";
                font-family: "iconfont"; // 必须要加，不加的话显示异常
                font-size: 5vw; // 样式和位置，自设
                position: absolute;
                top: 3px;
                left: 3px;
                color: #fff;
            }
            .dm::after{
                content:'\e665';
                font-family: 'iconfont';
                font-size: 5vw;
                position: absolute;
                top: 0.833vw;
                right: 9.722vw;
                color: #fff;
            }

        }
    }
}
</style>
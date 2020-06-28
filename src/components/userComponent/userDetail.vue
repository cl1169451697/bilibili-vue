<template>
  <div class="userdetail">
    <!-- 头部 编辑质料 -->
    <div class="user_content">
      <div class="user_img">
        <img v-if="userInfo.user_img" :src="userInfo.user_img" alt="">
        <img v-else src="@/assets/default_img.jpg" alt />
      </div>
      <div class="user_edit">
        <ol>
          <li>
            <!-- <span v-if="sclist.length == true">{{sclist.length}}</span> -->
            <span >0</span>
            <span class="item_color">收藏</span>
          </li>
          <li class="scipe">|</li>
          <li>
            <!-- <span v-if="gzlist.length==true">{{gzlist.length}}</span> -->
            <span >0</span>
            <span class="item_color">关注</span>
          </li>
          <li class="scipe">|</li>
          <li>
            <span>0</span>
            <span class="item_color">获赞</span>
          </li>
        </ol>
        <button @click="$router.push('/redact')">编辑资料</button>
      </div>
    </div>
    <!-- 个人信息 -->
    <div class="user_footer">
      <p class="user_item_icon">{{userInfo.name}}</p>
      <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
      <p v-else>这个人很神秘, 什么都没有写</p>
    </div>
    <!-- 动态  视频 -->
    <div class="table">
      <div>动态</div>
      <div>视频</div>
    </div>
  </div>
</template>
<script>
export default {
   props:['userInfo'],
};
</script>

<style lang="scss" scoped>
.userdetail {
  background-color: #fff;
  // padding: 0vw 3.333vw;
  .user_content {
    display: flex;
    flex: 1;
    padding: 0vw 3.333vw;
    .user_img {
      margin-right: 11.111vw;
      img {
        height: 23.611vw;
        width: 23.611vw;
        border-radius: 50%;
      }
    }
    .user_edit {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 2.13333vw;
      ol {
        display: flex;
        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 19.2vw;
          font-size: 2.778vw;
        }
        .scipe {
          width: 0vw;
          line-height: 4.167vw;
          font-size: 2.93333vw;
          color: #e7e7e7;
        }
        .item_color {
          font-size: 2.933vw;
          color: #999;
        }
      }
      button {
        background: #fff;
        border: 0.278vw solid #fb7299;
        color: #fb7299;
        width: 100%;
        display: block;
        height: 8vw;
        border-radius: 1.06667vw;
        font-size: 3.73333vw;
        // margin-top: 2.222vw;
        outline: none;
      }
    }
  }
  .user_footer {
    padding: 3.2vw 3.333vw;
    p:nth-child(1) {
      font-size: 4.8vw;
      font-weight: 500;
      color: #000;
      margin-bottom: 2.133vw;
      position: relative;
    }
    .user_item_icon::after {
      content: "\e605";
      font-family: "iconfont"; // 必须要加，不加的话显示异常
      font-size: 5vw; // 样式和位置，自设
      position: absolute;
      top: 0.833vw;
      left: 26.389vw;
      color: #56c1e4;
      // background-color: #fff;
    }
    p {
      font-size: 2.778vw;
      color: #999;
    }
  }
  .table {
    border-top: 0.278vw solid #e7e7e7;
    padding: 2.778vw 3.333vw;
    div {
      display: inline-block;
      margin-right: 8.53333vw;
      color: #757575;
      font-size: 3.46667vw;
    }
  }
}
</style>
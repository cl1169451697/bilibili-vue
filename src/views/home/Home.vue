<template>
  <div class="home">
    <!-- 引入头部组件 -->
    <nav-Bar></nav-Bar>
      <div class="categorytab">
        <div class="cate_icon"><van-icon name="setting-o" @click="$router.push('/editcategory')" /></div>
          <van-tabs
      v-model="active"
      swipeable
      sticky
      line-height="0.417vw"
      color="#fb7299"
      title-active-color="#fb7299"
    >
      <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="我也是有底线的..."
          :immediate-check="false"
          @load="onLoad"
        >
          <div class="detailparent">
            <home-Detail
              class="detailitem"
              :detailitme="item2"
              v-for="(item2,index2) in item.list"
              :key="index2"
            ></home-Detail>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
      </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar.vue";
import Detail from "@/components/home/detail.vue";
export default {
  data() {
    return {
      category: [],
      active: 0
    };
  },
  components: {
    "nav-Bar": Navbar,
    "home-Detail": Detail
  },
  created() {
    this.selectCategory();
    // console.log(this.$route);
  },
  watch: {
    // 监听table栏 的 下标变化
    active() {
      this.selectArticle(); // 如果发送变化,就 请求 文章数据
    }
  },
  // 由于路由使用了keep-alive ,所以改变 tbale栏刷新不会发生变化, 但是我们又想自定义table栏时, 进行刷新, 这里使用了 activated()
  //只有用<keep-alive></keep-alive>   包裹的组件才会有activated生命周期
  activated(){
      if(localStorage.getItem("formList")){
        let formList = JSON.parse(localStorage.getItem('formList'))
        console.log(formList);
        
        this.category = this.changeCategory(formList) // 改造数据
        this.selectArticle() // 根据id 请求文章
      }
  },
  methods: {
    // 1.请求所有分类数据
    async selectCategory() {
      if(localStorage.getItem("formList")){// 如通过有缓存的数据, 就不发送请求
        return
      }
      const res = await this.$http.get("/category");
      this.changeCategory(res.data);
    },
    // 2. 改造一下请求到的分类数据
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = [];
        item.page = 0; // 从第一页开始
        item.pagesize = 10; // 每页显示 8条数据
        item.finished = false; // 所有数据加载成功
        item.loading = false; //
        return item;
      });
      this.category = category1;// 把 改造好的 数据 推送到 data中 进行渲染
      this.selectArticle();
      return category1
    },
    // 3. 根据点击tabl栏的下标  来获取分类category数组不同的数据
    categoryItem() {
      const categoryItem = this.category[this.active];
      return categoryItem;
    },
    // 4.根据分类的id 来, 请求文章的数据
    async selectArticle() {
      const categoryItem = this.categoryItem(); // 动态获取分类的id
      const res = await this.$http.get("/detail/" + categoryItem._id, {
        params: {
          page: categoryItem.page,
          pagesize: categoryItem.pagesize
        }
      });
      categoryItem.list.push(...res.data); // 把文章的数据 ,传到 list中
      categoryItem.loading = false; // 每次上滑请求完毕,加载状态结束
      if (res.data.length < categoryItem.pagesize) {
        categoryItem.finished = true; // 所有上滑数据,全部加载完成
      }
    },
    // 上拉触底
    onLoad() {
      const categoryItem = this.categoryItem();
      setTimeout(() => {
        categoryItem.page += 1; // 每次上滑, 页面显示的页码 +1(页码+1,又会请求一次)
        this.selectArticle();
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #fff;
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    width: 45%;
  }
}
.categorytab{
  position: relative;

    .cate_icon{
      width: 68px;
      height: 50px;
      background-color: #fff;
      position: absolute;
      text-align: center;
      line-height: 55px;
      top: -5px;
      right:0px;
      z-index: 999;
    }
}
// .categorytab .van-sticky--fixed{
//       position: fixed;
//     top: 0;
//     right: 0;
//     left: 0;
//     z-index: 99;
//     width: 100%;
// }
</style>
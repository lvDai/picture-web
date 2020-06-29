<template>
  <div v-if="pageShow">
    <div class="header">
      <top-navig />
    </div>
    <div class="content">
      <left-navig />
      <div class="history">
        <div class="historyTitle">
          <h1>浏览记录:</h1>
        </div>
        <div class="historyData">
          <ul>
            <li class="iconfont" v-for="(item, index) in historys" :key="index">
              <router-link :to="item.path">{{item.name}}</router-link>
              <i class="iconfont" @click="removeHistory(index)" title="删除">&#xe61a;</i>
            </li>
          </ul>
        </div>
      </div>
      <div class="contentView">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import topNavig from "@/pages/admin/components/topNavig.vue";
import leftNavig from "@/pages/admin/components/leftNavig.vue";
export default {
  data() {
    return {
      pageShow: false,
      user: { id: "", name: "" },
      historys: []
    };
  },
  created() {
    this.pageShow = true;
    // if (this.$utility.getCookie("adminUser")) {
    //   let user = this.$utility.uncompileStr(
    //     this.$utility.getCookie("adminUser")
    //   );
    //   if (user) {
    //     this.user = JSON.parse(user)[0];
    //     if (this.user.id) {
    //       this.pageShow = true;
    //       return;
    //     }
    //   }
    // }
    // this.$router.push({
    //   path: "/admin/login"
    // });
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      if (this.historys.length) {
        for (let i = 0; i < this.historys.length; i++) {
          if (this.historys[i].path == to.path) {
            return;
          }
        }
      }
      this.historys.push({ path: to.path, name: to.name });
    }
  },
  methods: {
    // 删除历史标签
    removeHistory(index){
      this.historys.splice(index,1);
    }
  },
  components: {
    topNavig,
    leftNavig
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  margin-top: 81px;
  padding-left: 201px;
  box-sizing: border-box;
  .history {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-bottom: 1px solid #e3e3e3;
    display: flex;
    .historyData {
      ul {
        display: flex;
        li {
          position: relative;
          padding-right: 33px;
          height: 40px;
          line-height: 40px;
          a {
            display: inline-block;
            padding: 0 5px;
            font-size: 13px;
            color: #666;
            transform: translate(0, -2px);
          }
          a.router-link-exact-active.router-link-active{
            color: #409EFF;
          }
          i {
            position: absolute;
            right: 0;
            top: 4px;
            color: 12px;
            height: 14px;
            line-height: 14px;
            transform: scale(0.7);
            cursor: pointer;
          }
          i:hover {
            color: #f42;
          }
        }
        li::after {
          position: absolute;
          content: "\e645";
          right: 20px;
          font-size: 12px;
          line-height: 40px;
        }
      }
    }
  }
  .contentView {
  }
}
</style>
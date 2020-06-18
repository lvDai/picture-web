<template>
  <div class="picture" v-if="isUserLogin">
    <div class="header">
      <head-box style="width: 100%; position:fixed;top: 0;left:0;z-index:99;" />
    </div>
    <div class="content">
      <div class="leftNavig" ref="leftNavig">
        <div class="tablist">
          <ul>
            <li>
              <router-link to="/picture">{{$t('lang.newlyRelease')}}</router-link>
            </li>
            <li>
              <router-link to="/picture/continue">{{$t('lang.continue')}}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="rightViwe">
        <div class="router">
          <div class="routerTitle">
            <h1>{{$t('lang.browsingHistory')}}:</h1>
          </div>
          <ul>
            <li v-for="(item, index) in routeClickeds" :key="index">
              <router-link :to="item.path">{{item.name}}</router-link>
              <i class="iconfont">&#xe645;</i>
            </li>
          </ul>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import head from "@/pages/components/head.vue";
export default {
  data() {
    return {
      tabPosition: "left",
      routeClickeds: [],
      isUserLogin: false
    };
  },
  created() {
    this.initUser();
  },
  methods: {
    initUser() {
      if (localStorage.myUser) {
        let user = JSON.parse(this.$utility.uncompileStr(localStorage.myUser));
        if (user && user.id) {
          this.isUserLogin = true;
          return;
        }
      }
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$refs.leftNavig.style.height = window.screen.height - 80 + "px";
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      if (to.path == "/picture/continue") {
        this.$refs.leftNavig.classList.add("activity");
      } else {
        this.$refs.leftNavig.classList.remove("activity");
      }
      if (this.routeClickeds.length) {
        for (let i = 0; i < this.routeClickeds.length; i++) {
          if (this.routeClickeds[i].path == to.path) {
            return;
          }
        }
      }
      this.routeClickeds.push({ path: to.path, name: to.name });
    }
  },
  components: {
    headBox: head
  }
};
</script>
<style lang="less" scoped>
.picture {
  .content {
    position: relative;
    padding: 20px 0;
    margin-top: 80px;
    box-sizing: border-box;
    .leftNavig {
      position: fixed;
      top: 80px;
      left: 0;
      z-index: 2;
      width: 100px;
      border-right: 2px solid #e3e3e3;
      .tablist {
        ul {
          height: 50px;
          line-height: 50px;
          li {
            a {
              display: block;
              text-align: center;
              transition: background-color, color 0.6s;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            a.router-link-exact-active.router-link-active {
              background-color: #e3e3e3;
              color: #409eff;
            }
          }
        }
      }
    }
    .leftNavig::before {
      width: 2px;
      height: 50px;
      position: absolute;
      top: 0;
      right: -2px;
      content: "";
      background-color: #409eff;
      transition: top 0.6s;
    }
    .leftNavig.activity::before {
      top: 50px;
    }
    .rightViwe {
      position: absolute;
      padding-left: 102px;
      top: 0;
      padding-top: 5px;
      width: 100%;
      box-sizing: border-box;
      .router {
        padding-left: 20px;
        line-height: 40px;
        height: 40px;
        border-bottom: 1px solid #d3d3d3;
        display: flex;
        ul {
          display: flex;
          li {
            margin-right: 5px;
            i {
              font-size: 14px;
            }
            a.router-link-exact-active.router-link-active {
              color: #409eff;
            }
          }
        }
      }
    }
  }
}
</style>
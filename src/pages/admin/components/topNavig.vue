<template>
  <div class="topNavig">
    <div class="navigBox W1200">
      <div class="logo">
        <router-link to="/">
          <img :src="$imageURl+'cuhk-logo-zh.png'" alt />
        </router-link>
      </div>
      <div class="userData">
        <div class="userName">{{user.name}}</div>
        <div class="userQuit" @click="logOut">
          <router-link to>退出</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: { id: "", name: "" }
    };
  },
  created() {
    let user = this.$utility.uncompileStr(this.$utility.getCookie("adminUser"));
    this.user = JSON.parse(user)[0];
  },
  methods: {
    //  退出登录
    logOut() {
      this.$utility.delCookie("adminUser");
      this.$router.push({
        path: "/admin/login"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.topNavig {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  background-color: #fff;
  height: 80px;
  .logo {
    height: 80px;
    padding: 12.5px;
    box-sizing: border-box;
    img {
      width: 121px;
      height: 55px;
    }
  }
  .navigBox {
    display: flex;
    justify-content: space-between;
    line-height: 80px;
    .userData {
      display: flex;
      div {
        padding: 0 10px;
        height: 80px;
      }
      .userQuit {
        cursor: pointer;
        a {
          display: block;
        }
      }
    }
  }
}
</style>
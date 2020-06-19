<template>
  <div class="head">
    <div class="headBox W1200">
      <div class="headLeft">
        <router-link to="/">
          <img :src="$imageURl+($i18n.locale == 'zh-CN'?'cuhk-logo-zh.png':'cuhk-logo.png')" alt />
        </router-link>
      </div>
      <div class="searchBox" v-show="isSearchBox">
        <input
          type="text"
          v-model="searchData"
          @keydown="searchContent"
          :placeholder="$t('lang.search')"
        />
        <i class="iconfont" @click="searchContent">&#xe62f;</i>
      </div>
      <div class="headRight">
        <div class="login" v-if="!user.id">
          <router-link to="/login">{{$t('lang.login')}}</router-link>
        </div>
        <div class="alreadyLogin" v-else>
          <div class="user">
            <span>{{user.name}}</span>
          </div>
          <div class="publishPicture">
            <router-link to="picture">{{$t('lang.publishPictures')}}</router-link>
          </div>
        </div>
        <div class="lang" @mouseover="isLangList = true" @mouseleave="isLangList = false">
          <span>{{language}}</span>
          <i class="iconfont">&#xe698;</i>
          <ul v-show="isLangList">
            <li>
              <a @click.prevent="switchLang(0)">中文</a>
            </li>
            <li>
              <a to @click.prevent="switchLang(1)">Eng</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      language: "中文",
      isLangList: false,
      user: { name: "", id: "" },
      isSearchBox: false,
      searchData: ""
    };
  },
  created() {
    // 初始化判断是中文还是Eng
    if (localStorage.locale == "en-US") {
      this.language = "Eng";
    } else {
      this.language = "中文";
    }
    window.addEventListener("scroll", this.showIcon);
    this.getUser();
  },
  methods: {
    // 获取用户信息
    getUser() {
      if (localStorage.myUser) {
        let user = JSON.parse(this.$utility.uncompileStr(localStorage.myUser));
        if (user && user.id) {
          this.user = user;
        }
      }
    },
    // 切换语言 i代表语言
    switchLang(i) {
      if (i == 0) {
        this.$i18n.locale = "zh-CN";
        this.language = "中文";
        localStorage.locale = "zh-CN";
      } else {
        this.$i18n.locale = "en-US";
        this.language = "Eng";
        localStorage.locale = "en-US";
      }
    },
    // 判断页面滚动是否大于500
    showIcon() {
      if (document.documentElement.scrollTop >= 500) {
        this.isSearchBox = true;
      } else {
        this.isSearchBox = false;
      }
    },
    // 点击搜索
    searchContent(e) {
      let searchData = this.searchData.replace(/(^\s*)|(\s*$)/g, "")
      if (searchData.length) {
        e = e || window.event;
        if (e.keyCode) {
          if (e.keyCode != 13) {
            return;
          }
        }
        this.$router.push({
          path: "/search",
          query: { data: searchData }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  background-color: rgba(0, 0, 0, 0.3);
  height: 80px;
  .headBox {
    display: flex;
    justify-content: space-between;
    .headLeft {
      padding-top: 12.5px;
      img {
        width: 121px;
        height: 55px;
      }
    }
    .searchBox {
      display: flex;
      line-height: 80px;
      input {
        margin-top: 15px;
        width: 240px;
        height: 50px;
        padding: 0 20px;
        border: 1px solid #e3e3e3;
        border-radius: 6px 0 0 6px;
        box-sizing: border-box;
        border-right: none;
        transition: width 2s;
      }
      i {
        margin-top: 15px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        border: 1px solid #e3e3e3;
        border-radius: 0 6px 6px 0;
        box-sizing: border-box;
        text-align: center;
        border-left: none;
        cursor: pointer;
      }
    }
    .searchBox:hover input {
      width: 400px;
    }
    .headRight {
      display: flex;
      line-height: 80px;
      .login {
        width: 100px;
        height: 80px;
        a {
          display: block;
          text-align: center;
        }
      }
      .lang {
        position: relative;
        height: 80px;
        width: 100px;
        z-index: 99;
        text-align: center;
        cursor: pointer;
        ul {
          position: absolute;
          top: 79px;
          left: 0;
          width: 100%;
          background-color: #fff;
          border: 1px solid #e3e3e3;
          box-sizing: border-box;
          border-top: none;
          li {
            a {
              display: block;
            }
            a:hover {
              background-color: #e3e3e3;
            }
          }
        }
      }
      .lang:hover {
        background-color: #fff;
        border: 1px solid #e3e3e3;
        box-sizing: border-box;
        border-bottom: none;
      }
      .alreadyLogin {
        display: flex;
        .user {
          margin-right: 15px;
          width: 100px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          span {
            cursor: pointer;
          }
        }
        .publishPicture {
          width: 140px;
          text-align: center;
        }
      }
    }
  }
}
</style>
<template>
  <div class="search">
    <div class="header">
      <head-box style="width: 100%; position:fixed;top: 0;left:0;z-index:99;" />
    </div>
    <div class="content">
      <div class="title">
        <div class="searchNumber">
          <h1>{{$t('lang.searchResult')}}:</h1>
          <p>{{$t('lang.all')}}(123)</p>
        </div>
        <div class="searchBox">
          <input
            type="text"
            @keydown="searchContent"
            v-model="searchData"
            :placeholder="$t('lang.search')"
          />
          <i @click="searchContent" class="iconfont">&#xe62f;</i>
        </div>
      </div>
      <div class="pictures">
        <div class="pictureBox">
          <div class="item-01 itemBox">
            <ul>
              <li>
                <img :src="$imageURl+'9mm.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'9Zy.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'69E.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'hw8.jpg'" alt />
              </li>
            </ul>
          </div>
          <div class="item-02 itemBox">
            <ul>
              <li>
                <img :src="$imageURl+'epE.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'9Zy.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'69E.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'hw8.jpg'" alt />
              </li>
            </ul>
          </div>
          <div class="item-03 itemBox">
            <ul>
              <li>
                <img :src="$imageURl+'hVl.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'9Zy.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'69E.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'hw8.jpg'" alt />
              </li>
            </ul>
          </div>
          <div class="item-04 itemBox">
            <ul>
              <li>
                <img :src="$imageURl+'untitled.png'" alt />
              </li>
              <li>
                <img :src="$imageURl+'9Zy.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'69E.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'hw8.jpg'" alt />
              </li>
            </ul>
          </div>
          <div class="item-05 itemBox">
            <ul>
              <li>
                <img :src="$imageURl+'nJZ.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'j8x.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'69E.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'hw8.jpg'" alt />
              </li>
            </ul>
          </div>
          <div class="item-06 itemBox">
            <ul>
              <li>
                <img :src="$imageURl+'ewy.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'9Zy.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'69E.jpg'" alt />
              </li>
              <li>
                <img :src="$imageURl+'hw8.jpg'" alt />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <bottom-box />
    </div>
  </div>
</template>
<script>
import head from "@/pages/components/head.vue";
import bottom from "@/pages/components/bottom.vue";
export default {
  data() {
    return {
      searchData: ""
    };
  },
  created() {
    if (this.$route.query.tag) {
      this.searchData = this.$route.query.tag;
    } else {
      this.searchData = this.$route.query.data;
    }
  },
  methods: {
    // 点击搜索
    searchContent(e) {
      let searchData = this.searchData.replace(/(^\s*)|(\s*$)/g, "");
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
  },
  watch: {
    $route: function(to, from) {
      window.pageYOffset = 0;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  components: {
    headBox: head,
    bottomBox: bottom
  }
};
</script>
<style lang="less" scoped>
.search {
  .content {
    margin-top: 80px;
    .title {
      display: flex;
      justify-content: space-between;
      width: 100%;
      background-image: linear-gradient(#e3e3e3, #ffff);
      padding: 20px 40px;
      box-sizing: border-box;
      .searchNumber {
        display: flex;
        line-height: 40px;
      }
      .searchBox {
        display: flex;
        input {
          width: 240px;
          height: 40px;
          padding: 0 20px;
          border: 1px solid #e3e3e3;
          border-right: none;
          border-radius: 6px 0 0 6px;
          transition: width 2s;
          box-sizing: border-box;
        }
        i {
          width: 40px;
          height: 40px;
          line-height: 40px;
          background-color: #fff;
          border: 1px solid #e3e3e3;
          border-radius: 0 6px 6px 0;
          box-sizing: border-box;
          text-align: center;
          border-left: none;
          cursor: pointer;
        }
      }
    }
    .pictures {
      padding-bottom: 30px;
      .pictureBox {
        width: 100%;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        .itemBox {
          flex: 1;
          ul {
            display: flex;
            flex-direction: column;
            li {
              width: 100%;
              padding: 5px;
              box-sizing: border-box;
              img {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
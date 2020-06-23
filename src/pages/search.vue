<template>
  <div class="search">
    <div class="header">
      <head-box style="width: 100%; position:fixed;top: 0;left:0;z-index:99;" />
    </div>
    <div class="content">
      <div class="title">
        <div class="searchNumber">
          <h1>{{$t('lang.searchResult')}}:</h1>
          <p>{{$t('lang.all')}}({{pictureTotalData}})</p>
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
              <li
                @click="clickPictureId = item.id"
                v-for="(item, index) in pictureData['0']"
                :key="index"
              >
                <img v-lazy="$imageURl+'b/'+item.url" alt />
              </li>
            </ul>
          </div>
          <div class="item-02 itemBox">
            <ul>
              <li
                @click="clickPictureId = item.id"
                v-for="(item, index) in pictureData['1']"
                :key="index"
              >
                <img v-lazy="$imageURl+'b/'+item.url" alt />
              </li>
            </ul>
          </div>
          <div class="item-03 itemBox">
            <ul>
              <li
                @click="clickPictureId = item.id"
                v-for="(item, index) in pictureData['2']"
                :key="index"
              >
                <img v-lazy="$imageURl+'b/'+item.url" alt />
              </li>
            </ul>
          </div>
          <div class="item-04 itemBox">
            <ul>
              <li
                @click="clickPictureId = item.id"
                v-for="(item, index) in pictureData['3']"
                :key="index"
              >
                <img v-lazy="$imageURl+'b/'+item.url" alt />
              </li>
            </ul>
          </div>
          <div class="item-05 itemBox">
            <ul>
              <li
                @click="clickPictureId = item.id"
                v-for="(item, index) in pictureData['4']"
                :key="index"
              >
                <img v-lazy="$imageURl+'b/'+item.url" alt />
              </li>
            </ul>
          </div>
          <div class="item-06 itemBox">
            <ul>
              <li
                @click="clickPictureId = item.id"
                v-for="(item, index) in pictureData['5']"
                :key="index"
              >
                <img v-lazy="$imageURl+'b/'+item.url" alt />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <bottom-box />
    </div>
    <pictureDownload
      v-if="clickPictureId"
      v-on:closePages="closePages"
      :pictureId="clickPictureId"
    />
  </div>
</template>
<script>
import head from "@/pages/components/head.vue";
import bottom from "@/pages/components/bottom.vue";
import pictureDownload from "@/pages/components/pictureDownload.vue";
export default {
  data() {
    return {
      searchData: "",
      pictureData: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] },
      pictureTotalData: 0,
      clickPictureId: 0
    };
  },
  created() {
    this.initSearchData();
  },
  methods: {
    // 关闭图片详情页面
    closePages() {
      this.clickPictureId = 0;
    },
    // 初始化数据
    initSearchData() {
      if (this.$route.query.categoryId) {
        this.getByCategoryId(this.$route.query.categoryId);
      } else if (this.$route.query.data) {
        this.searchData = this.$route.query.data;
        this.getContentPictures(this.searchData);
      } else {
        this.getByTagIdPictures(this.$route.query.tagId);
      }
    },
    // 根据分类搜索
    getByCategoryId(id) {
      this.pictureData["0"].length = 0;
      this.pictureData["1"].length = 0;
      this.pictureData["2"].length = 0;
      this.pictureData["3"].length = 0;
      this.pictureData["4"].length = 0;
      this.pictureData["5"].length = 0;
      this.$request
        .get("/getByCategoryId?categoryId=" + id)
        .then(result => {
          if (result.data.status == 1) {
            this.pictureTotalData = result.data.data.length;
            for (let i = 0; i < result.data.data.length; i++) {
              this.pictureData[i % 6].push(result.data.data[i]);
            }
          } else {
            alert("搜索内容失败,服务器繁忙");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 根据搜索的内容获取图片
    getContentPictures(data) {
      this.pictureData["0"].length = 0;
      this.pictureData["1"].length = 0;
      this.pictureData["2"].length = 0;
      this.pictureData["3"].length = 0;
      this.pictureData["4"].length = 0;
      this.pictureData["5"].length = 0;
      this.$request
        .get("/getContentPictures?content=" + data)
        .then(result => {
          if (result.data.status == 1) {
            this.pictureTotalData = result.data.data.length;
            for (let i = 0; i < result.data.data.length; i++) {
              this.pictureData[i % 6].push(result.data.data[i]);
            }
          } else {
            alert("搜索内容失败,服务器繁忙");
          }
        })
        .catch(err => {});
    },
    // 根据标签搜索
    getByTagIdPictures(id) {
      this.$request
        .get("/getByTagIdPictures?id=" + id)
        .then(result => {
          if (result.data.status == 1) {
            this.pictureTotalData = result.data.data.length;
            for (let i = 0; i < result.data.data.length; i++) {
              this.pictureData[i % 5].push(result.data.data[i]);
            }
          } else {
            alert("搜索内容失败,服务器繁忙");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
    $route(to, from) {
      this.initSearchData();
      window.pageYOffset = 0;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  components: {
    headBox: head,
    bottomBox: bottom,
    pictureDownload
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
              cursor: pointer;
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
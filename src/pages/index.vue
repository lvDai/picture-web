<template>
  <div>
    <div class="header">
      <head-box style="width: 100%; position:fixed;top: 0;left:0;z-index:99;" />
      <div class="banner">
        <div class="slideshow">
          <ul>
            <li v-for="(item) in slideshowData" :key="item.id">
              <img :src="$imageURl+item.url" alt />
            </li>
          </ul>
        </div>
        <div class="slideshowIndex" v-if="slideshowData.length > 1">
          <ul>
            <li v-for="(item,index) in slideshowData" class="activity" :key="index"></li>
          </ul>
        </div>
        <div class="searchBox">
          <input type="text" :placeholder="$t('lang.search')" />
          <i class="iconfont">&#xe62f;</i>
        </div>
        <div class="title">
          <h1>{{$t('lang.arrowWrap')}}</h1>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="ranking">
        <div class="rankingBox W1200">
          <div
            :class="(switchoverRanking==1?'activity popularity':'popularity')"
            @click="switchoverRanking=1"
          >
            <h1>{{$t('lang.popularity')}}</h1>
          </div>
          <div
            :class="(switchoverRanking==2?'activity newly':'newly')"
            @click="switchoverRanking=2"
          >
            <h1>{{$t('lang.newlyAdd')}}</h1>
          </div>
        </div>
      </div>
      <div class="picture">
        <div class="pictureBox">
          <div class="item-01 itemBox">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="item-02 itemBox">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="item-03 itemBox">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="item-04 itemBox">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="item-05 itemBox">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="item-06 itemBox">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import head from "@/pages/components/head.vue";
export default {
  data() {
    return {
      slideshowData: [],
      switchoverRanking: 1
    };
  },
  methods: {
    // 获取banner数据
    getAllBanner() {
      this.$request
        .get("/getAllBanner")
        .then(result => {
          console.log(result);
          if (result.data.status == 1) {
            this.slideshowData = result.data.data;
          } else {
            alert(result.data.error);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getAllBanner();
  },
  components: {
    headBox: head
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header {
  .banner {
    position: relative;
    width: 100%;
    height: 42.84vw;
    .slideshow {
      ul {
        li {
          position: absolute;
          top: 0;
          left: 0;
          height: 42.84vw;
          width: 100%;
          img {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
          }
        }
      }
    }
    .slideshowIndex {
      position: absolute;
      bottom: 40px;
      z-index: 9;
      width: 100%;
      ul {
        width: 100%;
        display: flex;
        justify-content: center;
        li {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          border: 1px solid #999;
          margin: 0 6px;
          cursor: pointer;
          transition: background-color 1s;
        }
        li.activity {
          background-color: rgba(255, 255, 255, 1);
        }
      }
    }
    .searchBox {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 0);
      display: flex;
      input {
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
        display: inline-block;
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
    .title {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      width: 1000px;
      height: 80px;
      line-height: 80px;

      text-align: center;
      background-color: rgba(0, 0, 0, 0.4);
      h1 {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}
.content {
  padding-top: 60px;
  .ranking {
    .rankingBox {
      display: flex;
      justify-content: center;
      div {
        position: relative;
        width: 300px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        cursor: pointer;
      }
      div.activity::before {
        position: absolute;
        left: -24px;
        top: 0;
        content: "";
        background-image: url("@{imgUrl}shadow-left.png");
        background-repeat: no-repeat;
        width: 24px;
        height: 100px;
      }
      div.activity::after {
        position: absolute;
        right: -24px;
        top: 0;
        content: "";
        background-image: url("@{imgUrl}shadow-right.png");
        background-repeat: no-repeat;
        width: 24px;
        height: 100px;
      }
    }
  }
  .picture {
    padding: 30px 0;
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
          li{
            width: 100%;
            height: 300px;
            border: 1px solid #e3e3e3;
          }
        }
      }
    }
  }
}
</style>

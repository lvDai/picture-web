<template>
  <div class="bottom">
    <div class="bottomBox">
      <div class="title">
        <h1>{{$t('lang.browse')}}</h1>
        <p>{{$t('lang.typeAll')}}</p>
      </div>
      <div class="lineWrap"></div>
      <div class="typeTag">
        <ul>
          <li v-for="(item, index) in categoryData" :key="index">
            <router-link :to="'/search?categoryId='+item.id">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
      <tagCloud style="width:100%" />
      <div class="footerLink">
        <div class="footerLinkBox">
          <div class="left">
            <img :src="$imageURl+'cuhk-emblem.png'" alt />
          </div>
          <div class="right">
            <ul>
              <li>
                <router-link to>{{$t('lang.consult')}}</router-link>
              </li>
              <li>
                <router-link to>{{$t('lang.contact')}}</router-link>
              </li>
              <li>
                <router-link to>{{$t('lang.privacy')}}</router-link>
              </li>
              <li>
                <router-link to>{{$t('lang.disclaimer')}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tagCloud from "@/pages/components/tagCloud.vue";
export default {
  data(){
    return{
      categoryData:[]
    }
  },
  created(){
    this.getAllCategory()
  },
  methods:{
    // 获取所有分类
    getAllCategory(){
      this.$request.get("/getAllCategory").then((result) => {
        if(result.data.status == 1){
          this.categoryData = result.data.data;
        }else{
          alert("获取类别失败");
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  components: {
    tagCloud
  }
};
</script>
<style lang="less" scoped>
.bottom {
  width: 100%;
  background-image: linear-gradient(#e9e9e9, #fff);
  .bottomBox {
    width: 100%;
    padding: 60px 140px;
    padding-bottom: 10px;
    box-sizing: border-box;
    .title {
      text-align: center;
      h1 {
        font-size: 34px;
        line-height: 46px;
      }
      p {
        font-size: 24px;
        font-weight: 450;
      }
    }
    .typeTag {
      margin-top: 60px;
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 23%;
          line-height: 56px;
          font-size: 17px;
          border-bottom: 1px dotted #555;
          margin: 0 1%;
        }
        li:hover {
          border-bottom: 1px solid #555;
        }
      }
    }
    .footerLink {
      margin-top: 80px;
      .footerLinkBox {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        .left {
          padding: 10px 0;
          img {
            height: 60px;
          }
        }
        .right {
          ul {
            display: flex;
            li {
              height: 80px;
              padding: 20px 0;
              box-sizing: border-box;
              a {
                display: block;
                line-height: 40px;
                border-left: 1px solid #555;
                padding: 0 10px;
              }
            }
            li:nth-child(1) {
              a {
                border-left: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
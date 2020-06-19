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
          <li>
            <router-link to="/search?tag=学术">学术</router-link>
          </li>
          <li>
            <router-link to="/search?tag=校园">校园</router-link>
          </li>
          <li>
            <router-link to="/search?tag=书院">书院</router-link>
          </li>
          <li>
            <router-link to="/search?tag=活动">活动</router-link>
          </li>
          <li>
            <router-link to="/search?tag=历史">历史</router-link>
          </li>
          <li>
            <router-link to="/search?tag=学习">学习</router-link>
          </li>
          <li>
            <router-link to="/search?tag=人物">人物</router-link>
          </li>
          <li>
            <router-link to="/search?tag=其他">其他</router-link>
          </li>
        </ul>
      </div>
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
export default {};
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
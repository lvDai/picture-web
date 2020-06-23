<template>
  <div class="pictureDownload" @click="clickPeriphery">
    <div class="pictureData">
      <div class="pictureDataBox">
        <div class="img">
          <img :src="$imageURl+'b/'+pictureDetailData.url" alt />
        </div>
        <div class="imgData">
          <div class="close">
            <i class="iconfont" @click="closeDetailsPages" title="关闭">&#xe61a;</i>
          </div>
          <div class="author">
            <div class="authorTitle">
              <h3>{{$t('lang.author')}}:</h3>
            </div>
            <div class="authorData">
              <span>{{pictureDetailData.name}}</span>
            </div>
          </div>
          <div class="tag">
            <div class="tagTitle">
              <h3>{{$t('lang.tag')}}:</h3>
            </div>
            <div class="tagData">
              <span v-for="(item, index) in tags" :key="index">{{item.text}}</span>
            </div>
          </div>
          <div class="publishDate">
            <div class="publishDateTitle">
              <h3>{{$t('lang.releaseDate')}}:</h3>
            </div>
            <div class="publishDateData">
              <p>{{$utility.timeFormatter(pictureDetailData.publishTime)}}</p>
            </div>
          </div>
          <div class="source">
            <div class="sourceTitle">
              <h3>{{$t('lang.source')}}:</h3>
            </div>
            <div class="sourceData">
              <p>{{pictureDetailData.source}}</p>
            </div>
          </div>
          <div class="imagePixel">
            <ul>
              <li v-for="(item, index) in pictureDetailData.images" :key="index">
                <div class="imageParameter">
                  <div class="imageParameterSelect">
                    <input
                      type="radio"
                      :value="index"
                      v-model="imageIndex"
                      name="imageIndex"
                      :id="'item'+index"
                    />
                    <label :class="(imageIndex== index)?'activity':''" :for="'item'+index"></label>
                  </div>
                  <div class="suffix">
                    <p>{{item.suffix}}</p>
                  </div>
                  <div class="pixel">
                    <p>{{item.pixel}}</p>
                  </div>
                  <div class="size">
                    <span>{{item.size}}</span>
                  </div>
                </div>
                <div class="imageDownload" v-if="item.jurisdiction!=1">
                  <i class="iconfont">&#xe60d;</i>
                  <span>{{$t('lang.downloadHint')}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="functional">
            <div class="download">
              <button @click="downloadImage">
                <i class="iconfont">&#xe723;</i>
                {{$t('lang.download')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Loading } from "element-ui";
import axios from "axios";
export default {
  props: ["pictureId"],
  data() {
    return {
      imageIndex: 0,
      user: { id: 0, name: "" },
      pictureDetailData: {},
      tags: []
    };
  },
  created() {
    this.getUser();
    this.getPictureDetail(this.pictureId);
    this.getPictureIdBytags(this.pictureId);
  },
  methods: {
    closeDetailsPages() {
      this.$emit("closePages");
    },
    //   点击下载图片验证
    downloadImage() {
      if (this.imageIndex < this.pictureDetailData.images.length) {
        let image = this.pictureDetailData.images[this.imageIndex];
        console.log(image);
        if (image.jurisdiction != 1 && !this.user.id) {
          alert("你还未登录,请先登录");
          return;
        }
        let loadingInstance = Loading.service({
          text: "正在校验权限",
          spinner: "el-icon-loading"
        });
        this.postDownloadImage(
          { id: this.user.id, imageId: image.id },
          loadingInstance
        );
      }
    },
    // 提交用户要下载的图片信息，获取要下载的图片地址
    postDownloadImage(data, loadingInstance) {
      this.$request
        .post("/postDownloadImage", data)
        .then(result => {
          loadingInstance.close();
          if (result.data.status == 1) {
            this.beginDownload(result.data.data[0].url);
          } else {
            alert(result.data.error);
          }
        })
        .catch(err => {
          loadingInstance.close();
          console.log(err);
        });
    },
    // 开始下载图片
    beginDownload(url) {
      axios
        .post(
          "/api/imageDownload",
          { url },
          {
            responseType: "blob"
          }
        )
        .then(function(res) {
          var blob = res.data;
          // FileReader主要用于将文件内容读入内存
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          // onload当读取操作成功完成时调用
          reader.onload = function(e) {
            var a = document.createElement("a");
            // 获取文件名fileName
            var fileName = res.headers["content-disposition"].split("=");
            fileName = fileName[fileName.length - 1];
            fileName = fileName.replace(/"/g, "");
            a.download = fileName;
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          };
        });
    },
    // 点击外围关闭
    clickPeriphery(e) {
      e = e || window.event;
      if (e.target.className == "pictureDownload") {
        this.$emit("closePages");
      }
    },
    // 获取用户信息
    getUser() {
      if (localStorage.myUser) {
        let user = JSON.parse(this.$utility.uncompileStr(localStorage.myUser));
        if (user && user.id) {
          this.user = user;
        }
      }
    },
    // 根据id获取图片详细信息
    getPictureDetail(id) {
      this.$request
        .get("/getPictureDetail?id=" + id)
        .then(result => {
          if (result.data.status == 1) {
            this.pictureDetailData = result.data.data;
          } else {
            alert("获取详细数据失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //   根据id获取图片的标签
    getPictureIdBytags(id) {
      this.$request
        .get("/getPictureIdBytags?id=" + id)
        .then(result => {
          if (result.data.status == 1) {
            this.tags = result.data.data;
          } else {
            alert("获取标签信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    pictureDataId() {
      return this.pictureId;
    }
  },
  watch: {
    pictureDataId(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="less" scoped>
.pictureDownload {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  .pictureData {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    width: 100%;
    height: 500px;
    background-color: #fff;
    box-shadow: 0 0 6px #888;
    border: 1px solid #e3e3e3;
    box-sizing: border-box;
    .pictureDataBox {
      display: flex;
      width: 1200px;
      margin: 0 auto;
      .img {
        padding: 70px 0;
        width: 540px;
        height: 360px;
        line-height: 360px;
        text-align: center;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .imgData {
        position: relative;
        margin-left: 40px;
        padding: 70px 0;
        width: 620px;
        box-sizing: border-box;
        .close {
          position: absolute;
          right: 0;
          top: 70px;
          transform: translate(-50%, -50%);

          i {
            cursor: pointer;
            user-select: none;
            transition: color 0.8s;
          }
          i:hover {
            color: #f42;
          }
        }
        .author {
          display: flex;
          line-height: 30px;
          .authorTitle {
            color: #898989;
            font-size: 12px;
            padding-bottom: 3px;
          }
          .authorData {
            span {
              display: block;
              margin-left: 15px;
              font-size: 12px;
            }
          }
        }
        .tag {
          .tagTitle {
            color: #898989;
            font-size: 12px;
            padding-bottom: 3px;
          }
          .tagData {
            padding-left: 40px;
            line-height: 30px;
            font-size: 12px;
          }
        }
        .publishDate {
          display: flex;
          line-height: 30px;
          .publishDateTitle {
            color: #898989;
            font-size: 12px;
          }
          .publishDateData {
            font-size: 12px;
            margin-left: 15px;
          }
        }
        .source {
          display: flex;
          line-height: 30px;
          .sourceTitle {
            color: #898989;
            font-size: 12px;
          }
          .sourceData {
            p {
              margin-left: 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 12px;
            }
          }
        }
        .imagePixel {
          margin-top: 20px;
          ul {
            li {
              display: flex;
              border-bottom: 1px solid #e3e3e3;
              .imageParameter {
                padding: 5px 0;
                display: flex;
                justify-content: space-between;
                width: 360px;
                line-height: 25px;
                font-size: 12px;
                .imageParameterSelect {
                  padding: 5px 20px;
                  input {
                    display: none;
                  }
                  label {
                    display: block;
                    width: 15px;
                    height: 15px;
                    border: 1px solid #d3d3d3;
                    border-radius: 50%;
                    cursor: pointer;
                  }
                  label.activity {
                    background-color: #e3e3e3;
                  }
                }
              }
              .imageDownload {
                line-height: 35px;
                text-align: center;
                width: 260px;
                cursor: pointer;
                user-select: none;
              }
            }
            li:nth-child(1) {
              border-top: 1px solid #e3e3e3;
            }
          }
        }
        .functional {
          display: flex;
          margin-top: 40px;
          .download {
            button {
              border: 1px solid #e3e3e3;
              width: 200px;
              height: 40px;
              line-height: 40px;
              color: #565656;
              cursor: pointer;
              outline: none;
            }
          }
        }
      }
    }
  }
}
</style>
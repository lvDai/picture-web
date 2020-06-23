<template>
  <div class="pictureData">
    <div class="pictureBalar">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="id" label="id" width="150"></el-table-column>
        <el-table-column prop="publishTime" label="发布时间" width="260"></el-table-column>
        <el-table-column prop="userId" label="作者id" width="160"></el-table-column>
        <el-table-column prop="url" label="默认图片" width="260"></el-table-column>
        <el-table-column prop="categoryId" label="分类id" width="120"></el-table-column>
        <el-table-column prop="source" label="来源"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="PictureAllPages"
      ></el-pagination>
    </div>
    <div class="showDetails" @click="clickOutside" v-if="isPictureDetails">
      <div class="showDetailsBox">
        <div class="close">
          <i class="iconfont" title="关闭" @click="isPictureDetails = false">&#xe61a;</i>
        </div>
        <div class="picture">
          <div class="id">
            <span>id:</span>
            <i>{{pictureDetailsData.id}}</i>
          </div>
          <div class="publishTime">
            <span>发布时间:</span>
            <i>{{pictureDetailsData.publishTime}}</i>
          </div>
          <div class="source">
            <span class="source">来源:</span>
            <p>{{pictureDetailsData.source}}</p>
          </div>
          <div class="userId">
            <span>作者Id</span>
            <i>{{pictureDetailsData.userId}}</i>
          </div>
          <div class="defaultUrl">
            <span>默认展示图片:</span>
            <img :src="$imageURl+'b/'+pictureDetailsData.url" alt />
          </div>
          <div class="allPicture">
            <span>所有图片:</span>
            <ul>
              <li v-for="(img, index) in pictureDetailsData.images" :key="index">
                <div class="img">
                  <img :src="$imageURl+'b/'+img.url" alt />
                </div>
                <div class="imgPixel">
                  <span>图片像素:</span>
                  <i>{{img.pixel}}</i>
                </div>
                <div class="imgSize">
                  <span>图片大小:</span>
                  <i>{{img.size}}</i>
                </div>
                <div class="imgSuffix">
                  <span>图片后缀:</span>
                  <i>{{img.suffix}}</i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      PictureAllPages: 10,
      pictureDetailsData: {},
      isPictureDetails: false,
      pictureIndex: 0
    };
  },
  created() {
    this.getPicturesPages(1, 10);
    this.getAllAuditPictures();
  },
  methods: {
    //   点击查看
    handleClick(row) {
      this.pictureIndex = this.tableData.indexOf(row);
      this.isPictureDetails = true;
      this.pictureDetailsData = row;
      this.getImages(row.id);
    },
    // 根据PictureId查询所有子类信息
    getImages(pictureId) {
      this.$request
        .get("/admin/getImages?pictureId=" + pictureId)
        .then(result => {
          if (result.data.status == 1) {
            this.$set(this.pictureDetailsData, "images", result.data.data);
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("获取子类图片失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 请求图片
    getPicturesPages(index, pages) {
      this.$request
        .get(`/admin/getPagesPicture?index=${index}&pages=${pages}`)
        .then(result => {
          if (result.data.status == 1) {
            this.tableData = result.data.data;
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("获取已审核图片失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 请求总条数
    getAllAuditPictures() {
      this.$request
        .get("/admin/getAllAuditPictures")
        .then(result => {
          if (result.data.status == 1) {
            this.PictureAllPages = result.data.data[0].count;
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("获取已审核图片失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 点击分页 val为第几页
    handleCurrentChange(val) {
      this.getPicturesPages(val, 10);
    },
    // 点击展示出来的详情页外围关闭详情页
    clickOutside(e) {
      e = e || window.event;
      if (e.target.className == "showDetails") {
        this.isPictureDetails = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.paging {
  text-align: center;
  transform: translate(-4%, 0);
  margin-top: 30px;
}
.showDetails {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  .showDetailsBox {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1100px;
    height: 70%;
    background-color: #fff;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 5px #999;
    padding: 30px 50px;
    box-sizing: border-box;
    overflow-y: auto;
    .close {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
      font-size: 18px;
      color: #343434;
      user-select: none;
      i:hover {
        color: #f42;
      }
    }
    .picture {
      div {
        display: flex;
        line-height: 40px;
        span {
          font-size: 16px;
          margin-right: 10px;
          color: #343434;
        }
        i {
          font-size: 16px;
          color: #898989;
        }
        p {
          font-size: 16px;
          color: #898989;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .defaultUrl {
        img {
          width: 120px;
          height: 120px;
        }
      }
      .allPicture {
        margin-top: 20px;
        ul {
          display: flex;
          li {
            margin: 0 5px;
            .img {
              img {
                width: 120px;
                height: 120px;
              }
            }
            div {
              line-height: 20px;
              span {
                font-size: 14px;
                color: #555;
                margin-left: none;
              }
              i {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .button {
      margin-top: 40px;
      text-align: center;
    }
  }
}
</style>
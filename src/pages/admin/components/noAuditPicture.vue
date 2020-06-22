<template>
  <div class="noAuditPicture">
    <div class="noAuditPictureBox">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="id" label="id" width="150"></el-table-column>
        <el-table-column prop="publishTime" label="发布时间" width="240"></el-table-column>
        <el-table-column prop="userId" label="作者Id" width="120"></el-table-column>
        <el-table-column prop="url" label="默认展示图片路径" width="300"></el-table-column>
        <el-table-column prop="source" label="来源"></el-table-column>
        <el-table-column fixed="right" label="操作" width="240">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
        :total="noPictureAllPages"
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
        <div class="button">
          <el-button @click="approve">审核通过</el-button>
          <el-button @click="defeated" type="danger">审核失败</el-button>
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
      noPictureAllPages: 10,
      isPictureDetails: false,
      pictureDetailsData: { images: [] },
      pictureIndex: 0
    };
  },
  created() {
    this.getPagesNoAuditPictures(1, 10);
    this.getAllNoAuditPictures();
  },
  methods: {
    // 点击查看详情
    handleEdit(index, row) {
      this.isPictureDetails = true;
      this.getImages(row.id);
      this.pictureDetailsData = row;
      this.pictureIndex = index;
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
    // 获取未审核的图片
    getPagesNoAuditPictures(index, pages) {
      this.$request
        .get(`/admin/getPagesNoAuditPictures?index=${index}&pages=${pages}`)
        .then(result => {
          if (result.data.status == 1) {
            this.tableData = result.data.data;
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("获取未审核图片失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提示
    open(args, succeed = () => {}, cancel = () => {}) {
      this.$confirm(args.content, args.title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: args.type
      })
        .then(() => {
          succeed();
        })
        .catch(() => {
          cancel();
        });
    },
    // 审核通过
    approve() {
      if (this.pictureDetailsData.id) {
        this.open(
          {
            content: "确定让此图片通过审核吗?",
            titel: "提示",
            type: "warning"
          },
          () => {
            this.$request
              .post("/admin/pictureApprove", { id: this.pictureDetailsData.id })
              .then(result => {
                this.isPictureDetails = false;
                if (result.data.status == 1) {
                  this.$message({
                    type: "success",
                    message: "成功!"
                  });
                  this.tableData.splice(this.pictureIndex, 1);
                } else if (result.data.status == 406) {
                  this.$router.push({
                    path: "/admin/login"
                  });
                } else {
                  alert("审核通过失败,服务器繁忙");
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        );
      }
    },
    // 审核失败原因
    defeatedCause(succeed = () => {}, cancel = () => {}) {
      this.$prompt("请输入审核失败原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          succeed(value);
        })
        .catch(() => {
          cancel();
        });
    },
    // 审核失败
    defeated() {
      if (this.pictureDetailsData.id) {
        this.defeatedCause(value => {
          this.isPictureDetails = false;
          this.$request
            .post("/admin/auditDefeated", {
              id: this.pictureDetailsData.id,
              cause: value
            })
            .then(result => {
              if (result.data.status == 1) {
                this.$message({
                  type: "success",
                  message: "提交成功!"
                });
                this.tableData.splice(this.pictureIndex, 1);
              } else if (result.data.status == 406) {
                this.$router.push({
                  path: "/admin/login"
                });
              } else {
                alert("审核通过失败,服务器繁忙");
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    },
    // 获取未审核的总条数
    getAllNoAuditPictures() {
      this.$request
        .get("/admin/getAllNoAuditPictures")
        .then(result => {
          if (result.data.status == 1) {
            this.noPictureAllPages = result.data.data[0].count;
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("获取未审核图片数量失败");
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
      this.getPagesNoAuditPictures(val, 10);
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
<template>
  <div class="publicAlbum">
    <div class="albumPattern">
      <div class="public">
        <input type="radio" id="public" v-model="isPublic" value="1" />
        <label for="public">公开</label>
      </div>
      <div class="private">
        <input type="radio" id="private" v-model="isPublic" value="0" />
        <label for="private">不公开</label>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="aid" label="id" width="150"></el-table-column>
      <el-table-column prop="title" label="标题" width="120"></el-table-column>
      <el-table-column prop="url" label="相簿封面图片url" width="240"></el-table-column>
      <el-table-column prop="publish" label="是否公开" width="120"></el-table-column>
      <el-table-column prop="create_date" label="创建时间" width="220"></el-table-column>
      <el-table-column prop="create_username" label="创建的用户id" width="120"></el-table-column>
      <el-table-column prop="lastmodif_username" label="修改的用户" width="120"></el-table-column>
      <el-table-column prop="lastmodify_date" label="修改的时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" @click="removeAlbume(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="albumAllPages"
      ></el-pagination>
    </div>
    <div class="albumBox" v-show="isAlbumBox" @click="closeAlbumBox">
      <div class="albumParticulars">
        <div class="albumPartiBox">
          <el-form ref="form" label-width="80px">
            <div class="title">
              <el-form-item label="相簿标题:">
                <el-input v-model="albumDetail.title"></el-input>
              </el-form-item>
            </div>
            <div class="image">
              <span>相簿封面图:</span>
              <img :src="$imageURl+'b/'+albumDetail.url" alt />
            </div>
            <div class="isPublish">
              <el-form-item label="是否公开:">
                <el-radio v-model="albumDetail.publish" label="1">公开</el-radio>
                <el-radio v-model="albumDetail.publish" label="0">不公开</el-radio>
              </el-form-item>
            </div>
            <div class="createDate">
              <span>创建时间:</span>
              <span>{{$utility.timeFormatter(albumDetail.create_date)}}</span>
            </div>
            <div class="createUser">
              <span>创建用户:</span>
              <span>{{albumDetail.create_username}}</span>
            </div>
            <div class="lastmodifyDate">
              <span>最后修改的时间:</span>
              <span>{{$utility.timeFormatter(albumDetail.lastmodify_date)}}</span>
            </div>
            <div class="lastmodifUser">
              <span>最后修改的用户:</span>
              <span>{{albumDetail.lastmodif_username}}</span>
            </div>
            <div class="desc">
              <span>相簿描述:</span>
              <div ref="editorElem" style="text-align:left;"></div>
            </div>
            <div class="button">
              <el-button type="primary" @click="preserve">保存</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  data() {
    return {
      detailId: 0,
      isPublic: 1,
      currentPage: 1,
      isAlbumBox: false,
      tableData: [],
      albumDetail: { publish: 0 },
      editor: null,
      albumAllPages:10
    };
  },
  created() {
    this.getAlbumPaging(1, 10);
    this.getAlbumAllPages();
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.albumDetail.desc = html;
      this.catchData(this.albumDetail.desc); // 把这个html通过catchData的方法传入父组件
    };
    this.editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    // 创建富文本实例
    this.editor.create();
  },
  methods: {
    // 关闭详情
    closeAlbumBox(e) {
      e = e || window.event;
      if (e.target.className == "albumBox") {
        this.isAlbumBox = false;
      }
    },
    // 请求相簿信息
    getAlbumPaging(index, pages) {
      this.$request
        .get(
          `/admin/getAlbumPaging?index=${index}&pages=${pages}&public=${this.isPublic}`
        )
        .then(result => {
          if (result.data.status == 1) {
            this.tableData = result.data.data;
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("获取相簿信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 判断要保存的数据合法
    preserve() {
      if (!this.albumDetail.title) {
        alert("标题不能为空");
        return;
      } else if (!this.albumDetail.desc) {
        alert("描述不能为空");
        return;
      }
      this.updateAlbum(this.albumDetail);
    },
    // 删除相簿
    removeAlbume(row) {
      this.removerHint(() => {
        this.$request
          .post("/admin/removeAlbume", { id: row.aid })
          .then(result => {
            if (result.data.status == 1) {
              this.tableData.splice(this.tableData.indexOf(row));
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              return;
            } else if (result.data.status == 406) {
              this.$router.push({
                path: "/admin/login"
              });
            } else {
              alert("删除失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    // 提示
    removerHint(confirm = () => {}) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          confirm();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 上传要修改的相簿的数据
    updateAlbum(data) {
      this.$request
        .post("/admin/updateAlbum", data)
        .then(result => {
          if (result.data.status == 1) {
            alert("修改成功");
            this.isAlbumBox = false;
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("修改失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //   点击编辑触发
    handleClick(row) {
      this.detailId = row.aid;
      this.isAlbumBox = true;
      this.getAlbumDetail(this.detailId);
    },
    //  获取相簿详细数据
    getAlbumDetail(id) {
      this.$request
        .get("/admin/getAlbumDetail?id=" + id)
        .then(result => {
          if (result.data.status == 1) {
            this.albumDetail = result.data.data[0];
            document.getElementsByClassName(
              "w-e-text"
            )[0].innerHTML = this.albumDetail.desc;
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("获取相簿详细信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取查看的相簿总页数
    getAlbumAllPages() {
      this.$request
        .get("/admin/getAlbumAllPages?public=" + this.isPublic)
        .then(result => {
          if(result.data.status == 1){
              this.albumAllPages = result.data.data[0].count;
          }else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("获取相簿分页信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  watch: {
    isPublic(val) {
      this.getAlbumPaging(1, 10);
      this.getAlbumAllPages();
    }
  }
};
</script>
<style lang="less" scoped>
.paging {
  text-align: center;
  margin-top: 40px;
}
.albumPattern {
  display: flex;
  line-height: 50px;
  div {
    padding: 0 10px;
  }
}
.albumBox {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  .albumParticulars {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1200px;
    height: 500px;
    padding: 30px 40px;
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    overflow-y: auto;
    .albumPartiBox {
      .title {
        width: 600px;
      }
      .imageUrl,
      .createDate,
      .createUser,
      .lastmodifyDate,
      .lastmodifUser {
        line-height: 40px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
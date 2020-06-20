<template>
  <div class="tags">
    <div class="tagsBox">
      <div class="title">
        <h1>标签</h1>
      </div>
      <div class="tagsData">
        <el-tag
          :key="index"
          v-for="(tag,index) in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag.text}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  created() {
    this.getAllTags();
  },
  methods: {
    //  删除标签
    handleClose(tag) {
      this.open(
        {
          title: "提示",
          content: "确定删除此标签吗?",
          type: "warning"
        },
        this.removeTag.bind(this, tag)
      );
    },
    //  删除数据库里面的标签
    removeTag(tag) {
      let loadingInstance = Loading.service();
      this.$request
        .post("/admin/removeTag", { id: tag.id })
        .then(result => {
          loadingInstance.close();
          if (result.data.status == 1) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("添加标签失败");
          }
        })
        .catch(err => {
          loadingInstance.close();
          console.log(err);
        });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 提示框
    open(args, succeed = () => {}, cancel = () => {}) {
      this.$confirm(args.content, args.title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: args.type
      })
        .then(() => {
          succeed();
          this.$message({
            type: "success",
            message: "成功!"
          });
        })
        .catch(() => {
          cancel();
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 添加标签
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.inputVisible = false;
        this.inputValue = "";
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (this.dynamicTags[i].text == inputValue) {
            this.open({
              title: "提示",
              content: "此标签已存在",
              type: "warning"
            });
            return;
          }
        }
        this.open(
          {
            title: "提示",
            content: "是否添加这个标签",
            type: "warning"
          },
          this.addTag.bind(this, inputValue)
        );
      }
    },
    // 添加标签
    addTag(text) {
      let loadingInstance = Loading.service();
      this.$request
        .post("/admin/addTag", { text })
        .then(result => {
          loadingInstance.close();
          if (result.data.status == 1) {
            this.dynamicTags.push({
              text: text,
              id: result.data.data.insertId
            });
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            loadingInstance.close();
            alert("添加标签失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  获取所有标签
    getAllTags() {
      this.$request
        .get("/admin/getAllTags")
        .then(result => {
          if (result.data.status == 1) {
            this.dynamicTags = result.data.data;
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("获取标签失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.tags {
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  .tagsBox {
    .title {
      font-size: 18px;
      line-height: 40px;
    }
  }
}
</style>
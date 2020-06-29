<template>
  <div class="addAlbum">
    <div class="albumData">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="title">
          <el-form-item label="相簿标题:">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </div>
        <div class="image">
          <span>相簿封面图:</span>
          <input
            type="file"
            @change="upImage"
            accept="image/gif, image/jpg, image/jpeg, image/png"
            style="display:none;"
            id="image"
          />
          <label v-if="!url" for="image">点击上传</label>
          <img v-if="url" :src="url" alt />
        </div>
        <div class="isPublish">
          <el-form-item label="是否公开:">
            <el-radio-group v-model="form.resource">
              <el-radio label="公开"></el-radio>
              <el-radio label="不公开"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="classify">
          <span>分类:</span>
          <el-checkbox-group v-model="form.checkboxGroup" size="small">
            <el-checkbox
              v-for="(item, index) in catalogs"
              :key="index"
              :label="item.cid"
              border
            >{{item.title}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="desc">
          <span>相簿描述:</span>
          <div ref="editorElem" style="text-align:left;"></div>
        </div>
        <div class="button">
          <el-form-item>
            <el-button type="primary" @click="isAlbumData">添加相簿</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  data() {
    return {
      catalogs: [],
      form: {
        title: "",
        editorContent: "",
        resource: "",
        checkboxGroup: []
      },
      editor: null,
      file: "",
      url: "",
      user: { uid: "", username: "" }
    };
  },
  created() {
    this.getAllCatalog();
      if (localStorage.myUser) {
        this.user= JSON.parse(this.$utility.uncompileStr(localStorage.myUser));
      }
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.form.editorContent = html;
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
    //   获取要上传图片信息
    upImage(e) {
      e = e || window.event;
      let file = e.currentTarget.files[0];
      if (file) {
        if (/image/.test(file.type)) {
          this.url = window.URL.createObjectURL(file);
          this.file = file;
        } else {
          alert("此文件不是图片");
        }
      }
    },
    // 获取所有分类
    getAllCatalog() {
      this.$request
        .get("/admin/getAllCatalog")
        .then(result => {
          if (result.data.status == 1) {
            this.catalogs = result.data.data;
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("获取分类信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 判断要上传的相簿信息
    isAlbumData() {
      if (!this.form.title) {
        alert("标题不能为空");
        return;
      } else if (!this.file) {
        alert("封面图片不能为空");
        return;
      } else if (!this.form.resource) {
        alert("请选择是否公开");
        return;
      } else if (!this.form.checkboxGroup.length) {
        alert("请选择分类");
        return;
      } else if (!this.form.editorContent) {
        alert("相簿描述不能为空");
        return;
      }
      this.form.resource = this.form.resource == "公开" ? 1 : 0;
      this.form.uid = this.user.uid;
      let data = new FormData();
      data.append("file", this.file);
      data.append("form", JSON.stringify(this.form));
      this.addAlbum(data);
    },
    // 上传相簿
    addAlbum(data) {
      this.$request
        .post("/admin/addAlbum", data)
        .then(result => {
          if (result.data.status == 1) {
            alert("添加成功");
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("添加失败");
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
.addAlbum {
  .albumData {
    padding: 30px 40px;
    box-sizing: border-box;
    .title {
      width: 600px;
    }
    .image {
      span {
        padding-left: 6px;
      }
      label {
        display: inline-block;
        width: 100px;
        text-align: center;
        line-height: 40px;
        background-color: #409eff;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
      }
    }
    .classify {
      display: flex;
      line-height: 30px;
      margin-bottom: 20px;
      span {
        margin-right: 10px;
      }
    }
    .button {
      margin-top: 40px;
    }
  }
}
</style>
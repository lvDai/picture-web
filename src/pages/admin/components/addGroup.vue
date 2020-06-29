<template>
  <div class="addGroup">
    <el-form ref="form" label-width="80px">
      <div class="title">
        <el-form-item label="群组标题:">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </div>
      <div class="desc">
        <span>群组描述:</span>
        <div id="wangeditor">
          <div ref="editorElem" style="text-align:left;"></div>
        </div>
      </div>
      <div class="button">
        <el-button type="primary" @click="isFormData">提交</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: null,
      form: { title: "", desc: "" },
      user: { uid: "", username: "" }
    };
  },
  created() {
    if (localStorage.myUser) {
      this.user = JSON.parse(this.$utility.uncompileStr(localStorage.myUser));
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.form.desc = html;
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
    //   判断要提交的数据是否合法
    isFormData() {
      if (!this.form.title) {
        alert("标题长度不能为空");
        return;
      } else if (!this.form.desc) {
        alert("描述不能为空");
        return;
      }
      this.form.uid = this.user.uid;
      this.addGroup(this.form);
    },
    //   添加群组
    addGroup(data) {
      this.$request
        .post("/admin/addGroup", data)
        .then(result => {
          if (result.data.status == 1) {
            alert("添加群组成功");
            return;
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("添加群组失败");
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
.addGroup {
  padding: 20px 40px;
  .title {
    width: 500px;
  }
  .desc {
    span {
      padding-left: 6px;
    }
  }
}
</style>
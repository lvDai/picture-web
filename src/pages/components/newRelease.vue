<template>
  <div class="newRelease">
    <div class="uploadPicture">
      <div class="picture">
        <input type="file" accept="image/*" @change="uploadImg" style="display:none;" id="picture" />
        <label for="picture">{{$t('lang.uploading')}}</label>
        <i>{{$t('lang.uploadingPrompt')}}</i>
      </div>
      <div class="showPicture">
        <ul>
          <li
            v-for="(item, index) in pictures"
            :class="(index==defaultDisplay)?'activity':''"
            :key="index"
          >
            <div class="showPictureImg">
              <img :src="item.url" alt />
            </div>
            <div class="showPictureContent">
              <p>{{item.name}}</p>
              <span>
                {{$t('lang.resolution')}}:
                <i>{{item.pixel}}</i>
              </span>
              <p>
                {{$t('lang.pictureSize')}}:
                <i>{{item.size}}</i>
              </p>
            </div>
            <i title="删除" @click="removePicture(index)" class="iconfont">&#xe61a;</i>
          </li>
        </ul>
      </div>
    </div>
    <div class="defaultPicture" v-if="pictures.length">
      <div class="title">
        <h1>{{$t('lang.defaultPicture')}}:</h1>
      </div>
      <el-radio-group v-model="defaultDisplay">
        <el-radio :label="index" v-for="(item, index) in pictures" :key="index">{{item.name}}</el-radio>
      </el-radio-group>
    </div>
    <div class="PictureSource">
      <div class="title">
        <h1>{{$t('lang.source')}}:</h1>
      </div>
      <div class="PictureSourceData">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="textarea"
          maxlength="64"
          show-word-limit
          rows="6"
        ></el-input>
      </div>
    </div>
    <div class="tag">
      <div class="selected">
        <div class="title">
          <span>{{$t('lang.selectedTag')}}:</span>
        </div>
        <div class="selectedData">
          <el-tag
            v-for="tag in selectedTags"
            :key="tag.text"
            closable
            @close="handleClose(tag)"
          >{{tag.text}}</el-tag>
        </div>
      </div>
      <div class="selectTag">
        <div class="title">
          <span>{{$t('lang.tag')}}:</span>
        </div>
        <div class="selectTagData">
          <ul>
            <li v-for="(item, index) in tags" :key="index" @click="addTag(index)">
              <el-tag>{{item.text}}</el-tag>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="submit">
      <el-button
        type="primary"
        @click="isUploadPictures"
        v-loading.fullscreen.lock="fullscreenLoading"
      >{{$t('lang.submit')}}</el-button>
    </div>
  </div>
</template>
<script>
import EXIF from "exif-js";
export default {
  name: "newRelease",
  data() {
    return {
      user: { id: 0, name: "" },
      tags: [],
      selectedTags: [],
      pictures: [],
      textarea: "",
      defaultDisplay: 0,
      fullscreenLoading: false,
      files: []
    };
  },
  created() {
    this.initUser();
    this.getAllTags();
  },
  methods: {
    //   获取用户信息
    initUser() {
      this.user = JSON.parse(this.$utility.uncompileStr(localStorage.myUser));
    },
    // 删除点击的标签
    handleClose(tag) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    },
    // 获取要的上传图片，并展示
    uploadImg(e) {
      let file = e.currentTarget.files[0];
      if (file) {
        if (/image/.test(file.type)) {
          let size = file.size / 1024;
          size =
            size >= 1024
              ? (size / 1024).toFixed(2) + "MB"
              : size.toFixed(2) + "kb";
          let url = window.URL.createObjectURL(file);
          let name = file.name;
          let pixel = "640*427";
          let suffix = name.substr(name.lastIndexOf(".") + 1);
          this.pictures.push({ size, url, name, pixel, suffix });
          this.files.push(file);
          EXIF.getData(file, function() {
            let data = EXIF.getAllTags(this);
          });
        } else {
          alert("此文件不是图片");
        }
      }
    },
    // 删除要上传的图片 index第几张图片
    removePicture(index) {
      this.pictures.splice(index, 1);
      this.files.splice(index, 1);
    },
    // 添加标签 index为标签的下标
    addTag(index) {
      if (this.selectedTags.length) {
        for (let i = 0; i < this.selectedTags.length; i++) {
          if (this.selectedTags[i].text == this.tags[index].text) {
            return;
          }
        }
      }
      this.selectedTags.push(this.tags[index]);
    },
    // 判断要上传的内容是否合法
    isUploadPictures() {
      this.fullscreenLoading = true;
      let hint = this.$t("lang.hint");
      let confirm = this.$t("lang.confirm");
      if (!this.user.id) {
        this.open({
          content: this.$t("lang.pleaseLoginFirst"),
          title: hint,
          confirm: confirm
        });
        return;
      } else if (!this.pictures.length) {
        this.open({
          content: "至少需要上传一张图片",
          title: hint,
          confirm: confirm
        });
        return;
      } else if (!this.selectedTags.length) {
        this.open({
          content: "至少需要选择一个标签",
          title: hint,
          confirm: confirm
        });
        return;
      } else if (!this.textarea.length) {
        this.open({ content: "请说明来源", title: hint, confirm: confirm });
        return;
      }
      let data = new FormData();
      data.append("pictures", JSON.stringify(this.pictures));
      data.append("defaultDisplay", this.defaultDisplay);
      data.append("textarea", this.textarea);
      data.append("userId", this.user.id);
      data.append("selectedTags", JSON.stringify(this.selectedTags));
      for (let i = 0; i < this.pictures.length; i++) {
        data.append("files", this.files[i], this.files[i].name);
      }
      this.uploadPictures(data);
    },
    // 上传图片信息
    uploadPictures(data) {
      this.$request
        .post("/addPicture", data)
        .then(result => {
          let hint = this.$t("lang.hint");
          let confirm = this.$t("lang.confirm");
          if (result.data.status == 1) {
            this.open({ content: "上传成功", title: hint, confirm: confirm });
          } else {
            this.open({ content: "上传失败", title: hint, confirm: confirm });
          }
          this.fullscreenLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.fullscreenLoading = false;
          alert("上传失败");
        });
    },
    // 获取所有标签
    getAllTags() {
      this.$request
        .get("/getAllTags")
        .then(result => {
          if(result.data.status == 1){
            this.tags = result.data.data;
          }else{
            alert("获取标签失败");
          }
        })
        .catch(err => {
          console.log(err)
        });
    },
    // 提示 args提示内容
    open(args) {
      this.$alert(args.content, args.title, {
        confirmButtonText: args.confirm,
        callback: action => {
          this.fullscreenLoading = false;
        }
      });
    },
    // 清空已经上传的数据
    emptyData() {
      this.pictures.length = 0;
      this.selectedTags.length = 0;
      this.textarea = "";
    }
  }
};
</script>
<style lang="less" scoped>
.newRelease {
  padding: 20px 40px;
  .uploadPicture {
    .picture {
      label {
        display: inline-block;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 4px;
        background-color: #409eff;
        color: #fff;
        cursor: pointer;
      }
      i {
        font-size: 12px;
        color: #999;
      }
    }
    .showPicture {
      ul {
        li {
          position: relative;
          display: flex;
          border: 1px solid #e3e3e3;
          width: 360px;
          height: 100px;
          padding: 10px;
          box-sizing: border-box;
          border-radius: 5px;
          margin-top: 10px;
          transition: background-color 0.6s;
          .showPictureImg {
            img {
              width: 80px;
              height: 80px;
            }
          }
          .showPictureContent {
            margin-left: 10px;
            width: 240px;
            padding-top: 12px;
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          i {
            cursor: pointer;
          }
          i:hover {
            color: #f42;
          }
        }
        li.activity {
          background-color: rgba(64, 158, 253, 0.3);
        }
      }
    }
  }
  .defaultPicture {
    margin-top: 15px;
  }
  .PictureSource {
    margin-top: 15px;
    .title {
      line-height: 40px;
    }
    .PictureSourceData {
      width: 600px;
      .el-textarea {
        /deep/ .el-textarea__inner {
          resize: none !important;
        }
      }
    }
  }
  .tag {
    .selected {
      .title {
        line-height: 40px;
      }
      .selectedData {
        padding: 0 100px;
      }
    }
    .selectTag {
      .title {
        line-height: 40px;
      }
      .selectTagData {
        padding: 0 100px;
        ul {
          display: flex;
          li {
            padding-right: 5px;
            span {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .submit {
    margin-top: 40px;
    button {
      border: none;
      width: 120px;
      height: 50px;
      border-radius: 5px;
      cursor: pointer;
      outline: 0 none !important;
      color: #fff;
      background-color: #409eff;
    }
  }
}
</style>
<template>
  <div class="addAlbumJoinGroup">
    <div class="group">
      <span>请选择群组:</span>
      <el-select v-model="group" placeholder="请选择群组">
        <el-option v-for="item in groups" :key="item.gid" :label="item.title" :value="item.gid"></el-option>
      </el-select>
    </div>
    <div class="album">
      <span>请选择相簿:</span>
      <el-select
        :disabled="!albums.length"
        v-model="album"
        multiple
        collapse-tags
        placeholder="请选择"
      >
        <el-option v-for="item in albums" :key="item.aid" :label="item.title" :value="item.aid"></el-option>
      </el-select>
    </div>
    <div class="button">
      <el-button type="primary" @click="isAlbumData">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      groups: [],
      group: "",
      album: [],
      albums: []
    };
  },
  created() {
    this.getAllGroup();
  },
  methods: {
    //   获取所有的群组
    getAllGroup() {
      this.$request
        .get("/admin/getAllGroup")
        .then(result => {
          if (result.data.status == 1) {
            this.groups = result.data.data;
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("获取群组失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取不是这个群组下的相簿
    getNoGidAlbum(id) {
      this.$request
        .get("/admin/getNoGidAlbum?id=" + id)
        .then(result => {
          if (result.data.status == 1) {
            this.albums = result.data.data;
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("获取相簿信息相簿");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //   点击保存
    isAlbumData() {
      if (!this.album.length) {
        alert("请选择相簿");
        return;
      }
      this.$request
        .post("/admin/addAlbumGroup", { gid: this.group, aids: this.album })
        .then(result => {
          console.log(result);
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
        .catch(err => {});
    }
  },
  watch: {
    group(val) {
      this.albums.length = 0;
      this.album.length = 0;
      this.getNoGidAlbum(val);
    }
  }
};
</script>
<style lang="less" scoped>
.addAlbumJoinGroup {
  padding: 30px;
  .group {
    margin-bottom: 40px;
  }
  .button {
    margin-top: 40px;
  }
}
</style>
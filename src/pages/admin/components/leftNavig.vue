<template>
  <div>
    <div class="leftNavigBox">
      <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">用户管理</span>
          </template>
          <router-link to="/admin/">
            <el-menu-item-group>
              <el-menu-item index="1-1">用户信息</el-menu-item>
            </el-menu-item-group>
          </router-link>
        </el-submenu>
        <router-link to="/admin/tags">
          <el-menu-item index="2">
            <i class="el-icon-magic-stick"></i>
            <span slot="title">标签管理</span>
          </el-menu-item>
        </router-link>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">图片管理</span>
          </template>
          <router-link to="/admin/pictureData">
            <el-menu-item-group>
              <el-menu-item index="3-1">已审核图片</el-menu-item>
            </el-menu-item-group>
          </router-link>
          <router-link to="/admin/noAuditPicture">
            <el-menu-item-group>
              <el-menu-item index="3-2">未审核图片</el-menu-item>
            </el-menu-item-group>
          </router-link>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </template>
          <router-link to="/admin/category">
            <el-menu-item-group>
              <el-menu-item index="4-1">查看分类</el-menu-item>
            </el-menu-item-group>
          </router-link>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-s-management"></i>
            <span slot="title">相簿管理</span>
          </template>
          <router-link to="/admin/addAlbum">
            <el-menu-item-group>
              <el-menu-item index="5-1">新增相簿</el-menu-item>
            </el-menu-item-group>
          </router-link>
          <router-link to="/admin/publicAlbum">
            <el-menu-item-group>
              <el-menu-item index="5-2">查看相簿</el-menu-item>
            </el-menu-item-group>
          </router-link>
        </el-submenu>
         <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">banner管理</span>
          </template>
          <router-link to="/admin/addBanner">
            <el-menu-item-group>
              <el-menu-item index="6-1">添加banner</el-menu-item>
            </el-menu-item-group>
          </router-link>
           <router-link to="/admin/banner">
            <el-menu-item-group>
              <el-menu-item index="6-2">查看banner</el-menu-item>
            </el-menu-item-group>
          </router-link>
        </el-submenu>
                 <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-s-data"></i>
            <span slot="title">群组管理</span>
          </template>
          <router-link to="/admin/lookGroup">
            <el-menu-item-group>
              <el-menu-item index="7-1">查看群组</el-menu-item>
            </el-menu-item-group>
          </router-link>
           <router-link to="/admin/addGroup">
            <el-menu-item-group>
              <el-menu-item index="7-2">添加群组</el-menu-item>
            </el-menu-item-group>
          </router-link>
           <router-link to="/admin/addAlbumJoinGroup">
            <el-menu-item-group>
              <el-menu-item index="7-3">添加相簿到群组</el-menu-item>
            </el-menu-item-group>
          </router-link>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 700px;
}
.leftNavigBox {
  position: fixed;
  left: 0;
  top: 81px;
  z-index: 99;
  a.router-link-exact-active.router-link-active {
    color: #409eff;
  }
}
</style>
<template>
  <div>
    <div class="leftNavigBox">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
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
              <el-menu-item index="3-1">图片详情</el-menu-item>
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
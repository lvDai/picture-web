<template>
  <div>
    <div class="categoryBox">
      <el-table :data="categoryData" border style="width: 100%">
        <el-table-column prop="cid" label="id" width="180"></el-table-column>
        <el-table-column prop="title" label="分类名"></el-table-column>
        <el-table-column prop="desc" label="描述" width="180"></el-table-column>
        <el-table-column prop="create_date" label="创建时间"></el-table-column>
        <el-table-column prop="create_uid" label="创建的用户id" width="180"></el-table-column>
        <el-table-column prop="lastmodify_date" label="修改的时间"></el-table-column>
        <el-table-column prop="lastmodify_uid" label="最后修改的用户id"></el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="categoryAllPages"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryData: [],
      categoryAllPages: 10,
      currentPage: 1
    };
  },
  created() {
    this.getAllCategory();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 点击分页 val为第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 获取所有的分类
    getAllCategory() {
      this.$request
        .get("/admin/getAllCategory")
        .then(result => {
          if (result.data.status == 1) {
            this.categoryData = result.data.data;
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("获取标签信息失败");
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
.paging {
  text-align: center;
  .el-pagination {
    transform: translate(-3%, 0);
  }
}
</style>
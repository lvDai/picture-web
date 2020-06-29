<template>
  <div class="lookGroup">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="gid" label="id" width="150"></el-table-column>
      <el-table-column prop="title" label="标题" width="210"></el-table-column>
      <el-table-column prop="create_date" label="创建时间" width="210"></el-table-column>
      <el-table-column prop="lastmodify_date" label="最后修改的时间" width="210"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="removeHint(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getPagingGroup(1, 10);
  },
  methods: {
    // 点击删除时执行
    removeHint(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //   this.$message({
          //     type: "success",
          //     message: "删除成功!"
          //   });
          this.removeGroup(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除群组
    removeGroup(data) {
      this.$request
        .post("/admin/removeGroup?id=" + data.gid)
        .then(result => {
          if (result.data.status == 1) {
            this.tableData.splice(this.tableData.indexOf(data));
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else if (result.data.status == 406) {
            this.$router.push({
              path: "/admin/login"
            });
          } else {
            alert("删除群组失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分页查询群组
    getPagingGroup(index, pages) {
      this.$request
        .get(`/admin/getPagingGroup?index=${index}&pages=${pages}`)
        .then(result => {
          if (result.data.status == 1) {
            this.tableData = result.data.data;
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
    }
  }
};
</script>
<style lang="less" scoped>
</style>
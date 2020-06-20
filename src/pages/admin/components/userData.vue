<template>
  <div class="userData">
    <div class="userBox">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="name" label="用户名" width="240"></el-table-column>
        <el-table-column prop="status" label="状态(0为不正常1为正常)"></el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="userAllPages"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      userAllPages: 10
    };
  },
  created() {
    this.getUserPaging(1, 10);
    this.getUserAllPages();
  },
  methods: {
    //   分页查询用户信息
    getUserPaging(index, pages) {
      this.$request
        .get(`/admin/getUserPaging?index=${index}&pages=${pages}`)
        .then(result => {
          if (result.data.status == 1) {
            this.tableData = result.data.data;
          } else {
            alert("获取user信息错误");
          }
        })
        .catch(err => {
          console.log(err);
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
            message: "删除成功!"
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
    // 获取用户总页数
    getUserAllPages() {
      this.$request
        .get("/admin/getUserAllPages")
        .then(result => {
          if (result.data.status == 1) {
            this.userAllPages = result.data.data[0].count;
          } else {
            alert("获取用户总数失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 点击分页 val为第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 点击编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 点击删除
    handleDelete(index, row) {
      console.log(index, row);
      this.open({
        title: "提示",
        content: "此操作将永久删除该用户, 是否继续?",
        type: "warning"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.userData {
  .userBox {
    padding: 40px;
  }
  .paging {
    text-align: center;
    .el-pagination {
      transform: translate(-3%, 0);
    }
  }
}
</style>
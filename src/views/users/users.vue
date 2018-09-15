<template>
<div class="userlist">
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="table">
    <el-table
      :data="tabledata">
      <el-table-column
        prop="nickname"
        label="姓名"
        width="220">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="个性签名"
        width="300">
      </el-table-column>
      <el-table-column
        prop="avatar"
        label="用户图像"
        width="250">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" class="avatar">
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button size="small" type="primary">
            编辑
          </el-button>
          <el-button @click="hendledelete(scope.row._id)" size="small" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</div>
</template>

<script>
    export default {
      data() {
        return {
          tabledata: []
        }
      },
      methods: {
        getData() {
          this.$axios.get('/user').then(res => {
            if (res.code == 200) {
              this.tabledata = res.data
            }
          })
        },
        // hendlecheck() {
        //     router.push
        // },
        hendledelete(id) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.$axios.post('/user/delete', {userIds: [id]}).then( res => {
              this.$message.success(res.msg);
              this.getData();
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      created() {
          this.getData()
        }
      }

</script>

<style scoped lang="scss">
  .userlist{
    .table{
      margin:30px auto;
      .avatar{
        width: 90px;
        height: 90px;
        border-radius:45px;

      }
    }

  }

</style>

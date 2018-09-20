<template>
    <div>
      <div>
        面包屑
      </div>
      <div class="swiperlist-wrap">
        <h2 style="text-align: center">轮播图列表</h2>
        <el-table :data="swiperData">
          <el-table-column property="img" label="轮播头图" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.img" class="img-item">
            </template>
          </el-table-column>
          <el-table-column property="title" label="标题" width="280"></el-table-column>
          <el-table-column property="img" label="书籍头图" width="200">
            <template slot-scope="scope">
              <img :src="scope.row.book.img" class="img-item">
            </template>
          </el-table-column>
          <el-table-column prop="book.author" label="作者" width="180"> </el-table-column>

          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row._id)" size="mini" type="primary">编辑</el-button>
              <el-button @click="handledel(scope.row._id)" size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pages"
          background
          @current-change="changepage"
          :page-size="8"
          layout="prev, pager, next"
          :total="swipercount">
        </el-pagination>
      </div>

    </div>
</template>

<script>
    export default {
        name: "swiperlist",
      data(){
          return {
            swiperData:[],
            page:1,
            swipercount:0
          }
      },
      methods:{
          getData(){
            this.$axios.get(`/swiper?pn=${this.page}&size=8`).then( res => {
              console.log(res)
              if(res.code === 200){
                this.swiperData = res.data
                this.swipercount = res.count
              }
            })
          },
        handledel(id) {
          console.log(id)
          this.$confirm('此操作将删除轮播图, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.$axios.post('/swiper/delete', {ids: [id]}).then( res => {
              console.log(res)
              this.$message.success(res.msg);
              this.getData();
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        handleEdit(id){
            this.$router.push({name:'Editswiper',query:{id}})
        },
        changepage(p){
            this.page = p
            this.getData()
        }

      },
      created(){
          this.getData();
      }
    }
</script>

<style scoped lang="scss">
.swiperlist-wrap{
  width: 1000px;
  height: 1000px;
  margin: 20px auto;

  .pages{
    text-align: center;
  }

  .img-item{
    width: 80px;
    height: 100px;
  }
}
</style>

<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/classlist'}">分类列表</el-breadcrumb-item>
        <el-breadcrumb-item>{{this.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table
        :data="books"
        border

        class="books-wrap">
        <el-table-column
          label="封面"
          width="100"
          style="height: 100px">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="books-img">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="书名"
          style="height: 100px"
          width="150">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          width="100">
        </el-table-column>

        <el-table-column
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button type="primary" @click="hendleDetail(scope.row._id)">修改</el-button>
            <el-button type="danger" @click="hendledel(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--label="简介"-->
          <!--width="300"-->
          <!--style="height: 100px">-->
          <!--<template slot-scope="scope" class="books-desc">-->
            <!--{{scope.row.desc}}-->
          <!--</template>-->
        <!--</el-table-column>-->

      </el-table>
      <div v-if="!isshow">
        <el-pagination
          background
          @current-change="changepage"
          :page-size="8"
          layout="prev, pager, next"
          :total="count">
        </el-pagination>
      </div>

    </div>
</template>

<script>
  import Router from '@/router'
    export default {
        name: "bookslist",
      data(){
          return {
            foemdata:{
              _id:''
            },
            id:'',
            books:[],
            page:1,
            count:0,
            title:'',
            isshow:true
          }
      },
      methods:{
          getData(){
            this.$axios.get(`/category/${this.id}/books?pn=${this.page}&size=8`).then( res => {
              console.log(res)
              if( res.code === 200){
                this.books = res.data.books
                this.count = res.count
                this.title = res.data.title
              }
            })
          },
        changepage(p){
            this.page = p;
            this.getData()
        },
        hendleDetail(id){
            this.$axios.get(`/book/${id}`).then( res => {
              console.log(res)
              this.$store.commit('CHANGE_BOOKDATA',res.data);
              Router.push('/layout/bookdetail')
            })

        },
        hendledel(id){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$axios.del(`/book/${id}`).then( res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              router.push('/layout/bookslist')
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

        }


      },
      created(){
        this.formdata = { ...this.$store.state.classData}
        console.log(this.formdata._id)
        this.id = this.formdata._id;
        this.getData();
        this.isshow = this.count > 8 ? true : false
      }
    }
</script>

<style scoped lang="scss">
  .books-wrap{
    margin-top: 20px;

    .books-img{
      width: 60px;
      height: 90px;
    }


  }
  .books-desc{
    width:300px;
    height:100px;
    line-height:100px;
    white-space : nowrap;
    overflow: hidden;
    text-overflow: ellipsis

  }

</style>

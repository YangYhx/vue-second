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
          width="100">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="books-img">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="书名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          width="100">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="简介"
          type="textarea"
          class="books-desc">
          <template>

          </template>
        </el-table-column>

      </el-table>
      <div v-if="">
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
            isshow:false
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
        }

      },
      created(){
        this.formdata = { ...this.$store.state.classData}
        console.log(this.formdata._id)
        this.id = this.formdata._id;
        this.getData();
      },
      watch:{
          page(){
            this.isshow = this.count > 5 ? 'true' : 'false'
          }
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
    /deep/
    .books-desc{
      width: 200px;
      height: 100px;
      line-height: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

</style>

<template>
<div>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>


  <div class="table-wrap">
    <el-table
      :data="classData">
      <el-table-column
        prop="title"
        label="分类名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.icon"  class="icon">
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="360">
        <template slot-scope="scope">
          <el-button size="mini" @click="hendleBooks(scope.row)" type="primary">
            查看书籍
          </el-button>
          <el-button size="mini" @click="hendleEdit(scope.row)" type="primary">
            编辑
          </el-button>
          <el-button size="mini" @click="hendleDel(scope.row._id)" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center"
      background
      @current-change="currentPage"
      :page-size="10"
      layout="prev, pager, next"
      :total="count">
    </el-pagination>
  </div>



</div>
</template>

<script>
  import Router from '@/router'
    export default {
        name: "classlist",
      data(){
        return {
          classData:[],
          page:1,
          count:0
        }
      },
      methods:{
          getData(){
            this.$axios.get(`/category?pn=${this.page}&size=10`).then( res => {
              console.log(res)
              if(res.code === 200){
                this.classData = res.data;
                this.count = res.count
              }
            })
          },
        hendleEdit(classdata){
            console.log(classdata)
          this.$store.commit('CHANGE_CLASSDATA',classdata)
          Router.push('/layout/classEdit')
        },
        hendleDel(id){
          console.log(id)
          this.$axios.del(`/category/${id}`).then( res => {
            console.log(res)
            if(res.code === 200){
              this.$message.success('删除成功');
              this.getData();
            }
          })
        },
        hendleBooks(classdata){
          this.$store.commit('CHANGE_CLASSDATA',classdata)
          Router.push('/layout/bookslist')
        },
        currentPage(p){
            this.page = p;
            this.getData()
        }

      },
      created(){
          this.getData()
      }
    }
</script>

<style scoped lang="scss">
  .table-wrap{
    margin: 20px auto;
    width: 720px;
    height: 988px;
    .icon{
      width: 60px;
      height: 60px;
      border-radius: 30px;
    }

  }

</style>

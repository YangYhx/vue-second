<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>添加轮播图</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="add-swiper">
      <h2 style="text-align: center">添加轮播图</h2>
      <el-form :model="formdata" class="form-500" >
        <el-form-item label="轮播图标题">
          <el-input v-model="formdata.title"></el-input>
        </el-form-item>
        <el-form-item label="轮播图书籍">
          <el-select v-model="formdata.category"  @change="handleShowdialog">
            <el-option
              v-for="(item, index) in categoryData"
              :key="index"
              :label="item.title"
              :value="item._id">
            </el-option>
          </el-select>

          <div class="book-item clearfix" v-if="selectedBook[0]">
            <div class="img-wrap fll">
              <img :src="selectedBook[0].img" alt="" class="img-item">
            </div>
            <div class="selectbooks fll">
              <div class="title">
                标题：{{selectedBook[0].title}}
              </div>
              <div class="author">
                作者：{{selectedBook[0].author}}
              </div>
            </div>

          </div>

        </el-form-item>
        <el-form-item label="轮播图头图">
          <imgupload v-model="formdata.img" class="fll image"></imgupload>
        </el-form-item>
        <el-form-item label="轮播图排序">
          <el-input-number v-model="formdata.index" :min="1" lable="数字越大越靠前" ></el-input-number>
        </el-form-item>
      </el-form>
      <el-button type="danger" @click="handleSubmit" v-if="this.$route.name === 'addswiper'">添加</el-button>
      <el-button type="primary" @click="handlesavaEdit" v-else>保存修改</el-button>


      <el-dialog  title="书籍列表"
                  :visible.sync="isShowdialog"
                  width="70%">
        <el-table :data="bookData">
          <el-table-column property="title" label="书名" width="300"></el-table-column>
          <el-table-column property="img" label="书籍头图" width="150">
            <template slot-scope="scope">
              <img :src="scope.row.img" class="image" alt="">
            </template>
          </el-table-column>
          <el-table-column property="author" label="作者" width="300"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button @click="handleAdd(scope.row._id)" size="mini" type="primary">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pnChange"
          :total="bookCount">
        </el-pagination>

      </el-dialog>

    </div>

  </div>
</template>

<script>
  import imgupload from '@/components/updata'
    export default {
        name: "addswiper",
      components:{
          imgupload,
      },
      data(){
          return {
            formdata:{
              title:'',
              img:'',
              category:'',
              book:'',
              index:''
            },
            isShowdialog:false,
            bookpn:1,
            bookSize:3,
            bookData:[],
            categoryData:[],
            bookCount:0
          }
      },
      methods:{
          getCategory(){
            this.$axios.get('/category').then( res => {
              this.categoryData = res.data
            })
          },
        getData(){
            let parms = {size:this.bookSize,pn:this.bookpn};
            this.$axios.get(`/category/${this.formdata.category}/books`,parms).then( res => {
              this.bookData = res.data.books;
              this.bookCount = res.count
            })
        },
        handleShowdialog(){
            this.isShowdialog=true
          this.getData();
        },
        handleAdd(id){
            this.formdata.book = id;
            this.isShowdialog = false
        },
        handleSubmit(){
            this.$axios.post('/swiper',this.formdata).then( res => {
              if(res.code === 200){
                this.$message.success('添加成功，正在跳转')
                this.$router.push({name: 'swiperlist'})
              }
            })
        },
        handlesavaEdit(){
            this.$axios.put(`/swiper/${this.$route.query.id}`,this.formdata).then( res => {
              if(res.code === 200 ){
                this.$message.success('修改成功')
                this.$router.push({name:'swiperlist'})
              }
            })
        },
        getInit(){
          this.$axios.get(`/swiper/${this.$route.query.id}`).then( res => {
            console.log(res)
            this.formdata = {
              ...this.formdata,
              ...res.data,
              book:res.data.book._id,
              category:res.data.book.type
            }
            this.getData()

          });

        },
        pnChange(pn){
            this.bookpn = pn;
            this.getData();
        }
      },

      created(){
        this.getCategory();
        if(this.$router.name === 'addswiper'){
            this.formdata={
              title:'',
              img:'',
              category:'',
              book:'',
              index:''
            }
        }else {
            this.getInit()
        }
      },
      computed:{
        selectedBook(){
            if( this.bookData.length > 0 ){
              return this.bookData.filter( item => item._id === this.formdata.book)
            }else {
              return []
            }
          }
      }
    }
</script>

<style scoped lang="scss">
.book-item{
  width: 430px;
  border: 1px solid #999;
  margin-top: 20px;
  line-height: 1.5;
  padding: 15px;
  border-radius: 4px;
}


  .image{
    width: 100px;
    height: 120px;
  }
.selectbook {
  margin-left: 20px;

  .title {
    color: #333;
    font-weight: 700;
    font-size: 15px;
  }

  .author {
    color: #444;
  }

}
</style>

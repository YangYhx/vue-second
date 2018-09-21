<template>
  <div>
    <div>

    </div>
    <div class="bookdetaol-wrap">
      <el-form :model="bookdata" label-width="80px" label-position="left" >
        <el-form-item label="书名">
          <el-input v-model="bookdata.title"></el-input>
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="bookdata.author"></el-input>
        </el-form-item>
        <el-form-item label="书籍排序">
          <el-input-number v-model="bookdata.index" :min="1" ></el-input-number>
        </el-form-item>
        <el-form-item label="书籍图片">
          <upImg v-model="bookdata.img" class="addclass-img"></upImg>
        </el-form-item>

        <el-form-item label="简介">
          <el-input type="textarea" class="desc" v-model="bookdata.desc"></el-input>
        </el-form-item>

        <el-button type="primary" @click="hendleEdit">
          保存修改
        </el-button>

      </el-form>
    </div>

  </div>




</template>

<script>
  import upImg from '@/components/updata'
    export default {
        name: "lookbooks",
      components:{
        upImg
      },
        data(){
          return {
            bookdata:{
              title:'',
              desc:'',
              type:'',
              img:'',
              author:'',
              book_id:'',
              index:'',
              _id:''
            },
            category:''
          }
      },
      methods:{
          getcategory(){
            let id = this.bookdata.type;
            this.$axios.get(`/category/${id}`).then( res => {
              // console.log(res.data.title)
              this.category = res.data.title
            })
          },
        hendleEdit(id){
            this.$axios.put(`/book`,this.bookdata,{
              'Content-type':'application/x-www-form-urlencoded'
            }).then( res => {
              if(res.code === 200){
                this.$message.success(res.msg);
                this.$router.push('/layout/bookslist')
              }
            })
        }

      },
      created() {
        this.bookdata = {
          ...this.$store.state.bookData
        };
        this.bookdata.book_id = this.bookdata._id;
        this.getcategory();
      }
    }
</script>

<style scoped>
  .bookdetaol-wrap{
    width: 600px;
  }
  .addclass-img{
    width: 100px;
    height: 130px;
  }
  .desc{
    height:100px;
    line-height:2;
    white-space : nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

</style>

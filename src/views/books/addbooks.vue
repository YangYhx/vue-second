<template>
    <div>
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>添加书籍</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
     <el-form :model="formdata" class="form-500">
       <el-form-item label="网址">
         <el-input v-model="formdata.url"></el-input>
       </el-form-item>
       <el-form-item label="作者">
         <el-input v-model="formdata.author"></el-input>
       </el-form-item>
       <el-form-item label="书籍头图">
         <el-switch v-model="isUpload" active-text="手动上传" inactive-text="头图上传">
         </el-switch>
         <el-input v-model="formdata.img" v-if="!isUpload"></el-input>
         <upload-img v-model="formdata.img" v-else></upload-img>
       </el-form-item>
       <el-form-item label="分类">
         <el-select v-model="formdata.typeid" placeholder="选择分类">
           <el-option v-for="(item,index) in categarydata"
           :key="index"
           :label="item.title"
           :value="item._id">
           </el-option>
         </el-select>
       </el-form-item>
     </el-form>
      <el-button @click="hendlesubmit">提交</el-button>
    </div>
</template>

<script>
    export default {
        name: "addbooks",
      data(){
          return {
            formdata:{
              url:'',
              author:'',
              img:'',
              typeid:''
            },
            isUpload:true,
            categarydata:[]
          }
      },
      methods:{
        getcategory(){
          this.$axios.get('/category?size=50').then( res => {
            console.log(res.data)
            this.categarydata = res.data
          })

        },
        hendlesubmit(){
          this.$axios.post('/book',this.formdata).then( res => {
            if(res.code === 200){
              this.$message.success(res.msg)
            }
          })
        },
      },
      created(){
          this.getcategory()
      }
    }
</script>

<style scoped>

</style>

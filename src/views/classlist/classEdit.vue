<template>
    <div>
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/layout/classlist'}">分类列表</el-breadcrumb-item>
          <el-breadcrumb-item>修改分类</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="classEdit-wrap">
        <h2 style="text-align: center;margin-bottom: 20px">修改分类</h2>
        <el-form :model="classData" label-width="80px" label-position="left" >
          <el-form-item label="分类名">
            <el-input v-model="classData.title"></el-input>
          </el-form-item>
          <el-form-item label="分类排序">
            <el-input v-model="classData.index"></el-input>
          </el-form-item>
          <el-form-item label="分类图片">
            <upImg v-model="classData.icon" class="addclass-img"></upImg>
          </el-form-item>

            <el-button type="primary" @click="hendleEdit(classData._id)" class="btn">
              保存修改
            </el-button>

        </el-form>
      </div>

    </div>
</template>

<script>
  import upImg from '@/components/updata';
    export default {
        name: "classEdit",
      data(){
          return {
            classData:{
              title:'',
              icon:'',
              index:'',
              _id:''
            }
          }
      },
      components:{
        upImg,
      },
      methods:{
        hendleEdit(id){
          this.$axios.put(`/category/${id}`,this.classData).then( res => {
            console.log(res)
            if(res.code === 200){
              this.$message.success('修改成功')
            }
          })

        }
      },
      created(){
          this.classData = {
            ...this.$store.state.classData
          }
          console.log(this.classData.index)
      }
    }
</script>

<style scoped lang="scss">

  .classEdit-wrap{

    width: 600px;
    width: 400px;
    margin: 20px auto;
    text-align: center;
    .addclass-img{
      width: 320px;
      height: 320px;
    }
  }

</style>

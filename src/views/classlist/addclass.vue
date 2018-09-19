<template>
    <div class="addclass-wrap">
      <h2>添加分类</h2>
      <el-form label-width="80px" label-position="left">
        <el-form-item label="类名">
          <el-input v-model="classData.title"></el-input>
        </el-form-item>
        <el-form-item label="分类排序">
          <el-input v-model="classData.index"></el-input>
        </el-form-item>
        <el-form-item label="分类图片">
          <upImg v-model="classData.icon" class="addclass-img"></upImg>
        </el-form-item>
        <el-button type="primary" @click="hendleadd" class="btn">
          添加
        </el-button>
      </el-form>
    </div>
</template>

<script>
  import upImg from '@/components/updata';
    export default {
        name: "addclass",
      components:{
        upImg,
      },
      data(){
          return {
            classData:{
              title:'',
              icon:'',
              index:''
            }
          }
      },
      methods:{
        hendleadd(){
          this.$axios.post('/category',this.classData).then( res => {
            console.log(res)
            if(res.code === 200){
              this.$message.success('添加成功')
            }

          })
        }
      }
    }
</script>

<style scoped lang="scss">
  .addclass-wrap{
    width: 400px;
    height: 400px;
    margin: 20px auto;
    /*text-align: center;*/

    .addclass-img{
      width: 200px;
      height: 200px;
    }

    .btn{
      /*position: absolute;*/
      width: 40%;
    }
  }

</style>

<template>
    <div class="wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>

      </el-breadcrumb>

      <h2>修改个人信息</h2>

      <el-form :model="formdata" size="small" label-position="left" label-width="100px" class="form-wrap">
        <el-form-item label="用户名">
            <el-input v-model="formdata.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formdata.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="用户头像">
          <updataimg v-model="formdata.avatar"></updataimg>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="formdata.desc"></el-input>
        </el-form-item>
        <el-button type="primary" @click="hendleclick">
          保存信息
        </el-button>
      </el-form>
    </div>
</template>

<script>
  import updataimg from '@/components/updata'
    export default {
    // props:{
    //   value:{
    //     type:String
    //   }
    // },
      data(){
          return {
            formdata:{
              username:'',
              nickname:'',
              desc:'',
              avatar:'',
              email:''
            },
          }
      },
      components:{
        updataimg,
      },
      created(){
        this.initdata()
      },
      methods:{
        hendleclick(){
          this.$axios.put('/user/userInfo',this.formdata).then( res => {
            console.log(res)
            if(res.code == 200){
              let userinfo = res.data
              this.$store.commit('CHANGE_USERINFO',userinfo)
              this.initdata();
              this.$message.success('修改成功')
            }

          })
        },
        initdata(){
            this.formdata = {
              ...this.$store.state.userinfo
            }
        }
      },
      watch:{
        value(val){
          this.formdata.avatar = val
        }
      }
    }
</script>

<style scoped lang="scss">
.wrap{
  height: 500px;
text-align: center;
  .form-wrap{
  width: 400px;
    margin: 20px auto;
  }
}
</style>

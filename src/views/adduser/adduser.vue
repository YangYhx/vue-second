<template>
    <div>
      <el-form :model="formdata" size="small" label-width="100px" label-position="left" class="container">
        <el-form-item label="用户名">
          <el-input v-model="formdata.username" placeholder="设置用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.password" placeholder="设置密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="formdata.cheackpassword" placeholder="请再次确认密码"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formdata.nickname" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email" placeholder="填写邮箱"></el-input>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="formdata.desc" type="textarea" placeholder="个性签名"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <updata v-model="formdata.avatar"  @success="uploader"></updata>
        </el-form-item>
      <el-button type="primary" size="small" @click="hendlecommit">添加</el-button>
      </el-form>
    </div>
</template>

<script>
  import updata from '@/components/updata'
    export default {
        data(){
          return {
            formdata:{
              username:'',
              password:'',
              desc:'',
              avatar:'',
              email:'',
              nickname:'',
              cheackpassword:''
            },
          }
        },
      components:{
          updata
      },
      methods: {
        hendlecommit() {
          if(this.formdata.password != this.formdata.cheackpassword){
            this.$message.error("两次输入的密码不一致")
          }else {
            this.$axios.post('/user', this.formdata).then(res => {
              console.log(res)
              if(res.code == 200){
                this.$message.success(res.msg)
              }
            })
          }

        },
        uploader(url){
          this.formdata.avatar = url
        }
      }

    }
</script>

<style scoped lang="scss">
.container{
  margin: auto;
  width: 400px;
  height: 400px;
}

</style>

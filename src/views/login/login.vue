<template>
    <div class="container">
      <h1 class="login-title">欢迎来到后台管理界面</h1>
      <div class="login-box">
        <h1 class="title">请登录</h1>
        <el-form class="form">
        <el-form-item label="用户名" >
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"  placeholder="请输入密码"></el-input>
        </el-form-item>
        </el-form>
        <el-button @click="hendlelogin" type="primary" class="login-btn" :loading='isloading' :plain="true">
          登录
        </el-button>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
          return{
            form:{
              username:'',
              password:''
            },
            isloading:false
          }
      },
      methods:{
          hendlelogin(){
            this.isloading = true;
              this.$axios.post('/login',this.form).then( res => {
                console.log(res)
                if(res.code == 200){
                  this.$message.success(res.msg)
                  setTimeout(() => {
                    this.$router.push('/layout/index')
                  },3000)

                }else {
                  this.$message.error(res.msg);
                }
                this.isloading = false;
              }).catch( err => {
                this.isloading = false;
              })
          }
      }
    }
</script>

<style scoped lang="scss">
.container{
  overflow: hidden;
  min-height: 100vh;
  background: #545c64;
  .login-title{
    margin-top: 100px;
    text-align: center;
    color: #fff;
    font-weight: 400;
  }
  .login-box{
    width:400px;
    height: 300px;
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    margin: 30px auto;
    background: #f1f1f1;
    padding: 40px;
    text-align: center;
    .title{
      font-size: 20px;
      font-weight: 300;
      margin-bottom: 20px;
    }
    .login-btn{
      width: 400px;
    }

  }

}
</style>

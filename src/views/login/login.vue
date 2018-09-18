<template>
    <div class="container">
      <h1 class="login-title">欢迎来到后台管理界面</h1>
      <div class="login-box">
        <h1 class="title">请登录</h1>
        <el-form class="form" :rules="rules" ref="form" :model="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"  placeholder="请输入密码" @keyup.enter.native="submitForm('form')"></el-input>
        </el-form-item>
        </el-form>
        <el-button  @click="submitForm('form')"  type="primary" class="login-btn" :loading='isloading' :plain="true">
          登录
        </el-button>
      </div>
    </div>
</template>

<script>
    export default {
      name:'login',
      data(){
        let checkname=(rule,value,callback ) => {
          if (!value){
            return callback(new Error('用户名不能为空'))
          }else {
            callback();
          }
        };
        let checkpassword=(rule,value,callback) => {
          if (!value) {
            callback(new Error('请输入密码'))
          } else {
            if(value.length < 5){
              callback(new Error('密码长度最少5位,请输入合法的密码'))
            }
            else {
              callback();
            }

          }
        }
          return{
            form:{
              username:'',
              password:''

            },
            rules:{
              username:[{ validator: checkname, trigger: 'blur' }],
              password:[{validator: checkpassword, trigger: 'blur'}]
            },
            isloading:false,
            userdata:{}
          }
      },
      methods:{
          // hendlelogin(){
          //   this.isloading = true;
          //     this.$axios.post('/login',this.form).then( res => {
          //       console.log(res)
          //       if(res.code == 200){
          //         this.$message.success(res.msg)
          //

          //         setTimeout(() => {
          //           this.$router.push('/layout/index')
          //         },3000)
          //
          //       }else {
          //         this.$message.error(res.msg);
          //       }
          //       this.isloading = false;
          //     }).catch( err => {
          //       this.isloading = false;
          //     })
          // },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {

              this.isloading = true;
              this.$axios.post('/login',this.form).then( res => {
                console.log(res)
                if(res.code == 200){
                  this.$store.commit('CHANGE_USERINFO',res.data)
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
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      },

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

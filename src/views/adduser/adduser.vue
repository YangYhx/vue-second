<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div  class="container">
        <h2 style="  text-align: center;margin-bottom: 20px">添加管理员</h2>
        <el-form :model="formdata"  size="small" label-width="100px" label-position="left">
          <el-form-item label="用户名">
            <el-input v-model="formdata.username" placeholder="设置用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="formdata.password" placeholder="设置密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpass">
            <el-input type="password"  v-model="formdata.cheackpassword" placeholder="请再次确认密码"></el-input>
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
            <updata v-model="formdata.avatar"  class="adduser-image"></updata>
          </el-form-item>
          <el-button type="primary" size="small" @click="hendlecommit">添加</el-button>

        </el-form>
      </div>

    </div>
</template>

<script>
  import updata from '@/components/updata'
    export default {
      data() {
        // let validatePass = (rule, value, callback) => {
        //   if (value === '') {
        //     callback(new Error('请再次输入密码'));
        //   } else if ( value !== this.formdata.password ) {
        //     callback(new Error('两次输入密码不一致!'));
        //   } else {
        //     callback();
        //   }
        // };
        return {
          formdata: {
            username: '',
            password: '',
            desc: '',
            avatar: '',
            email: '',
            nickname: '',
            cheackpassword: ''
          }
          // rules2: {
          //   checkpass: [{validator: validatePass, trigger: 'blur'}]
          // }
        }
      },
      components: {
        updata
      },
      methods: {
        // submitForm() {
        //   console.log("11111")
        //   this.$refs['formdata'].validate((valid) => {
        //     if (valid) {
        //       console.log(".....")
        //      this.hendlecommit();
        //     } else {
        //       console.log('error submit!!');
        //       return false;
        //     }
        //   });
        // },
        //   resetForm(formName) {
        //     this.$refs[formName].resetFields();
        //   }
        // },
        hendlecommit() {
          if (this.formdata.password !== this.formdata.cheackpassword) {
            this.$message.error('两次密码不一致')
          }
          else {
            this.$axios.post('/user', this.formdata).then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg)
              }
            })
          }

        }
      }


    }
</script>

<style scoped lang="scss">
.container{
  margin:auto;
  width: 400px;
  height: 400px;


  .breadcrumb{
    height: 80px;
    margin: 20px 0;
  }

  .adduser-image{
    width: 80px;
    height: 80px;
  }
}

</style>

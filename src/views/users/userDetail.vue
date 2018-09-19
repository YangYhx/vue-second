<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/userslist'}">用户列表</el-breadcrumb-item>
        <el-breadcrumb-item>详细信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="formdata" size="small" label-width="100px" label-position="left" class="container" :disabled="true">
      <el-form-item label="用户名">
        <el-input v-model="formdata.username" ></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formdata.nickname" ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formdata.email"></el-input>
      </el-form-item>
      <el-form-item label="个性签名" >
        <el-input v-model="formdata.desc" type="textarea" ></el-input>
      </el-form-item>
      <el-form-item label="头像" >
        <img :src="formdata.avatar" class="userdetail-image">
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import updata from '@/components/updata'
    export default {
        name: "userDetail",
      components:{
        updata,
      },
      data(){
          return {
            formdata:{
              username:'',
              desc:'',
              avatar:'',
              email:'',
              nickname:'',
            }
          }
      },
      created(){
          this.formdata = {
            ...this.$store.state.userdetail
          }
      }
    }
</script>

<style scoped lang="scss">
  .container{
    margin: 20px auto;
    width: 500px;
    height: 600px;

    .userdetail-image{
      width: 300px;
      height: 300px;
      border: 1px solid #888;
    }
  }

</style>

<template>
<div class="layout">
  <div class="header">
    <h1 class="title">云书后台操作系统</h1>

  </div>
  <div class="sidebar">
    <!--<div >-->
      <!--<img :src="this.userdata.avatar" class="userinfo">-->
    <!--</div>-->
    <div class="userinfo">

      <!--<el-dropdown trigger="click">-->
      <!--<span class="el-dropdown-link">-->
        <upimg >
      </upimg>
      <!--</span>-->
        <!--<el-dropdown-menu slot="dropdown">-->
          <!--<el-dropdown-item command="{push:'/'}">修改个人信息</el-dropdown-item>-->
          <!--<el-dropdown-item :to="{push:'/'}">退出登录</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
    </div>


    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">

      <el-submenu index="2">

        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <!--<template slot="title">用户</template>-->
        <el-menu-item index="/layout/index">首页</el-menu-item>
          <el-menu-item index="/">用户登录</el-menu-item>
        <el-menu-item index="/layout/users">用户列表</el-menu-item>
          <el-menu-item index="/layout/adduser">添加用户</el-menu-item>
          <el-menu-item index="/layout/userEdit">修改信息</el-menu-item>

      </el-submenu>
      <el-submenu index="3">

        <template slot="title">
          <i class="el-icon-location"></i>
          <span>分类管理</span>
        </template>
         <el-menu-item index="/layout/classlist">分类列表</el-menu-item>
          <el-menu-item index="1-3">添加分类</el-menu-item>
          <el-menu-item index="1-4">删除分类</el-menu-item>
          <el-menu-item index="1-5">修改书籍</el-menu-item>
      </el-submenu>
      <el-submenu index="4">

        <template slot="title">
          <i class="el-icon-location"></i>
          <span>图书管理</span>
        </template>
        <el-menu-item index="1-3">添加图书</el-menu-item>
        <el-menu-item index="1-4">删除图书</el-menu-item>
        <el-menu-item index="1-5">修改图书</el-menu-item>
      </el-submenu>


    </el-menu>
  </div>
  <div class="content">
    <router-view></router-view>

  </div>

</div>
</template>

<script>
  import upimg from '@/components/upimg'

    export default {
        name: "layout",
      components:{
          upimg,
      },
      data(){
          return {
            userdata:{}
          }
      },
      created(){
          this.userdata={
            ...this.$store.state.userinfo
          }
          console.log(this.userdata)
      }
    }
</script>

<style scoped lang="scss">
.layout{
  .header{
    height: 100px;
    margin-left: 200px;
    text-align: center;

    .title{
      font-weight: 400;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #f1f1f1;
    }
  }

  .sidebar{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background: #545c64;
    width: 200px;
    height: 100vh;

    .userinfo{
      margin: 10px 40px 10px ;
      width: 60px;
      height: 60px;
      border-radius: 30px;
    }


    /deep/ {
      .el-menu{
        border-right: none;
      }
    }
  }
  .content{
    margin-left: 200px;
    padding: 20px;
  }
}
</style>

<template>
    <div>
      <el-form class="container">
        <el-form-item label="用户名">
          <el-input v-model="formdata.username" placeholder="设置用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.password" placeholder="设置密码"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formdata.nickname" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="用户说明">
          <el-input v-model="formdata.desc" placeholder="用户说明"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.emall" placeholder="填写邮箱"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        class="avatar-uploader"
        action="http://upload.yaojunrong.com/getToken"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button type="primary" @click="hendlecommit">添加</el-button>
    </div>
</template>

<script>
    export default {
        data(){
          return {
            formdata:{
              username:'',
              password:'',
              desc:'',
              avatar:'',
              emall:'',
              nickname:'',
            },
            imageUrl: ''
          }
        },
      methods:{
        hendlecommit(){
          this.$axios.post('/user',this.formdata).then( res => {
            console.log(res)
          })
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      }
    }
</script>

<style scoped lang="scss">
.container{
  width: 400px;
  height: 600px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

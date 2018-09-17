<template>
  <div>
    <h1>你好</h1>
    <!--<h2>传统表单上传</h2>-->
    <!--<form action="https://upload-z1.qiniup.com" enctype="multipart/form-data" method="post">-->
      <!--<input type="file" name="file">-->
      <!--<br>-->
      <!--<input type="text" name="token" v-model="token">-->
      <!--<br>-->
      <!--<button>-->
        <!--提交-->
      <!--</button>-->
    <!--</form>-->
    <h2>ajax上传图片</h2>
    <input type="file" @change="handlechange">
    <img :src="imgdata" class="img">
  </div>


</template>

<script>
  import axios from 'axios'
    export default {
        name: "index",
      data(){
          return {
            token:'',
            imgdata:''
          }
      },
      methods:{
          gettoken(){
            axios.get('http://upload.yaojunrong.com/getToken').then( res => {
              console.log(res)
              this.token = res.data.data
            })

          },
        handlechange(e){
            console.log(file)
          let file = e.target.files[0]

          let formData= new FormData()

          formData.append('file',file,'file') //列名，内容
          formData.append('token',this.token)

          axios.post('https://upload-z1.qiniup.com',formData,{
            headers:{
              //对接数据的时候的请求头，与后台交互时候使用
              // 'Content-type':'multipart/form-data',
              // 'Content-type':'application/x-www-form-urlencoded',
              // 'Content-type':'application/json'
            }//posttmark  测试请求头
          }).then( res => {
              this.imgdata = res.data.url
          }) //链接地址，表单对象，设置项
        }
      },
      created(){
          this.gettoken();
      }
    }
</script>

<style scoped>
.img{

  width: 80px;
  height: 80px;
}
</style>

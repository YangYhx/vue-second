<template>
  <div>
    <h1>你好</h1>
    <el-form>
      <el-form-item>
        <updata v-model="userinfo.avatar"></updata>
      </el-form-item>
    </el-form>


  </div>


</template>

<script>
import updata from '@/components/updata'
    export default {
        name: "index",
      components:{
        updata,
      },
      data(){
          return {
            userinfo:{
              avatar:''
            }
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
          this.userinfo={
            ...this.$store.state.userinfo
          }
      }
    }
</script>

<style scoped>
.img{

  width: 80px;
  height: 80px;
}
</style>

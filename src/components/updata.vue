<template>
      <label class="upload-wrap">
        <i v-if="isimg" class="el-icon-plus"></i>
        <input type="file"  style="display: none" @change="upload">
        <img  class="image"  :src="imgurl">
      </label>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "updata",
      data(){
          return {
            imgurl:'',
            token:'',
            isimg:true
          }
      },
      methods:{
          gettoken(){
            axios.get('http://upload.yaojunrong.com/getToken').then( res => {
              this.token = res.data.data
            })

          },
        upload(event){
          let file = event.target.files[0]
          let formData = new FormData()

          formData.append('file',file)
          formData.append('token',this.token)


          axios.post('https://upload-z1.qiniup.com',formData ,{
            headers:{
              'Content-type':'multipart/form-data'
            }
          }).then( res => {
            console.log(res.data.url)
            this.imgurl = res.data.url
            this.isimg = false
          })
        }
      },
      created(){
          this.gettoken()
      }

    }
</script>

<style scoped lang="scss">
  .upload-wrap{
    position: relative;
    display: block;
    width: 80px;
    height: 80px;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    cursor: pointer;

    .el-icon-plus{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);

    };
    .image{
      width: 100%;
      height: 100%;
    }

  }




</style>

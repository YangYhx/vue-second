<template>
      <label class="upload-wrap">
        <i v-if="isimg" class="el-icon-plus"></i>
        <img  class="image"  :src="imgurl">
        <input type="file"  style="display: none" @change="upload">
      </label>
</template>
<script>
  import axios from 'axios'
    export default {
        name: "updata",
      props:{
          value:{
            type: String
          }
      },
      data(){
          return {
            imgurl:this.value,
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
            this.isimg = false
            console.log(res.data.url)
            this.imgurl = res.data.url
            this.$emit('success',res.data.url)
            this.$emit('input',res.data.url)
            this.$emit('change',res.data.url)
          })
        }
      },
      created(){
          this.gettoken()
      },
      watch:{
          value(val){
            this.imgurl = val
          }
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

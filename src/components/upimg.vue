<template>
    <div >
      <img :src="userinfo.avatar" class="image">
    </div>
</template>

<script>
    export default {
        name: "upimg",
      props:{
          img:{
            type:String
          }
      },
      data(){
          return {
            userinfo:{},
            imgurl:this.img
          }
      },
      created(){
          this.userinfo = {...this.$store.state.userinfo}
          this.imgurl = this.userinfo.avatar

      },
      watch:{
          img(img){
            this.imgurl = img
          }
      }
    }
</script>

<style scoped lang="scss">
  .image{
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
</style>

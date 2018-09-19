<template>
    <div style="width: 300px;height: 300px">
      <el-form :model="formdata" label-width="100px" label-position="left">
        <el-form-item label="旧密码">
          <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="formdata.new_password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="hendlecheck">
          保存修改
        </el-button>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "Editpass",
      data(){
          return {
            formdata:{
              password:'',
              new_password:''
            }
          }
      },
      methods:{
        hendlecheck(){
          this.$axios.put('/user/password',this.formdata).then( res => {
            console.log(res)
          })
        }
      }
    }
</script>

<style scoped>

</style>

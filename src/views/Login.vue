<template>
  <!-- <div class="background"> -->
    <!-- <div class="backgroundDiv">
      <img src="../assets/login_image/login_background.jpg" width= "100%" height="100%" class="login_image">
    </div> -->
    <!-- <div class="front" > 
      用户名:<input type="text" v-model="id" placeholder="请输入用户名" />
      <br><br>
      密码:<input type="password" v-model="password" placeholder="请输入密码" />
      <br><br>
      <button @click="login()">登录</button>
      <br><br>
  
       <router-link to='/Register'>
        <span style="text-align:center;font-size: 14px;">账号注册</span>
      </router-link> -->
  
      <!-- <router-link to='/ChangePwd'>
        <span style="text-align:center;font-size: 14px; color:red;">修改密码</span>
      </router-link> 
    </div>
  </div> -->
  
  <div class="container">
      <el-image class="image" :src="url" :fit="'fill'"></el-image>
      <div class="front" style="width: 460px; height: 330px;">
        <br><br>
        <h2>欢迎登录铁路公司管理系统</h2>
        <el-form :model="LoginForm" :rules="rules" ref="LoginForm" label-width="100px" class="demo-LoginForm">
          <el-form-item label="用户名" prop="id" style="width: 380px; margin-top: 30px;">
            <el-input v-model="LoginForm.id"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 380px;" >
            <el-input v-model="LoginForm.password" autocomplete="off" ></el-input>
          </el-form-item>
          <!-- <el-form-item label="验证码" prop="code" style="width: 380px;">
            <el-input v-model="LoginForm.code" style="width: 170px; float: left;" class="verifyCode" ></el-input>
            <el-image src="" class="verifyCodeImg" ></el-image>
          </el-form-item> -->
          <el-form-item>
            <!-- <el-button type="primary" @click="submitForm('LoginForm')" style="width: 200px; margin-right: 100px; " class="buttonlogin">登录</el-button> -->
            <el-button type="primary" @click="login()" style="width: 200px; margin-right: 100px; " class="buttonlogin">登录</el-button>
          </el-form-item>
          <!-- <router-link to='/Register'>
            <span style="text-align:center;font-size: 14px;">账号注册</span>
          </router-link> -->
        </el-form> 
      </div>
     
  </div>
  </template>
  
  <script>
    import Cookies from 'js-cookie';
  
    export default {
      name: 'Login',
      data() {
        return {
          url: require('../assets/login_image/login_background.jpg'),
          LoginForm: {
            id: '',
            password: '',
          },
          rules: {
            id: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
          },
        };
      },
      created() {
  
      },
      
      methods: {
        // submitForm(formName){
        //     this.$refs[formName].validate((valid) => {
        //       var vm = this;//把当前vue对象赋给vm，this表示当前vue对象，直接写this.form.id是拿不到值的，因为在axois中写this表示的是axios对象
        //       if (valid) {
        //         //发送axios请求
        //         this.axios({
        //           method:'post',
        //           url:'http://localhost:8090/manager/login',
        //           data: {
        //             id:vm.LoginForm.id,
        //             password:vm.LoginForm.password
        //           }
        //         }).then(function (resp) {
        //           if (resp.data.code === 200){//resp.data表示返回的数据
        //             vm.$message({
        //               message: '登录成功',
        //               type: 'success',
        //               duration:1000
        //             });
        //             setTimeout(function () {
        //               vm.$router.push("/success") //1秒后跳转到home
        //             },1200)
        //           }else {
        //             vm.$message.error('用户名或密码错误');
        //           }
        //         })
        //       } else {
        //         console.log('error submit!!');
        //         return false;
        //       }
        //     });
        //   }
        // }
        login: function() {
          let fd = new FormData();
          fd.append("id",this.LoginForm.id);
          fd.append("password", this.LoginForm.password);
          console.log(fd.get("password"));
  
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
  
          this.$axios.post("manager/login", fd, config).then(res => {
            alert(res.data.msg)
            if (res.data.code === 200) {
              Cookies.set('id', fd.get('id'));
              this.$router.push({
                path: '/success'
              })
            } else {
  
            }
          }).catch(res => {
            alert(res.data.msg)
          })
        }
        // resetImg(){
        // this.imgUrl = "http://localhost:9000/manager/verifyCode?time="+new Date();
        // },
        // submitForm(formName) {
        //   // this.$refs[formName].validate((valid) => {
        //   //   if (valid) {
        //       // this.$axios.post('/login', this.LoginForm).then(res=>{
        //       // })
        //       // alert('submit!');
        //       let fd = new FormData();
        //       fd.append("id", this.id);
        //       fd.append("passwd", this.password);
      
        //       let config = {
        //         headers: {
        //           'Content-Type': 'multipart/form-data'
        //         }
        //       }
      
        //       this.$axios.post("manager/login", fd, config).then(res => {
        //         alert(res.data.msg)
        //         if (res.data.code === 200) {
        //           Cookies.set('id', fd.get('id'));
        //           this.$router.push({
        //             path: '/success'
        //           })
        //         } else {
      
        //         }
        //       }).catch(res => {
        //         alert(res.data.msg)
        //       })
          //   } else {
          //     console.log('error submit!!');
          //     return false;
          //   }
          // });
      
        // resetForm(formName) {
        //   this.$refs[formName].resetFields();
        // }
      }
    }
  </script>

<style scoped>
  .container {
    width: 100vw;
    height: 100vh;
    background-color:  lightblue;
    overflow: hidden;
    margin: 0 auto;
    /* z-index: -100; */
    position: relative;
  }
  .front{
      /* z-index: 1; */
      position: absolute;
      /* border: 1px solid lightgray; */
      /* background-color:rgba(193, 200, 216, 0.5); */
      /* box-shadow: 3px 3px 3px rgb(194, 206, 218); */
      background-color: rgba(132, 151, 167, 0.5);
      box-shadow: 2px 2px 2px rgb(91, 105, 119);
      
      border-radius: 10px;
      /* background-color: lightgray; */
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      align-items: center;
    }
    .image {
      width: 100%;
      height: 100%;
      opacity: 0.8;
    }
    .verifyCodeImg{
      float: left;
      margin-left: 10px;
      border-radius: 4px;
    }
    .buttonlogin{
      background-color: rgb(48, 65, 86);
      border: rgb(113, 140, 173);
    }
</style>
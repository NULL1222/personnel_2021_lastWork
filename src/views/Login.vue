<template>
  <div class="container">
      <el-image class="image" :src="url" :fit="'fill'"></el-image>
      <div class="front">
        <br><br>
        <h2>欢迎登录铁路公司管理系统</h2>
        <el-form :model="LoginForm" :rules="rules" ref="LoginForm" label-width="100px" class="demo-LoginForm">
          <el-form-item label="用户名" prop="id" style="width: 380px; margin-top: 30px;">
            <el-input v-model="LoginForm.id"
            ref="getFocus">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" style="width: 380px;" prop="password">
            <el-input v-model="LoginForm.password"
            :type="passw" 
            @blur="onBlur"
            clearable
            @keyup.enter.native="login">
             <i 
             slot="suffix" 
             :class="icon"
             @click="showPass"></i> 
            </el-input>
          </el-form-item>
          <el-form-item class="buttons">
            <!-- <el-button type="primary" @click="submitForm('LoginForm')" style="width: 200px; margin-right: 100px; " class="buttonlogin">登录</el-button> -->
            <el-button type="primary" @click.native.prevent="login" class="buttonlogin">登录</el-button>
            <el-button @click="resetForm('LoginForm')" class="buttonreset">重置</el-button>
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
    import bus from '../bus.js'

    export default {
      name: 'Login',
      data() {
        return {
          url: require('../assets/login_image/login_background.jpg'),
          icon: "el-input__icon el-icon-view",
          passw: "password",
          LoginForm: {
            id: '',
            name: '',
            sex: '',
            mail: '',
            phone: '',
            idCard: '',
            card: '',
            address: '',
            attendance: '',
            birthday: ''
          },
          rules: {
            id: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
               { min: 8, max: 8, message: '长度为 8 个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
          },
        };
      },

      mounted() {
        this.$refs.getFocus.focus()
      },
      // mounted: function() {
      //   this.initUser()
      // },
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
        // login() {
        //   var _this = this
        //   this.$axios.post("/manager/login?id="+this.LoginForm.id 
        //   + "&password="+ this.LoginForm.password, {}).then(resp => {
        //     alert(resp.data.msg)
        //     if (resp && resp.data.code === 200) {
        //       _this.LoginForm = resp.data.data
        //       console.log(_this.LoginForm)
        //       this.$router.push({
        //         path: '/container'
        //       })
        //     }else {

        //     }
        //   }).catch (resp=> {
        //     alert(resp.data.msg)
        //   })
        // },
        showPass() {
          if (this.passw == "text") {
          this.passw = "password";
          //更换图标
          this.icon = "el-input__icon el-icon-view";
          } else {
          this.passw = "text";
          this.icon = "el-input__icon el-icon-moon";
          // setTimeout(()=>{
          //       this.icon = "";
          // },500)
          }
        },
        onBlur(){
         this.passw = "password";
         this.icon = "el-input__icon el-icon-view";
        },
        login: function() {
          let fd = new FormData();
          fd.append("id",this.LoginForm.id);
          fd.append("password", this.LoginForm.password);
  
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          this.$axios.post("manager/login", fd, config).then(res => {
            alert(res.data.msg)
            if (res.data.code === 200) {
              Cookies.set('id', fd.get('id'));
              console.log("id1=" + this.LoginForm.id);
              this.$router.push({
                path: '/container'
              })           
            } else {  
            }
          }).catch(res => {
            alert(res.data.msg)
          })
          // eventBus.$emit('eventBusName', this.LoginForm.id);
          bus.$emit('fromA', {
            phone: 18768580852
          })
          console.log("id2=" + this.LoginForm.id);
        },
        resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$refs.getFocus.focus()
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
      width: 450px; 
      height: 300px;
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
    .buttons {
      flex-direction: row;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 80px;
    }
    .buttonlogin{
      width: 100px; 
      /* margin-ri: 0px;  */
      background-color: rgb(48, 65, 86);
      /* border: rgb(113, 140, 173); */
      width: 100px;
      border: 0px; 
    }
    .buttonreset {
      margin-left: 20px;
      width: 100px;
      border: 0px; 
    }
</style>
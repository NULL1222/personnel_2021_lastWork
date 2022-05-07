<template>
  <div class="container">
      <el-image class="image" :src="url" :fit="'fill'"></el-image>
      <div class="front">
        <br><br>
        <h2>欢迎登录铁路公司管理系统</h2>
        <el-form :model="LoginForm" :rules="rules" ref="LoginForm" label-width="100px" class="demo-LoginForm">
          <el-form-item label="账号" prop="id" style="width: 380px; margin-top: 20px;">
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
          <el-radio-group v-model="LoginForm.job">
            <el-radio label="用户" class="radio-user"></el-radio>
            <el-radio label="管理员"></el-radio>
          </el-radio-group>
          <el-form-item class="buttons">
            <el-button type="primary" @click.native.prevent="login" class="buttonlogin">登录</el-button>
            <el-button @click="resetForm('LoginForm')" class="buttonreset">重置</el-button>
          </el-form-item>
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
            birthday: '',
            job: '用户'
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
      created() {  
      },
      methods: {
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
          fd.append("job",this.LoginForm.job);
           let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          this.$axios.post("staff/login", fd, config).then(res => {
            alert(res.data.msg)
            if (res.data.code === 200) {
              Cookies.set('id', fd.get('id'));
              console.log("id1=" + this.LoginForm.id);
              let getUserRole = fd.get('job') === '管理员' ? 'admin' : 'user';
              console.log("getUserRole=" + getUserRole);
              sessionStorage.setItem('userRole', getUserRole);
              this.$router.push({
                path: '/container'
              })           
            } else {  
            }
          }).catch(res => {
            alert(res.data.msg)
          })
          sessionStorage.setItem('userId2',this.LoginForm.id)
        },
        resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$refs.getFocus.focus()
        }  
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
    position: relative;
  }
  .front{
    width: 450px; 
    height: 300px;
    position: absolute;
    background-color: rgba(132, 151, 167, 0.5);
    box-shadow: 2px 2px 2px rgb(91, 105, 119);
     border-radius: 10px;
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
    background-color: rgb(48, 65, 86);
    width: 100px;
    border: 0px; 
    margin-top: 15px;
  }
  .buttonreset {
    margin-left: 20px;
    width: 100px;
    border: 0px; 
  }
  .el-radio {
    color: #ffffff;
    font-weight: bold;
  }
</style>
<template>
    <div>
      用户名: <input id="userName" type="text" v-model="userName" placeholder="请输入用户名" />
      <br><br>
      密码: <input id="password" type="password" v-model="password" placeholder="请输入密码" />
      <br><br>
      确认密码: <input id="password2" type="password" v-model="password2" placeholder="请再次输入密码" />
      <br><br>
      <button @click="register()">注册</button>
      <br><br>
  
      <router-link to='/'>
      <span style="text-align:center;font-size: 14px; color:red;">现在登录</span>
      </router-link>
  
    </div>
  </template>
  
  <script>
    export default {
      name: 'Register',
      data() {
        return {
          userName: "",
          userName: "",
          password2: "",
          password: ""
        }
      },
      created() {
  
      },
      methods: {
        register: function() {
          let fd = new FormData();
          fd.append("userName", this.userName);
          fd.append("passwd", this.password);
  
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
  
          if (this.password === this.password2) {
            this.$axios.post("user/register", fd, config).then(res => {
              alert(res.data.msg)
              if (res.data.code === 200) {
                // 回到登录界面
                this.$router.push({
                  path: '/'
                })
              }
            }).catch(res => {
              alert(res.data.msg)
            })
          } else {
            alert("两次输入的密码不同")
          }
  
        }
  
      }
    }
  </script>
  
  <!-- 添加“scoped”属性以将CSS仅限于此组件 -->
  <style scoped>
  
  </style>
  
  
<template>
    <div>
      <div class="top_div">当前登录的用户是：{{ LoginuserName }}</div>
      <br><br>
      用户名: <input id="Username" type="text" v-model="LoginuserName" disabled="disabled" />
      <br><br>
      <!-- 一个git测试 -->
      <!-- text -->
      原密码: <input id="oldpassword" type="password" v-model="oldpassword" placeholder="请输入原密码" />
      <br><br>
      新密码: <input id="newpassword" type="password" v-model="newpassword" placeholder="请输入新密码" />
      <br><br>
      确认新密码: <input id="newpassword2" type="password" v-model="newpassword2" placeholder="请再次输入新密码" />
      <br><br>
      <button @click="ChangePwd()">确定修改</button>
    </div>
  </template>
   <script>
    import Cookies from 'js-cookie';
    export default {
      name: 'ChangePwd',
      data() {
        return {
          oldpassword: "",
          newpassword: "",
          newpassword2: ""
        }
      },
      created() {
       },
      computed: {
        LoginuserName() {
          return Cookies.get('userName');
        }
      },
      methods: {
        ChangePwd: function() {
          let fd = new FormData();
          fd.append("username", this.LoginuserName);
          fd.append("oldpassword", this.oldpassword);
          fd.append("newpassword", this.newpassword);
           let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
           if (this.oldpassword.length === 0 || this.newpassword.length === 0 || this.newpassword2.length === 0) {
            alert("密码不能为空");
            return;
          } else if (this.newpassword === this.newpassword2) {
            this.$axios.post("user/changepwd", fd, config).then(res => {
              alert(res.data.msg)
              if (res.data.code === 200) {
                // 回到登录界面
                this.$router.push({
                  path: '/'
                })
              }
            }).catch(res => {
              alert(res.data.msg);
            })
          } else {
            alert("两次输入的新密码不同")
          }
        }
      }
    }
  </script>
  <!-- 添加“scoped”属性以将CSS仅限于此组件 -->
  <style scoped>
   </style>
   
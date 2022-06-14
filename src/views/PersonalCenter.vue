<template>
  <div class="personal">
    <div class="left-content">
      <!-- <h3>安全设置</h3> -->
      <img :src="userImg" class="photo-user"/>
      <div class="left-content-buttons">
        <el-button type="text" @click="openPwd()" class="change-pwd">修改密码</el-button>
        <el-button @click="dialogVisible = true">编辑信息</el-button>  
      </div>
    </div>
    <div>
      <el-descriptions class="des-right" 
        :labelStyle="{'font-size': '18px','font-weight': 'bold', }"
        :contentStyle="{'font-size': '18px'}" 
        :column="2" >
        <el-descriptions-item label="姓名">{{ role.name }}</el-descriptions-item>
        <el-descriptions-item label="工号">{{ role.id }}</el-descriptions-item>
        <el-descriptions-item label="职务">{{ role.job }}</el-descriptions-item>
        <el-descriptions-item label="考勤（本月）">{{ role.attendance }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ role.sex }}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{ role.idCard }}</el-descriptions-item>
        <el-descriptions-item label="生日">{{role.birthday }}</el-descriptions-item>
        <el-descriptions-item label="手机号"> {{ role.phone }}</el-descriptions-item>
        <el-descriptions-item label="银行卡号">{{ role.card }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ role.mail }}</el-descriptions-item>
        <el-descriptions-item label="地址">{{ role.address}}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- Dialog -- Change Password-->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :rules="rules">
        <el-form-item label="旧密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" :label-width="formLabelWidth">
          <el-input v-model="form.newPassword" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword" :label-width="formLabelWidth">
          <el-input v-model="form.checkPassword" show-password clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd(); return false;">确 定</el-button>
      </div>
    </el-dialog>
    <!-- dialog 编辑信息 -->
    <el-dialog title="编辑信息" :visible.sync="dialogVisible" width="700px" destroy-on-close>
      <el-descriptions class="des-dialog" :column="2" >
        <el-descriptions-item label="姓名">{{ role.name }}</el-descriptions-item>
        <el-descriptions-item label="工号">{{ role.id }}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{ role.idCard }}</el-descriptions-item>
        <el-descriptions-item label="生日">{{role.birthday }}</el-descriptions-item>
        <el-descriptions-item label="职务">{{ role.job }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ role.sex }}</el-descriptions-item>
      </el-descriptions>   
      <el-form ref="ruleForm" :inline="true" :model="role" :rules="rulesForm" label-width="80px" label-position="right">
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="role.phone" maxlength="11" placeholder="请输入联系方式" style="width:200px;" />
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="role.mail" placeholder="请输入邮箱" style="width:270px;" />
        </el-form-item>
        <el-form-item label="银行卡号" prop="card">
          <el-input v-model="role.card" placeholder="请输入银行卡号" style="width:230px;" />
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input
            v-model="role.address"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入联系地址"
            style="width:240px;"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
        <el-button type="primary" plain @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bus from '../bus.js'
export default {
  data() {

    let validateNewPassword = (rule, value, callback) => {
      if (value === ''){
        callback(new Error('请输入密码'))
        
      } else if (value === this.form.password) {
         callback(new Error('新密码不能与原密码相同!'))
         
      } else {
         callback()
      }
    }
    let validateNewPassword2 = (rule, value, callback) => {
      if (value === ''){
        callback(new Error('请输入密码'))
      } else if (value !== this.form.newPassword) {
          callback(new Error('与新密码不一致!'))
          
      } else {
          callback()
      }
    }
    return {
      userImg: require("../assets/Me.png"),
      dialogFormVisible: false,
      dialogVisible: false,
      role: {
        job: '',
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
      form: {
        password: '',
        newPassword: '',
        checkPassword: ''
      },
      rulesForm: {
        mail: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        },
        {
          validator: function(rule, value, callback) {
            if (/^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(value) === false) {
              callback(new Error('邮箱格式错误'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入手机号码',
          trigger: 'blur'
        },
        {
          validator: function(rule, value, callback) {
            if (/^1[34578]\d{9}$/.test(value) === false) {
              callback(new Error('手机号格式错误'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        card: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }]
      },
      rules: {
        password: [
          {
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          },
          {
            validator:(rule,value,callback)=>{
              if(value===''){
              callback(new Error('请再次输入密码'))
              }else {
                callback( )
              }
            }
          }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validateNewPassword, trigger: 'blur' }
          // { min: 8, max: 8, message: '长度为 8 个字符', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: validateNewPassword2, trigger: 'blur' }
          // {
          //   validator:(rule,value,callback)=>{
          //     if(value===''){
          //     callback(new Error('请再次输入密码'))
          //     }else if(value!==this.form.newPassword){
          //     callback(new Error('两次输入密码不一致'))
          //     }else{
          //       callback( )
          //     }
          //   }
          // }
        ]
      },
      formLabelWidth: '80px'
    }
  },
  mounted() {
    // bus.$on('fromA', param => {
    //   this.role.id = param.phone;
    //   console.log(param.phone);
    //   console.log(this.role.id)
    // })
    this.initUser();
    this.initPwd();
  },
  created() {
    const myData2 = sessionStorage.getItem('userId2');
    this.role.id = myData2;
  },
  methods: {
    initUser() {
      var _this = this
      console.log(_this.myData2);
      this.$axios.post("/staff/view?id=" + _this.role.id, {}).then(resp => {
        if (resp && resp.data.code === 200) {
          _this.role = resp.data.data
          // console.log(_this.role);
        }
      })
    },
    initPwd() {
      this.form.password = '',
      this.form.newPassword = '',
      this.form.checkPassword = ''
    },
    submit(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          var _this = this
          this.$axios
            //向后端发送数据
            .post('/staff/editIndividual?id=' + this.role.id
            +'&name=' + this.role.name
            +'&sex=' + this.role.sex
            +'&idCard=' + this.role.idCard
            +'&job=' + this.role.job
            +'&phone=' + this.role.phone
            +'&mail='+ this.role.mail
            +'&card='+this.role.card
            +'&address='+this.role.address, {}).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.role = resp.data.data
              }
            })
          this.dialogVisible = false
          this.$message({
            message: '修改成功！',
            type: 'success',
            duration: 1000
          })
        }else{
          console.log('修改失败！');
          this.$message.error({
            message: '修改失败，请重试！',
            duration: 1000
          })
          return false;
        }
      });
    },
    openPwd() {
      this.dialogFormVisible = true;
      this.initPwd();
    },
    changePwd() {
      console.log("changepwd")
      this.dialogFormVisible = false
      var _this = this
      this.$axios.post("/staff/changePassword?id="+ _this.role.id 
      +"&oldPassword=" + this.form.password 
      + "&newPassword=" + this.form.newPassword, {}).then(resp => {
        if (resp && resp.data.code === 200) {
          _this.$message('密码修改成功！3秒后重新登录')
          this.$router.push({
            path: '/'
          }),
          history.pushState(null, null, document.URL);
          window.addEventListener("popstate", function (e) {
            history.pushState(null, null, document.URL);
          }, false);
        // }else if(resp && resp.data.code === 400) {
        //   alert(resp.data.msg);
        //   // alert("密码修改失败,请重试！")
        // }else {
          // alert(resp.data.msg);
        }else {
          alert("密码修改失败,请重试！")
          this.dialogFormVisible = true;
          initPwd();
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style scoped>
.des-right {
  margin-left: 50px;
  margin-top: 70px;
}
.des-dialog {
  margin-left: 50px;
  margin-top: 0px;
}
.photo-user {
  border-radius: 50% ;
  width: 200px;
  height: 200px;
  border-style: solid;
  margin: 30px 0;
  border-color: rgb(121, 157, 204);
}
.personal {
  display: flex;
  justify-content:flex-start;
  text-align: flex-start;
}
.left-content {
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 30px;
}

.left-content-buttons {
  display: flex;
  flex-direction: row;
}
.dialog-change {
  width: 60%;
  margin-left: 300px;
}
.el-dialog {
  /* height: 50%; */
}
.dialog-footer {
  margin-top: 0px;
  /* margin-bottom: 30px; */
}
.change-pwd {
  margin-left: 25px;
}
</style>
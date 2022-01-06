<template>
  <div  style="text-align:left">
    <br><br>
    <el-button type="primary" style="margin-left:10px;" @click="refreshing">刷新</el-button>
    <el-button type="primary" @click="dialogVisible = true" style="margin-left:10px;">添加</el-button>
    
    <p style="text-align: center; font-weight:bold; color: #726f6f;font-size: 2rem;">公 告 栏</p>
    <br>
    <el-collapse v-model="activeNames" class="notice" v-for="(item, index) in rolesList" :key="index" :accordion="accordion" accordion:true>
      <el-collapse-item :key="index" :name="index" :disabled="disable">
        <template slot="title">
          <el-col :span="12">
            {{item.title}}
          </el-col>
          <el-col :span="3" :offset="6">
            <i class="header-icon el-icon-user" ></i>&nbsp;{{item.person}}
          </el-col>
          <el-col :span="4" style="color: #9c9a9a;">
            <i class="header-icon el-icon-date" ></i>&nbsp;{{item.date}}  
          </el-col>
          <el-col :span="1">
            <el-button type="danger" icon="el-icon-delete" circle plain @click="deleteNotice(item.id)"></el-button>
          </el-col>
        </template>
        <div style="margin-top:10px;">{{ item.notice }}</div>
      </el-collapse-item>
    </el-collapse>

    <el-dialog @close='closeDialog' title="添加公告" :visible.sync="dialogVisible" style="width: 1370px;margin-left: 200px;">
      <el-form ref="ruleForm" :inline="true" :model="role" :rules="rules" label-width="80px" label-position="right">
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="role.title" maxlength="40" placeholder="请输入公告标题" style="width:270px;margin-left: 20px;" clearable/>
        </el-form-item>
        <br>
          <el-form-item label="公告内容" prop="notice">
            <div style="text-align:center;">
              <el-input
              type="textarea"
              placeholder="请输入公告内容"
              style="height: 280px;width: 600px;"
              :autosize="{ minRows: 12, maxRows: 18}"
              v-model="role.notice">
              </el-input>
            </div>
          </el-form-item>
        <div style="text-align:center;">
          <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
          <el-button type="primary" plain @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  const defaultRole = {
    job: '人事管理',
    sex: '男',
  }

  import Cookies from 'js-cookie';
  export default{
      computed:{
        username(){
          return Cookies.get('id');
        }
      },
      data() {
        return {
          activeNames:[0],
          disable: false,
          dialogVisible: false,
          direction: "btt",
          accordion: true,
          role: {
            id:'',
            title: '',
            person: '',
            date: '',
            notice: '',
          },
          routes: [],
          rolesList: [{
            title: '1',
            person: '2',
            date: '3',
            notice: '4',
          },
          {
            title: '1',
            person: '2',
            date: '3444-44-44 44:44:44',
            notice: '4',
          }],
          rules: {
            title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
            notice: [{ required: true, message: '请输入公告内容', trigger: 'blur' }],
          },

        }
    },
    
    mounted: function() {
      this.initNotice()
    },

    methods: {        
      initNotice() {
        var _this = this
        this.$axios.post("/notice/all").then(resp => {
          if (resp && resp.data.code === 200) {
            _this.rolesList = resp.data.data
          }
        })
      },
      refreshing() {
        location.reload()
      },
      deleteNotice(id){
        this.disable=true
        var _this = this
        this.$confirm('确定删除此条信息吗?', '警告', {
          closeOnClickModal:false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async() => {
          this.$axios.post("/notice/delete?id="+id,{}).then(resp => {
            if (resp && resp.data.code === 200) {
              this.$message({
                message: '删除公告成功',
                type: 'success'
              });
              _this.rolesList = resp.data.data
            }else{
              this.$message.error('删除公告失败，请重试');
            }
          })
          this.disable=false
        }).catch(action => {
            this.disable=false
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      submit(formName){
        const nowTime = new Date()
        var id = sessionStorage.getItem('userId2')
        var time = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + nowTime.getDate() + ' ' + nowTime.getHours() + ':' + nowTime.getMinutes() + ':' + nowTime.getSeconds()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this
            this.$axios.post('/notice/publish?person=' + id +'&title='+this.role.title+'&notice=' + this.role.notice+'&date='+time, {}).then(resp => {
              if (resp && resp.data.code === 200) {
                this.$message({
                  message: '添加公告成功',
                  type: 'success'
                });
                _this.rolesList = resp.data.data
                _this.initNotice()
              }else{
                this.$message.error('添加公告失败，请重试');
              }
              this.dialogVisible = false
            });
          }else{
            this.$message({
              message: '公告信息不完整，请重新输入',
              type: 'warning'
            });
            return false;
          }
        })
      },
      closeDialog(){
        this.role.notice = '';//清空数据
        this.role.title = '';
      },
       

    

    }
  }
</script>
<style scoped>
  .notice >>> .el-collapse-item__header {
    margin-left: 20px;
    font-size: 15px;
  }
  .notice >>> .el-collapse-item__content{
    margin-left: 25px;
    font-size: 10px;
  }
  /* .drawer >>> .el-drawer{
    height: 525px;
  } */
  </style>
<template>
    <div style="text-align:left">
      <br><br>
        <el-button type="primary" style="margin-left:10px;" @click="refreshing">刷新</el-button>
        <!-- <el-button type="primary" @click="handleAddRole" style="margin-left:10px;">请假申请</el-button> -->
  
        <!-- 请假记录表 -->
        <el-table :data="rolesList" height=450px style="width: 100%;margin-left:100px;margin-top:30px;float:center;text-align:center" :header-cell-style="{textAlign: 'center'}">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item label="请假详情" style="margin-bottom:-5px ;">
                  <span>{{ scope.row.description }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
  
          <el-table-column label="工号" width="130%" align="center">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="130%" align="center">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="申请时间" width="150%" align="center">
            <template slot-scope="scope">
              {{ scope.row.time }}
            </template>
          </el-table-column>
  
          <el-table-column label="请假时间段" width="250%" align="center">
            <template slot-scope="scope">
              {{ scope.row.date }}
            </template>
          </el-table-column>
          <el-table-column label="类型" width="120%" align="center">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column label="状态" width="130" align="center">
            <!-- slot-scope="scope" -->
            <template slot="header">
                <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link" style="color:#909399">
                    状态<i class="el-icon-arrow-down el-icon--right el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="全部">全部</el-dropdown-item>
                    <el-dropdown-item command="未审核">未审核</el-dropdown-item>
                    <el-dropdown-item command="已通过">已通过</el-dropdown-item>
                    <el-dropdown-item command="已驳回">已驳回</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
             <template slot-scope="scope">
              {{ scope.row.status }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120%" align="center">
            <template slot-scope="scope">
                <el-button type="" style="margin-left:10px;" @click="refreshing">审核</el-button>
            </template>
          </el-table-column>

        </el-table>
  
  
        <!-- 请假申请表单 -->
        <el-dialog :title="titleName" :visible.sync="dialogVisible" width="1000px" destroy-on-close>
          <el-form :model="ruleForm" :rules="rules" label-position="left" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-row :gutter="10">
              <el-col :span="6">
                <div>
                  <el-form-item label="工号" prop="id">                   
                      <el-input v-model="ruleForm.id" disabled="true"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="姓名" prop="name" >                   
                      <el-input v-model="ruleForm.name" disabled="true" style="margin-left: -15px;"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="所属部门" prop="department">
                      <el-input v-model="ruleForm.department" disabled="true"></el-input>
                  </el-form-item>  
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-form-item label="填写日期" prop="date">
                      <el-date-picker
                      v-model="present"
                      type="date"
                      placeholder="选择日期"
                      readonly="true"
                      style="width:140px;">
                      </el-date-picker>
                  </el-form-item>  
                </div>
              </el-col>     
            </el-row>
  
            <el-row>
              <el-col :span="10">
                <el-form-item label="请假类型" prop="type">
                  <el-select v-model="type" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
  
              <el-col :span="14">
               <el-form-item label="请假时间" required>
                  <el-date-picker
                    v-model="absenceDate"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    >
                  </el-date-picker>
              </el-form-item>
              </el-col>
            </el-row>
  
              <el-row>
                <el-col :span="20">
                  <el-form-item label="请假事由" prop="reason" >
                    <el-input type="textarea" v-model="ruleForm.reason" :rows="15" style="width:850px ;"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
  
            </el-form>
            <div style="text-align:center;">
              <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
              <el-button type="primary" plain @click="resetForm('ruleForm')">重置</el-button>
              <el-button type="danger" @click="closeDialog('ruleForm')">取消</el-button>
            </div>
        </el-dialog>    
        </div>
   </template>
   <script>
    import SearchBar from '../SearchBar.vue'
    import Vue from 'vue'
    var listen = new Vue()
    import Cookies from 'js-cookie';
    export default{
        components: {
          SearchBar
        },
        computed:{
          username(){
            return Cookies.get('id');
          }
        },
        data() {
          return {
            dialogImageUrl: '',
            dialogVisible: false,
            options: [{
              value: '1',
              label: '事假'
            }, {
              value: '2',
              label: '病假'
            }, {
              value: '3',
              label: '婚假'
            }, {
              value: '4',
              label: '丧假'
            }, {
              value: '5',
              label: '产假'
            }, {
              value: '6',
              label: '年假'
            }, {
              value: '7',
              label: '其他'
            }],
            approverList:[{}],
            type:'',
            absenceDate: '',
            present:new Date(),
            ruleForm: {
                id: '',
                name: '',
                date: '',
                department: '',
                date1: '',
                date2: '',
                type: '',
                reason:''
            },
            rules: {
                id: [
                    { required: true, trigger: 'blur' }
                ],
                name: [
                    { required: true, trigger: 'blur' }
                ],
                date: [
                    { required: true, trigger: 'blur' }
                ],
                department: [
                    { required: true, trigger: 'blur' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { required: true, trigger: 'blur' }
                ],
                reason: [
                    { required: true, message: '请填写请假事由详情', trigger: 'blur' }
                ],
                operate: [
                    { required: true, message: '请选择审批人', trigger: 'change' }
                ]
            },
            dialogVisible: false,
            rolesList: [{
              description : '出门吃饭去',
              id: '1111111',
              name: '李小李',
              time: '1111年11月11日',
              date: '1111年11月11日 至 1111年11月11日',
              type: '事假',
              operate: '小李',
              status: '已销假'
            }],
          }
      },
         mounted: function() {
          this.initStaff()
        },
         methods: {
           //上传图片并回显
          beforeAvatarUpload(file) {
            debugger;
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
              this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
              this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return this.file
          },
          uploadFileErrorHandler(res){
            this.$message.error("上传失败,请检查网络连接")
          },
          beforeRemove(file, fileList) {
            this.$confirm(`确定移除 ${ file.name }？`);
          },
          //页码
           handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pages.pageSize = val
            if(this.click === 'search')
              listen.$emit("searchAll")
            else if(this.click == 'command')
              listen.$emit("searchJob")
            else this.initStaff();
          },
          handleCurrentChange(val) {
            this.currentPage = val
            console.log(`当前页: ${val}`);
            this.pages.pageNum = val
            if(this.click === 'search')
              listen.$emit("searchAll")
            else if(this.click == 'command')
              listen.$emit("searchJob")
            else this.initStaff();
          }, 
          //页面初始化渲染
           initStaff() {
            var _this = this
            this.$axios.post("/staff/page?page="+this.pages.pageNum+"&size="+this.pages.pageSize).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.rolesList = resp.data.data.list
                _this.totalPages = resp.data.data.total
              }
            })
          },
           //预览图片功能
           handlePreview(file) {
            console.log(file.url);
            this.dialogVisible = true
            this.dialogImageUrl = file.url
          },
          handleCommand(command){
            this.myCommand = command
            console.log(this.$refs.searchBar.keywords)
            if(command === "全部")
              this.click = 'all'
            else this.click = 'command'
            listen.$on("searchJob",()=>{
              console.log("in command")
              var _this = this
              console.log(command)
              this.$axios.post('/staff/search?job=' + command + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&keywords=" + this.$refs.searchBar.keywords,{}).then(resp => {
                if(resp && resp.data.code === 200){
                  _this.rolesList = resp.data.data.list
                  _this.totalPages = resp.data.data.total
                }
              })
            })
            this.pages.pageNum = 1
            var _this = this
            console.log("out command")
            this.$axios.post('/staff/search?job=' + command + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&keywords=" + this.$refs.searchBar.keywords,{}).then(resp => {
              if(resp && resp.data.code === 200){
                _this.rolesList = resp.data.data.list
                _this.totalPages = resp.data.data.total
              }
            })
          },
           searchResult() {
            this.click = 'search'
            listen.$on("searchAll",()=>{
              var _this = this
              this.$axios
                //向后端发送数据
                .get('/staff/search?keywords=' + this.$refs.searchBar.keywords + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&job=" + this.myCommand, {}).then(resp => {
                  if (resp && resp.data.code === 200) {
                    _this.rolesList = resp.data.data.list
                    _this.totalPages = resp.data.data.total
                  }
                })
            })
            this.pages.pageNum = 1
            var _this = this
            this.$axios
              //向后端发送数据
              .get('/staff/search?keywords=' + this.$refs.searchBar.keywords + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&job=" + this.myCommand, {}).then(resp => {
                if (resp && resp.data.code === 200) {
                  _this.rolesList = resp.data.data.list
                  _this.totalPages = resp.data.data.total
                }
              })
          },
  
          // 打开请假申请填写表单
        handleAddRole() {
          // this.role = Object.assign({}, defaultRole)
          if (this.$refs.tree) {
            this.$refs.tree.setCheckedNodes([])
          }
          this.titleName = '提出请假申请'
          this.dialogVisible = true
        },
  
        // 刷新页面
        refreshing() {
          location.reload()
        },
  
        //重置表单
        resetForm(formName) {
          this.$refs[formName].resetFields()
        },
  
        // 关闭表单确认
        closeDialog(formName){
          this.$confirm('确定删除此条信息吗?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(async() => {
            dialogVisible=false
          })
            .catch(err => { console.error(err) })
        },
  
        // 提交表单 ！！！后端接口需重写！！！
         submit(formName){
          if(this.dialogType === 'new'){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var _this = this
                this.$axios
                  //向后端发送数据
                  .post('/staff/add?name=' + this.role.name +'&sex='+this.role.sex+'&idCard='+
                  this.role.idCard+'&job='+this.role.job+'&phone='+this.role.phone+'&mail='+
                                this.role.mail+'&card='+this.role.card+'&address='+this.role.address, {}).then(resp => {
                    if (resp && resp.data.code === 200) {
                      _this.rolesList = resp.data.data
                      _this.initStaff()
                    }
                    var i = 0
                    for (i;i<(_this.rolesList.length);i++){ 
                      if(_this.rolesList[i].idCard == this.role.idCard){
                        break;
                      }
                    }
                    console.log("i: ",i)
                    console.log("rolesList[i]: ",_this.rolesList[i])
                    this.$alert('此用户工号为：' + _this.rolesList[i].id + '</br>默认密码为：88888888', '信息', {
                      confirmButtonText: '确定',
                      dangerouslyUseHTMLString: true,
                      center: true,
                      callback: action => {
                        this.$message({
                          type: 'success',
                          message: `添加成功`
                        });
                      }
                    })
                    this.dialogVisible = false
                  })
                }else{
                  console.log('error submit!!');
                  return false;
                }
            });
          }else{
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var _this = this
                this.$axios
                  //向后端发送数据
                  .post('/staff/edit?id='+this.role.id+'&name=' + this.role.name+'&sex='+this.role.sex+'&idCard='+
                  this.role.idCard+'&job='+this.role.job+'&phone='+this.role.phone+'&mail='+
                                this.role.mail+'&card='+this.role.card+'&address='+this.role.address, {}).then(resp => {
                    if (resp && resp.data.code === 200) {
                      _this.rolesList = resp.data.data
                    }
                  })
                this.dialogVisible = false
              }else{
                console.log('error submit!!');
                return false;
              }
            });
          }
        }
      }
    }
  </script>
   <!-- 添加“scoped”属性以将CSS仅限于此组件 -->
  <style scoped>
    .table-expand >>> .el-form-item__label {
      width: 90px;
      color: #99a9bf;
      writing-mode:vertical-lr;
      letter-spacing:5px;
    }
    .el-calendar {
      width: 700px;
      margin-left: 30px;
    }
    .is-selected {
        color: #1989FA;
      }
    .el-calendar__header {
      padding: 12px 10px 12px 30px;;
    }
    .el-calendar-table:not(.is-range) td.next {
      pointer-events: none;
    }
    .el-calendar-table:not(.is-range) td.prev {
      pointer-events: none;
    }
    .el-calendar-table td:not(.is-today) {
      pointer-events: none;
    }
  </style>
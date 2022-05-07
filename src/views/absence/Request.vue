<template>
  <div style="text-align:left">
    <br><br>
      <el-button type="primary" style="margin-left:10px;" @click="refreshing">刷新</el-button>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top:30px">
        <el-row>
          <el-col :span="5">
              <el-form-item label="工号" prop="id" >                   
                  <el-input v-model="ruleForm.id" disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="5">
              <el-form-item label="姓名" prop="name" >                   
                  <el-input v-model="ruleForm.name" disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="5">
              <el-form-item label="所属部门" prop="department">
                  <el-input v-model="ruleForm.department" disabled="true"></el-input>
              </el-form-item>  
          </el-col>
          <el-col :span="5">
              <el-form-item label="填写日期" prop="date">
                  <el-date-picker
                  v-model="present"
                  type="date"
                  placeholder="选择日期"
                  disabled="true">
                  </el-date-picker>
              </el-form-item>  
          </el-col>     
        </el-row>
          <el-form-item label="请假类型" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio v-model="role.type" class="type" label="事假"></el-radio>
              <el-radio v-model="role.type" class="type" label="病假"></el-radio>
              <el-radio v-model="role.type" class="type" label="婚假"></el-radio>
              <el-radio v-model="role.type" class="type" label="丧假"></el-radio>
              <el-radio v-model="role.type" class="type" label="换班"></el-radio>
              <el-radio v-model="role.type" class="type" label="休班"></el-radio>
              <el-radio v-model="role.type" class="type" label="其他"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row>
            <el-col :span="20">
              <el-form-item label="请假事由" prop="reason" >
                <el-input type="textarea" v-model="ruleForm.reason" :rows="15"></el-input>
                <el-upload
                  class="upload-pic"
                  action="/test/upload"
                  multiple
                  :auto-upload = "true"
                  :file-list="fileList"
                  :on-success="uploadFileHandler"
                  :on-error="uploadFileErrorHandler"
                  :before-upload="beforeAvatarUpload"
                  :before-remove="beforeRemove">
                  <el-button size="small" type="primary" style="margin-top: 10;">上传图片</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="请假时间" required>
            <el-col :span="3">
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>    
      </div>
 </template>
 <script>
  import SearchBar from '../SearchBar.vue'
  import Vue from 'vue'
  const defaultRole = {
    job: '人事管理',
    sex: '男',
  }
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
            present:new Date(),
            ruleForm: {
                id: '',
                name: '',
                date: '',
                department: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
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
                    { type: 'array', required: true, message: '请至少选择一个请假类别', trigger: 'change' }
                ],
                reason: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
            role:{
              type:''
            },
            routes: [],
            dialogVisible: false,
            dialogType: 'edit',
            checkStrictly: false,
        }
    },
       mounted: function() {
        this.initStaff()
      },
       methods: {
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
         initStaff() {
          var _this = this
          this.$axios.post("/staff/page?page="+this.pages.pageNum+"&size="+this.pages.pageSize).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.rolesList = resp.data.data.list
              _this.totalPages = resp.data.data.total
            }
          })
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
      handleAddRole() {
        this.role = Object.assign({}, defaultRole)
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedNodes([])
        }
        this.isShow = false
        this.dialogType = 'new'
        this.titleName = '添加用户'
        this.dialogVisible = true
      },
       refreshing() {
        location.reload()
      },
       resetForm(formName) {
        this.$refs[formName].resetFields()
      },
       openDrawer(id) {
        this.calendar= 1
        this.drawer = true
      //drawer.visible=true
        var _this = this
        var _count = null;
        this.$axios
          //向后端发送数据
          .post('/staff/view?id=' + id, {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.role = resp.data.data,
              // var _this = this;
              // _this.id = _this.role.id,
              console.log("_this.id="+ _this.id);
              console.log(id);
              _this.id = id;
              console.log(this.id);
              // var _count = null;
              this.$axios.all([
                this.$axios.post("/checking/count?id=" + this.id, {}),
                this.$axios.post("/checking/all?id="+ this.id, {})
              ]).then(
                this.$axios.spread((resp1, resp2) => {
                  if (resp1.data && resp1.data.code === 200) {
                    _count = resp1.data.data;
                    console.log("_count1="+_count)
                  }
                  console.log("_count2="+_count)
                  if (resp2.data && resp2.data.code === 200) {
                    for( var i = 0; i < _count; i++) {
                      _this.calendarData.push({day: [], status: '✔️'});
                      _this.calendarData[i].day[0]= resp2.data.data[i].date;
                    }
                  }
                  this.calendar= 2
                })
              ).catch(err => console.log("Error: ", err))
            }
          })
          _this.id = '',
          _this.calendarData = [ ],
          _this.today = new Date()
      },
       handleEdit(id) {
        var _this = this
        this.$axios
          //向后端发送数据
          .post('/staff/detail?id=' + id, {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.role = resp.data.data
            }
          })
        this.isShow = true
        this.titleName = '编辑信息'
        this.dialogVisible = true
        this.dialogType = 'edit'
      },
       handleDelete(id){
        this.$confirm('确定删除此条信息吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async() => {
          var _this = this
          this.$axios
          //向后端发送数据
          .post('/staff/delete?id=' + id, {}).then(resp => {
            if (resp.data.code === 200) {
              if(this.click === 'search')
                listen.$emit("searchAll")
              else if(this.click === 'command')
                listen.$emit("searchJob")
              else this.initStaff()
              this.$message({
              type: 'success',
              message: '删除成功!'
              })
            }
          }) 
        })
          .catch(err => { console.error(err) })
          },
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
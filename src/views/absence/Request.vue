<template>
  <div style="text-align:left">
    <br><br>
      <el-button type="primary" style="margin-left:10px;" @click="refreshing">刷新</el-button>
      <el-button type="primary" @click="handleAddRole" style="margin-left:10px;">请假申请</el-button>

      <!-- 请假记录表 -->
      <el-table :data="rolesList" height=450px style="margin-left:90px;margin-top:30px;float:center;text-align:center" :header-cell-style="{textAlign: 'center'}">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="table-expand" style="margin-bottom: -20px;margin-top: 10px;">
              <el-form-item label="请假详情">
                <span>{{ scope.row.description }}</span>
                <!-- <span>{{ scope.row.prove }}</span> -->
                <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.prove"
                :fit="fit"></el-image>
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
        <el-table-column label="申请时间" width="100%" align="center">
          <template slot-scope="scope">
            {{ scope.row.time}}
          </template>
        </el-table-column>

        <el-table-column label="请假起始时间" width="200%" align="center">
          <template slot-scope="scope">
            {{ scope.row.startdate }}
          </template>
        </el-table-column>
        <el-table-column label="请假结束时间" width="200%" align="center">
          <template slot-scope="scope">
            {{ scope.row.enddate }}
          </template>
        </el-table-column>
        <el-table-column label="类型" width="80%" align="center">
          <template slot-scope="scope">
            {{ scope.row.type }}
          </template>
        </el-table-column>
        <el-table-column label="审批人" width="120%" align="center">
          <template slot-scope="scope">
            {{ scope.row.approver }}
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
      </el-table>


      <!-- 请假申请表单 -->
      <el-dialog :title="titleName" :visible.sync="dialogVisible" width="1000px" destroy-on-close>
        <el-form :model="role" :rules="rules" label-position="left" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-row :gutter="10">
            <el-col :span="6">
              <div>
                <el-form-item label="工号" prop="id">                   
                    <el-input v-model="staff.id" disabled></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="姓名" prop="name" >                   
                    <el-input v-model="staff.name" disabled style="margin-left: -15px;"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="所属部门" prop="department">
                    <el-input v-model="staff.job" disabled></el-input>
                </el-form-item>  
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="申请日期" prop="time">
                    <el-date-picker
                    v-model="role.time"
                    type="date"
                    placeholder="选择日期"
                    readonly
                    style="width:140px;"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </el-form-item>  
              </div>
            </el-col>     
          </el-row>

          <el-row  :gutter="20">
            <el-col :span="10">
              <el-form-item label="请假类型" prop="type">
                <el-select v-model="role.type" placeholder="请选择">
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
             <el-form-item label="请假时间" prop="absenceDate">
                <el-date-picker
                  v-model="role.absenceDate"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="datePickerOptions"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  >
                </el-date-picker>
            </el-form-item>
            </el-col>
          </el-row>

            <el-row>
              <el-col :span="20">
                <el-form-item label="请假事由" prop="reason" >
                  <el-input type="textarea" v-model="role.reason" :rows="10" style="width:850px ;"></el-input>
                </el-form-item>

                <el-form-item label="证明材料" prop="proof" >
                  <!-- <el-upload
                    class="upload-pic"
                    action="/test/up"
                    v-model="role.proof"
                    multiple
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :auto-upload = "true"
                    :file-list="fileList"
                    :on-success="uploadFileHandler"
                    :on-error="uploadFileErrorHandler"
                    :before-upload="beforeAvatarUpload"
                    :before-remove="beforeRemove">
                    <el-button size="small" type="primary" style="margin-top: 10;">上传图片</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload> -->

                  <el-upload
                    action="/test/up"
                    list-type="picture-card"
                    :auto-upload="true"
                    :on-success="uploadFileHandler"
                    :on-error="uploadFileErrorHandler"
                    :before-upload="beforeAvatarUpload"
                    :before-remove="beforeRemove">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="prove" alt=""
                      >
                      </span>
                    </div>                  
                  </el-upload>
                  
                  <!-- <el-dialog v-model="dialogVisible1" style="line-height: 0;">
                    <img style="width: 100%;height: 100%"  :src="dialogImageUrl" alt="" />
                  </el-dialog> -->
                </el-form-item>
              </el-col>
            </el-row>

        <!-- 需后端动态显示审批人 -->
            <el-form-item label="选择审批人" prop="approver" label-width="100px">
              <el-select v-model="role.approver" placeholder="请选择">
                <el-option
                  v-for="item in staff_approver"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div style="text-align:center;">
            <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
            <el-button type="primary" plain @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="danger" @click="closeDialog('ruleForm')">取消</el-button>
          </div>
      </el-dialog>    
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size= pages.pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total= totalPages>
        </el-pagination>
      </div>
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
          prove: '',
          time: '',
          datePickerOptions:{
            disabledDate:(time)=>{
              const nowDate = new Date();
              let oneDay = 1000 * 60 * 60 * 24;
              let oneYearLater = new Date(nowDate.getTime() + (oneDay * 365));
              return time.getTime() < nowDate || time.getTime() > oneYearLater;
            }
          },
          pages: {
            pageNum: 1,
            pageSize: 10,
          },
          totalPages: 0,
          loadId: '',
          dialogImageUrl: '',
          dialogVisible: false,
          options: [{
            value: '事假',
            label: '事假'
          }, {
            value: '病假',
            label: '病假'
          }, {
            value: '婚假',
            label: '婚假'
          }, {
            value: '丧假',
            label: '丧假'
          }, {
            value: '产假',
            label: '产假'
          }, {
            value: '年假',
            label: '年假'
          }, {
            value: '其他',
            label: '其他'
          }],
          // present:new Date(),
          role: {
              time: new Date(),
              absenceDate: '',
              type: '',
              reason:'',
              proof:'',
              approver:'',
          },
          rules: {
              id: [
                  { required: false }
              ],
              name: [
                  { required: false  }
              ],
              time: [
                  { required: true }
              ],
              department: [
                  { required: false }
              ],
              absenceDate: [
                { type: 'array',
                  required: true,
                  message: '请选择日期',
                  fields: {
                      0: {type: 'string',required: true, message: '请选择日期1'},
                      1: {type: 'string',required: true, message: '请选择日期2'}
                    }
                },
              ],
              type: [
                  { required: true, trigger: 'blur' }
              ],
              reason: [
                  { required: true, message: '请填写请假事由详情', trigger: 'blur' }
              ],
              approver: [
                  { required: true, message: '请选择审批人', trigger: 'change' }
              ],
              proof: [
                  { required: false, message: '请上传证明材料', trigger: 'change' }
              ],
          },
          dialogVisible: false,
          rolesList: [{
            description : '出门吃饭去',
            id: '1111111',
            name: '李小李',
            time: '1111-11-11',
            startdate: '1111-11-11',
            enddate: '1111-11-11',
            type: '事假',
            approver: '小李',
            status: '已销假',
            prove:'http://localhost:8887/1.jpg'
          }],
          staff: [{
            job: '',
            id: '',
            name: '',
          }],
          staff_approver: [{
            name: '',
            id: ''
          }]
        }
      },
       mounted: function() {
        this.initRequest()
      },
      created() {
        const Id = sessionStorage.getItem('userId2');
        this.loadId = Id;
      },

       methods: {

        // 接收上传文件后的返回地址
        uploadFileHandler(res){
        console.log(res)
        this.prove = "http://192.168.198.1:8887/"+res
      },


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
          this.$confirm(`确定移除 ${ file.name }？`)
          .then(async() => {
            this.prove = ''
          })
            .catch(err => { console.error(err) });
        },
        //页码
         handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.pages.pageSize = val
          if(this.click === 'command')
            listen.$emit("iscommand")
          else
            this.initRequest();
        },
        handleCurrentChange(val) {
          this.currentPage = val
          console.log(`当前页: ${val}`);
          this.pages.pageNum = val
          if(this.click === 'command')
            listen.$emit("iscommand")
          else
            this.initRequest();
        }, 
        //页面初始化渲染
         initRequest() {
          var _this = this
          this.$axios.post("/absence/page?page="+this.pages.pageNum+"&size="+this.pages.pageSize+"&id="+this.loadId,{}).then(resp => {
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
          if(command === "全部"){
            this.click = 'all'
            this.pages.pageNum = 1
          }
          else this.click = 'command'
            listen.$on("iscommand",()=>{
              console.log("in command")
              var _this = this
              console.log(command)
              this.$axios.post('/absence/status?status=' + command + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&keywords=" + this.loadId,{}).then(resp => {
                if(resp && resp.data.code === 200){
                  _this.rolesList = resp.data.data.list
                  _this.totalPages = resp.data.data.total
                }
              })
            })
            this.pages.pageNum = 1
            var _this = this
            console.log(command)
            this.$axios.post('/absence/status?status=' + command + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&keywords=" + this.loadId,{}).then(resp => {
              if(resp && resp.data.code === 200){
                _this.rolesList = resp.data.data.list
                _this.totalPages = resp.data.data.total
              }
            })

        },
        
        // 打开请假申请填写表单
      handleAddRole() {
        let dd = String(this.role.time.getDate()).padStart(2, '0');
        let mm = String(this.role.time.getMonth() + 1).padStart(2, '0');
        this.rolesList.time = this.role.time.getFullYear() + '-' + mm + '-' + dd
        console.log(this.rolesList.time)

        var _this = this
        this.$axios
          //向后端发送数据
          .get('/staff/detail?id=' + this.loadId , {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.staff = resp.data.data
            }
          })
          _this.role.id = this.staff.id
          this.role.name = this.staff.name
          this.role.department = this.staff.job

        // 获取审批人
        this.$axios
          //向后端发送数据
          .get('/staff/approve').then(resp => {
            if (resp && resp.data.code === 200) {
              _this.staff_approver = resp.data.data
            }
          })
          
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
        console.log(this.role.absenceDate)
        if (this.$refs[formName]) {
          this.$refs[formName].resetFields();
  }
      },

      // 关闭表单确认
      closeDialog(formName){
        this.$confirm('确定退出此界面?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async() => {
          this.resetForm(formName)
          this.dialogVisible=false
        })
          .catch(err => { console.error(err) })
      },

      // 提交表单
       submit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this
            this.$axios
              //向后端发送数据
              .post('/absence/add?id=' + this.loadId +'&name='+this.staff.name+'&time='+
              this.rolesList.time+'&startdate='+this.role.absenceDate[0]+'&enddate='+this.role.absenceDate[1]+'&description='+this.role.reason+'&approver='+
              this.role.approver+'&type='+this.role.type+'&prove='+this.prove, {}).then(resp => {
                if (resp && resp.data.code === 200) {
                  _this.rolesList = resp.data.data
                  _this.initRequest()
                }
                this.dialogVisible = false
              })
            }else{
              console.log('error submit!!');
              return false;
            }
        });

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
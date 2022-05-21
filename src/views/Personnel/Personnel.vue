<template>
    <div style="text-align:left">
      <br><br>
      <el-button type="primary" @click="handleAddRole" style="margin-left:10px;">添加</el-button>
        <el-button type="primary" style="margin-left:10px;" @click="refreshing">刷新</el-button>
        <search-bar @onSearch="searchResult" ref="searchBar" style="width:300px;margin-left:10px;float:right"></search-bar>
         <el-table :data="rolesList" height=450px style="width: 100%;margin-top:30px;float:center;text-align:center" :header-cell-style="{textAlign: 'center'}">
          <el-table-column label="工号" width="100%" align="center">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="130%" align="center">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="性别" width="70%" align="center">
            <template slot-scope="scope">
              {{ scope.row.sex }}
            </template>
          </el-table-column>
          <el-table-column label="邮箱" width="200%" align="center">
            <template slot-scope="scope">
              {{ scope.row.mail }}
            </template>
          </el-table-column>
          <el-table-column label="手机号" width="120%" align="center">
            <template slot-scope="scope">
              {{ scope.row.phone }}
            </template>
          </el-table-column>
          <el-table-column label="考勤（本月）" width="130%" align="center">
            <template slot-scope="scope">
              {{ scope.row.attendance }}天
            </template>
          </el-table-column>
          <el-table-column label="职务" width="100" align="center">
            <!-- slot-scope="scope" -->
            <template slot="header">
                <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link" style="color:#909399">
                    职务<i class="el-icon-arrow-down el-icon--right el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="全部">全部</el-dropdown-item>
                    <el-dropdown-item command="普通职员">普通职员</el-dropdown-item>
                    <el-dropdown-item command="财务管理">财务管理</el-dropdown-item>
                    <el-dropdown-item command="铁路管理">铁路管理</el-dropdown-item>
                    <el-dropdown-item command="用户管理">用户管理</el-dropdown-item>
                    <el-dropdown-item command="人事管理">人事管理</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
             <template slot-scope="scope">
              {{ scope.row.job }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="openDrawer(scope.row.id)">详情</el-button>
              <el-button type="primary" plain size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button type="danger" plain size="small" @click="handleDelete(scope.row.id)">删除</el-button>
               <el-drawer
                title="详细信息"
                :visible.sync="drawer"
                :direction="direction"
                :size="800"
                style="float:center"   
              >
                <el-descriptions class="margin-top" :labelStyle="{'font-size': '16px','font-weight': 'bold', }" :column="2" style="margin-left:80px">
                  <el-descriptions-item label="工号">{{ role.id }}</el-descriptions-item>
                  <el-descriptions-item label="姓名">{{ role.name }}</el-descriptions-item>
                  <el-descriptions-item label="身份证号">{{ role.idCard }}</el-descriptions-item>
                  <el-descriptions-item label="生日">{{role.birthday }}</el-descriptions-item>
                  <el-descriptions-item label="考勤（本月）">{{ role.attendance }}</el-descriptions-item>
                  <el-descriptions-item label="职务">
                    <el-tag size="medium">{{ role.job }}</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="性别">{{ role.sex }}</el-descriptions-item>
                  <el-descriptions-item label="联系方式">{{ role.phone }}</el-descriptions-item>
                  <el-descriptions-item label="邮箱">{{ role.mail }}</el-descriptions-item>
                  <el-descriptions-item label="银行卡号">{{ role.card }}</el-descriptions-item>
                  <el-descriptions-item label="联系地址">{{ role.address}}</el-descriptions-item>
                </el-descriptions>
                 <el-calendar :key="calendar">
                  <template slot="dateCell" slot-scope="{ data }">
                    <p>{{ data.day.split("-").slice(1).join("-") }}<br/>
                    <br></p>
                      <p>{{ (data.day == today) ? '✔️' : ''}}</p>
                    <div v-for="(item, index) in calendarData" :key="index">
                      <div v-if="data.day == item.day[0] && (data.day !== today)">
                        {{item.status}}
                      </div>
                    </div>
                  </template>
                </el-calendar>
               </el-drawer>
            </template>
          </el-table-column>
        </el-table>
         <el-dialog :title="titleName" :visible.sync="dialogVisible" width="700px" destroy-on-close>
          <el-form ref="ruleForm" :inline="true" :model="role" :rules="rules" label-width="80px" label-position="right">
            <el-span v-model="role.id" style="color:#FFF;font-size:1px">{{role.id}}</el-span>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="role.name" :disabled="isShow" placeholder="请输入姓名" style="width:200px;" />
            </el-form-item>
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="role.idCard" :disabled="isShow" maxlength="18" placeholder="请输入身份证号" style="width:270px;" />
            </el-form-item>
            <el-form-item label="职务" prop="job">
              <template label-position="center">
                <el-radio v-model="role.job" class="job" label="人事管理"></el-radio>
                <el-radio v-model="role.job" class="job" label="财务管理"></el-radio>
                <el-radio v-model="role.job" class="job" label="铁路管理"></el-radio>
                <el-radio v-model="role.job" class="job" label="用户管理"></el-radio>
                <el-radio v-model="role.job" class="job" label="普通职员"></el-radio>
              </template>
            </el-form-item>
            <el-form-item label="性别" prop="sex" style="width:450px;">
              <template label-position="center">
                <el-radio v-model="role.sex" :disabled="isShow" class="sex" label="男">男</el-radio>
                <el-radio v-model="role.sex" :disabled="isShow" class="sex" label="女">女</el-radio>
              </template>
            </el-form-item>
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
        <br><br>
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
          calendar:0,
          click: 'all',
          myCommand: '',
          currentPage: 1,
          drawer: false,
          direction: 'rtl',
          edit: false,
          index: -1,
          keywords: '',
          titleName: '编辑',
          isShow: true,
          pages: {
            pageNum: 1,
            pageSize: 10,
          },
          totalPages: 0,
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
            birthday: '',
            calendarData: [],
            today: new Date(),
          },
          list: {
            radio: '1'
          },
          rules: {
            name: [{ required: true, message: '请输入姓名', trigger: 'blur' },
              { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }],
            idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' },
              { min: 18, max: 18, message: '长度为18个数字', trigger: 'blur' }],
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
            staff: [{ required: true, message: '请选择管理权限', trigger: 'blur' }],
            sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
            job: [{ required: true, message: '请选择职务', trigger: 'blur' }],
            card: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }]
          },
          routes: [],
          rolesList: [{
            id: '',
            calendarData: [ ],
            today: new Date(),
            job: '1',
            id: '111111',
            name: '111',
            sex: '1',
            mail: '1',
            phone: '1',
            idCard: '1',
            card: '1',
            address: '1',
            attendance: '1',
            birthday: '1'
          }],
          dialogVisible: false,
          dialogType: 'edit',
          checkStrictly: false,
        }
    },
       mounted: function() {
        this.initStaff()
      },
       methods: {
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
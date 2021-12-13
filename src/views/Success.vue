<template>
    <div style="text-align:center">
    <br><br>
     <el-button type="primary" @click="handleAddRole">添加</el-button>
        <el-button type="primary" style="margin-left:10px;" @click="refreshing">刷新</el-button>
        <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>

        <el-table :data="rolesList" style="width: 100%;margin-top:30px;" >
          <el-table-column label="工号" width="100%">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="150%">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="性别" width="80%">
            <template slot-scope="scope">
              {{ scope.row.sex }}
            </template>
          </el-table-column>
          <el-table-column label="邮箱" width="200%">
            <template slot-scope="scope">
              {{ scope.row.mail }}
            </template>
          </el-table-column>
          <el-table-column label="手机号" width="120%">
            <template slot-scope="scope">
              {{ scope.row.phone }}
            </template>
          </el-table-column>
          <el-table-column label="考勤（本月）" width="130%">
            <template slot-scope="scope">
              {{ scope.row.attendance }}
            </template>
          </el-table-column>
          <el-table-column label="职务" width="150%">
            <template slot-scope="scope">
              {{ scope.row.job }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="openDrawer(scope.row.id)">详情</el-button>
              <el-button type="primary" plain size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button type="danger" plain size="small" @click="handleDelete(scope.row.id)">删除</el-button>
    
              <el-drawer
                title="我是标题"
                :visible.sync="drawer"
                :direction="direction"
                :size="800"
              >
                <el-descriptions class="margin-top" title="无边框列表" :column="2" :size="size">
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
              </el-drawer>
            </template>
          </el-table-column>
        </el-table>

        <!-- <div v-if="dialogType === 'new'" style="color:#FFF">{{titleName = '添加用户'}}</div>
        <div v-else>{{titleName = '编辑信息'}}</div> -->
        <el-dialog :title="titleName" :visible.sync="dialogVisible">
          <el-form ref="ruleForm" :inline="true" :model="role" :rules="rules" label-width="80px" label-position="right">
            <el-span v-model="role.id" style="colour:white">{{role.id}}</el-span>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="role.name" placeholder="请输入姓名" style="width:200px;" />
            </el-form-item>
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="role.idCard" maxlength="18" placeholder="请输入身份证号" style="width:270px;" />
            </el-form-item>
            <el-form-item label="职务" prop="job">
              <template label-position="center">
                <el-radio v-model="role.job" class="job" label="人事管理"></el-radio>
                <el-radio v-model="role.job" class="job" label="财务管理"></el-radio>
                <el-radio v-model="role.job" class="job" label="铁路管理"></el-radio>
                <el-radio v-model="role.job" class="job" label="用户管理"></el-radio>
              </template>
            </el-form-item>
            <el-form-item label="性别" prop="sex" style="width:450px;">
              <template label-position="center">
                <el-radio v-model="role.sex" class="sex" label="男">男</el-radio>
                <el-radio v-model="role.sex" class="sex" label="女">女</el-radio>
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
            <!-- </el-form-item> -->
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
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
 </template>
 
<script>
  import SearchBar from './SearchBar'
  const defaultRole = {
    job: '人事管理',
    id: '',
    name: '',
    sex: '男',
    mail: '',
    phone: '',
    idCard: '',
    card: '',
    address: '',
    attendance: '',
    birthday: ''
  }

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
          currentPage1: 5,
          currentPage2: 5,
          currentPage3: 5,
          currentPage4: 4,
          drawer: false,
          direction: 'rtl',
          edit: false,
          index: -1,
          keywords: '',
          titleName: '编辑',
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
            manager: [{ required: true, message: '请选择管理权限', trigger: 'blur' }],
            sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
            job: [{ required: true, message: '请选择职务', trigger: 'blur' }],
            card: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }]
          },
          routes: [],
          rolesList: [],
          dialogVisible: false,
          dialogType: 'edit',
          checkStrictly: false,
          defaultProps: {
            children: 'children',
            label: 'title'
          }
        }
    },
    
      mounted: function() {
        this.loadStaff()
      },

      methods: {
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },      
        loadStaff(){
          var _this = this
          this.$axios.get('/manager/all').then(resp => {
            if (resp.data.code === 200) {
              _this.rolesList = resp.data.data
            }
          })
        },

        searchResult() {
          var _this = this
          //  alert(this.$refs.searchBar.keywords)    //测试输入框中的内容
          this.$axios
            //向后端发送数据
            .get('/manager/search?keywords=' + this.$refs.searchBar.keywords, {}).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.rolesList = resp.data.data

              }
            })
        },
        generateRoutes(routes, basePath = '/') {
        const res = []

        for (let route of routes) {
          // skip some route
          if (route.hidden) { continue }

          const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

          if (route.children && onlyOneShowingChild && !route.alwaysShow) {
            route = onlyOneShowingChild
          }

          const data = {
            path: path.resolve(basePath, route.path),
            title: route.meta && route.meta.title

          }

          // recursive child routes
          if (route.children) {
            data.children = this.generateRoutes(route.children, data.path)
          }
          res.push(data)
        }
        return res
      },
      generateArr(routes) {
        let data = []
        routes.forEach(route => {
          data.push(route)
          if (route.children) {
            const temp = this.generateArr(route.children)
            if (temp.length > 0) {
              data = [...data, ...temp]
            }
          }
        })
        return data
      },
      handleAddRole() {
        this.role = Object.assign({}, defaultRole)
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedNodes([])
        }
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
      this.drawer = true
      //drawer.visible=true
        var _this = this
        this.$axios
          //向后端发送数据
          .post('/manager/view?id=' + id, {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.role = resp.data.data
            }
          })
      },
      handleEdit(id) {
        var _this = this
        this.$axios
          //向后端发送数据
          .post('/manager/detail?id=' + id, {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.role = resp.data.data
            }
          })
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
          .post('/manager/delete?id=' + id, {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.rolesList = resp.data.data  //重新刷新数据
                this.$message({
                type: 'success',
                message: '删除成功!'
                })
              }
          })
        })
          .catch(err => { console.error(err) })
          },
//      submit() {
//        var _this = this
//        this.$axios
//          //向后端发送数据
//          .post('/manager/add?name=' + this.role.name+'&sex='+this.role.sex+'&idCard='+
//          this.role.idCard+'&job='+this.role.job+'&phone='+this.role.phone+'&mail='+
//                        this.role.mail+'&card='+this.role.card+'&address='+this.role.address, {}).then(resp => {
//            if (resp && resp.data.code === 200) {
//              _this.rolesList = resp.data.data
//            }
//          })
//        this.dialogVisible = false
//      },
      submit(formName){
        if(this.dialogType === 'new'){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var _this = this
              this.$axios
                //向后端发送数据
                .post('/manager/add?name=' + this.role.name+'&sex='+this.role.sex+'&idCard='+
                this.role.idCard+'&job='+this.role.job+'&phone='+this.role.phone+'&mail='+
                              this.role.mail+'&card='+this.role.card+'&address='+this.role.address, {}).then(resp => {
                  if (resp && resp.data.code === 200) {
                    _this.rolesList = resp.data.data
                  }
                })
              this.loadStaff()
              var i = 0
              for (i;i<(_this.rolesList.length);i++){ 
                console.log("if外 rolesList: ",_this.rolesList[i].idCard)
                console.log("if外 role: ",this.role.idCard)
                if(_this.rolesList[i].idCard == this.role.idCard){
                  console.log("if内 rolesList: ",_this.rolesList[i].idCard)
                  console.log("if内 role: ",this.role.idCard)
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
                .post('/manager/edit?id='+this.role.id+'&name=' + this.role.name+'&sex='+this.role.sex+'&idCard='+
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
 </style>
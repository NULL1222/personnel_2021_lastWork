<template>
    <div style="text-align:left">
      <br><br>
        <el-button type="primary" style="margin-left:10px;" @click="refreshing">刷新</el-button>
        <search-bar @onSearch="searchResult" ref="searchBar" style="width:300px;margin-left:10px;float:right"></search-bar>

        <el-table :data="rolesList" style="width: 100%;margin-top:30px;float:center">
          <el-table-column label="账号（手机号）" width="100%">
            <template slot-scope="scope">
              {{ scope.row.phone }}
            </template>
          </el-table-column>
          <el-table-column label="用户名" width="150%">
            <template slot-scope="scope">
              {{ scope.row.nickname }}
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
          <el-table-column label="积分" width="200%">
            <template slot-scope="scope"> 
              {{ scope.row.integral }}
            </template>
          </el-table-column>
          <el-table-column label="用户状态" width="150%">
            <!-- slot-scope="scope" -->
            <template slot="header">
                <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link" style="color:#909399">
                    用户状态<i class="el-icon-arrow-down el-icon--right el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="全部">全部</el-dropdown-item>
                    <el-dropdown-item command="已禁用">已禁用</el-dropdown-item>
                    <el-dropdown-item command="已启用">已启用</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            <template slot-scope="scope">
              {{ scope.row.state }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="openDrawer(scope.row.phone)">详情</el-button>
              <el-button type="danger" plain size="small" @click="handleDisable(scope.row.phone)">禁用</el-button>
    
              <el-drawer
                title="详细信息"
                :visible.sync="drawer"
                :direction="direction"
                :size="800"
                style="float:center"
              >
                <el-descriptions class="margin-top" :column="2" :size="size" style="margin-left:80px">
                  <el-descriptions-item label="手机号（账号）">{{ role.phone }}</el-descriptions-item>
                  <el-descriptions-item label="姓名">{{ role.name }}</el-descriptions-item>
                  <el-descriptions-item label="用户名">{{ role.nickname }}</el-descriptions-item>
                  <el-descriptions-item label="性别">{{role.sex }}</el-descriptions-item>
                  <el-descriptions-item label="证件类型">
                    <el-tag size="medium">{{ role.documentType }}</el-tag> 
                  </el-descriptions-item>
                  <el-descriptions-item label="身份证号">{{ role.id }}</el-descriptions-item>
                  <el-descriptions-item label="邮箱">{{ role.mail }}</el-descriptions-item>
                  <el-descriptions-item label="用户状态">{{ role.state }}</el-descriptions-item>
                  <el-descriptions-item label="用户积分">{{ role.integral}}</el-descriptions-item>
                </el-descriptions>
              </el-drawer>
            </template>
          </el-table-column>
        </el-table>

        <!-- <el-dialog :title="titleName" :visible.sync="dialogVisible" width="700px" destroy-on-close>
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
        </el-dialog> -->
        <br><br>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
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
  const defaultRole = {
    job: '人事管理',
    sex: '男',
  }

  var listen = new Vue()

  import Cookies from 'js-cookie';
  import Vue from 'vue'
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
          click: 'all',
          currentPage1: 1,
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
            name: '',
            nickname: '',
            sex: '',
            mail: '',
            phone: '',
            id: '',
            state: '',
            documentType: '',
            integral: '',
          },
          list: {
          radio: '1'
        },
          routes: [],
          rolesList: [],
          checkStrictly: false,
        }
    },
    
      mounted: function() {
        this.initUser()
      },

      methods: {
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.pages.pageSize = val
          if(this.click === 'search')
            listen.$emit("searchAll")
          else if(this.click == 'command')
            listen.$emit("searchState")
          else this.initUser();
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.pages.pageNum = val
          if(this.click === 'search')
            listen.$emit("searchAll")
          else if(this.click == 'command')
            listen.$emit("searchState")
          else this.initUser();
        }, 
        
        initUser() {
          var _this = this
          this.$axios.post("/user/page?page="+this.pages.pageNum+"&size="+this.pages.pageSize).then(resp => {
            if (resp && resp.data.code === 200) {
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
              .get('/user/search?keywords=' + this.$refs.searchBar.keywords + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize, {}).then(resp => {
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
            .get('/user/search?keywords=' + this.$refs.searchBar.keywords + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize, {}).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.rolesList = resp.data.data.list
                _this.totalPages = resp.data.data.total
              }
            })
        },
//        generateRoutes(routes, basePath = '/') {
//        const res = []
//        for (let route of routes) {
//          // skip some route
//          if (route.hidden) { continue }
//
//          const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
//          if (route.children && onlyOneShowingChild && !route.alwaysShow) {
//            route = onlyOneShowingChild
//          }
//          const data = {
//            path: path.resolve(basePath, route.path),
//            title: route.meta && route.meta.title

//          }

//          // recursive child routes
//            if (route.children) {
//              data.children = this.generateRoutes(route.children, data.path)
//            }
//            res.push(data)
//          }
//          return res
//        },
//      generateArr(routes) {
//        let data = []
//        routes.forEach(route => {
//          data.push(route)
//          if (route.children) {
//            const temp = this.generateArr(route.children)
//            if (temp.length > 0) {
//              data = [...data, ...temp]
//            }
//          }
//        })
//        return data
//      },
      refreshing() {
        location.reload()
      },
      handleCommand(command){
          if(command === "全部")
            this.click = 'all'
          else this.click = 'command'
          listen.$on("searchState",()=>{
            console.log("in command")
            var _this = this
            console.log(command)
            this.$axios.post('/user/state?state=' + command + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize,{}).then(resp => {
              if(resp && resp.data.code === 200){
                _this.rolesList = resp.data.data.list
                _this.totalPages = resp.data.data.total
              }
            })
          })
          this.pages.pageNum = 1
          var _this = this
          console.log("out command")
          this.$axios.post('/user/state?state=' + command + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize,{}).then(resp => {
            if(resp && resp.data.code === 200){
              _this.rolesList = resp.data.data.list
              _this.totalPages = resp.data.data.total
            }
          })
      },
      openDrawer(phone) {
      this.drawer = true
      //drawer.visible=true
        var _this = this
        this.$axios
          //向后端发送数据
          .post('/user/detail?phone=' + phone, {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.role = resp.data.data
            }
          })
      },
      handleDisable(phone){
        this.$confirm('确定禁用此用户吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async() => {
          var _this = this
          this.$axios
          //向后端发送数据
          .post('/user/changeState?state=' + phone, {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.rolesList = resp.data.data  //重新刷新数据
                this.$message({
                type: 'success',
                message: '禁用成功!'
                })
              }
          })
        }).catch(err => { console.error(err) })},

    }
  }
</script>
 <!-- 添加“scoped”属性以将CSS仅限于此组件 -->
 <style scoped>
 </style>
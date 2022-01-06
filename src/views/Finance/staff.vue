<template>
    <div style="text-align:left">
      <br><br>
        <el-button type="primary" style="margin-left:10px;" @click="refreshing">刷新</el-button>
        <el-button type="primary" style="margin-left:10px;" @click="output">导出</el-button>
        <el-button type="primary" style="margin-left:10px;" @click="send">发送工资单</el-button>
        <search-bar @onSearch="searchResult" ref="searchBar" style="width:300px;margin-left:10px;float:right"></search-bar>

        <el-table :data="rolesList" height=430px style="width: 1100px;margin-top:30px;float:center;margin-left:70px;" @filter-change="filterChange" 
          :header-cell-style="{textAlign: 'center'}" @selection-change="handleSelectionChange" :row-key="getRowKeys">
          <el-table-column width="50%" type="selection" align="center">
          </el-table-column>
          <el-table-column label="工号" width="100%" align="center">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="150%" align="center">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="性别" width="80%" align="center">
            <template slot-scope="scope">
              {{ scope.row.sex }}
            </template>
          </el-table-column>
          <el-table-column label="银行卡号" width="120%" align="center">
            <template slot-scope="scope">
              {{ scope.row.card }}
            </template>
          </el-table-column>
          <el-table-column label="基础工资" width="130%" align="center">
            <template slot-scope="scope">
              {{ scope.row.basicSalary }}
            </template>
          </el-table-column>
          <el-table-column label="绩效工资" width="130%" align="center">
            <template slot-scope="scope">
              {{ scope.row.achievement }}
            </template>
          </el-table-column>
          <el-table-column label="工资" width="130%" align="center">
            <template slot-scope="scope">
              {{ scope.row.salary }}
            </template>
          </el-table-column>
          <el-table-column label="工资月份" width="130%" 
            :filters="getfilterNameItem()"
            column-key="salaryMonth"
            align="center">
            <template slot-scope="scope">
              {{ scope.row.salaryMonth }}
            </template>
          </el-table-column>
        </el-table>
        <br><br>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size= pages.pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total= totalPages
          style="margin-top:-20px;">
        </el-pagination>
      </div>
    </div>
 </template>
 
<script>
  import SearchBar from '../SearchBar.vue'
  import Vue from 'vue'
  import { downloadXlsx } from '../../../utils/xlsx.js';
  import { Loading } from 'element-ui';
  let loading;
  const defaultRole = {
    job: '人事管理',
    sex: '男',
  }
  const startLoading = () => {  // 使用Element loading-start 方法
    loading = Loading.service({
      lock: true,
      text: '邮件发送中……',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  };

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
          multipleSelection: [],
          salaryMonth: [],
          monthSize: 0,
          postSalary: '',
          click: 'all',
          myCommend: '',
          currentPage: 1,
          drawer: false,
          keywords: '',
          pages: {
            pageNum: 1,
            pageSize: 10,
          },
          totalPages: 0,
          role: {
            id: '',
            name: '',
            sex: '',
            phone: '',
            achievement: '',
            basicSalary: '',
            salary: '',
            salaryMonth: '',
            mail: '',
            card: '',
          },
          routes: [],
          rolesList: [
            {
            id: '1111101',
            name: '小王',
            sex: '女',
            phone: '13355436754',
            achievement: '2000元',
            basicSalary: '1000元',
            salary: '3000元',
            salaryMonth: '2021-01',
            mail: '2244543343@qq.com',
            },
          ],
          salaryList: [],
          salaryNum: 0,
        }
    },
    
      mounted: function() {
        this.initSalary()
      },

      methods: {
        getfilterNameItem() {
          var _this = this
          this.$axios.post("/salary/amount").then(resp=>{
            if(resp && resp.data.code === 200){
              _this.monthSize = resp.data.data
            }
          })
          this.$axios.post("/salary/view").then(resp => {
            if (resp && resp.data.code === 200) {
              var i = 0
              for(i;i<_this.monthSize;i++)
                _this.salaryMonth[i] = resp.data.data[i].salaryMonth
            }
          })
          console.log(_this.salaryMonth)

          let apiArr = [{text: '2021-01', value: '2021-01'}, {text: '2021-02', value: '2021-02'}, {text: '2021-03', value: '2021-03'}, {text: '2021-04', value: '2021-04'},
            {text: '2021-05', value: '2021-05'}, {text: '2021-06', value: '2021-06'}, {text: '2021-07', value: '2021-07'}, {text: '2021-08', value: '2021-08'},
            {text: '2021-09', value: '2021-09'}, {text: '2021-10', value: '2021-10'}, {text: '2021-11', value: '2021-11'}, {text: '2021-12', value: '2021-12'}];
//          apiArr = _this.salaryMonth
          console.log(apiArr[3].text)

          // for(var n = 0;n < _this.monthSize;n++){
          //   apiArr[n].text = _this.salaryMonth[n]
          //   console.log(apiArr[n].text)
          //   apiArr[n].value = _this.salaryMonth[n]
          //   console.log(apiArr[n].value)
          // }
          return apiArr;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.pages.pageSize = val
          if(this.click === 'search')
            listen.$emit("searchAll")
          else if(this.click === 'searchDate')
            listen.$emit("searchDate")
          else this.initSalary();
        },
        handleCurrentChange(val) {
          this.currentPage = val
          console.log(`当前页: ${val}`);
          this.pages.pageNum = val
          if(this.click === 'search')
            listen.$emit("searchAll")
          else if(this.click === 'searchDate')
            listen.$emit("searchDate")
          else this.initSalary();
        }, 
        
        initSalary() {
          var _this = this
          this.$axios.post("/salary/page?page="+this.pages.pageNum+"&size="+this.pages.pageSize).then(resp => {
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
              .post('/salary/search?keywords=' + this.$refs.searchBar.keywords + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&salaryMonth=" + this.postSalary, {}).then(resp => {
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
            .post('/salary/search?keywords=' + this.$refs.searchBar.keywords + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&salaryMonth=" + this.postSalary, {}).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.rolesList = resp.data.data.list
                _this.totalPages = resp.data.data.total
              }
            })
        },
        filterChange(filterObj) {
          this.postSalary = ''
          this.click = 'searchDate'
          var _this = this
          listen.$on("searchDate",()=>{
            console.log("长度：",filterObj.salaryMonth.length)
            if(filterObj.salaryMonth.length > 0){
            var i = 0
            this.postSalary = "("
              for(i = 0;i < filterObj.salaryMonth.length;i++){
                this.postSalary+="'"
                this.postSalary+=filterObj.salaryMonth[i]
                this.postSalary+="-11',"
              }
            this.postSalary = this.postSalary.substring(0,this.postSalary.length-1)
            this.postSalary+=")"
            console.log(this.postSalary)
            this.$axios.post('/salary/search?keywords=' + this.$refs.searchBar.keywords + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&salaryMonth=" + this.postSalary, {}).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.rolesList = resp.data.data.list
                _this.totalPages = resp.data.data.total
              }
            })
          }else{
            this.$axios.post('/salary/clearMonth?keywords=' + this.$refs.searchBar.keywords + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize, {}).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.rolesList = resp.data.data.list
                _this.totalPages = resp.data.data.total
              }
            })
          }
        })
          if(filterObj.salaryMonth.length > 0){
            var i = 0
            this.postSalary = "("
            for(i = 0;i < filterObj.salaryMonth.length;i++){
              this.postSalary+="'"
              this.postSalary+=filterObj.salaryMonth[i]
              this.postSalary+="-11',"
            }
            this.postSalary = this.postSalary.substring(0,this.postSalary.length-1)
            this.postSalary+=")"
            console.log(this.postSalary)
            this.$axios.post('/salary/search?keywords=' + this.$refs.searchBar.keywords + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&salaryMonth=" + this.postSalary, {}).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.rolesList = resp.data.data.list
                _this.totalPages = resp.data.data.total
              }
            })
          }else{
            console.log("看看这个：",filterObj.salaryMonth)
            this.$axios.post('/salary/clearMonth?keywords=' + this.$refs.searchBar.keywords + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize, {}).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.rolesList = resp.data.data.list
                _this.totalPages = resp.data.data.total
              }
            })
          }
        },
        handleSelectionChange(rows) {
            this.multipleSelection = [];
            if (rows) {
                rows.forEach(row => {
                    if (row) {
                      this.multipleSelection.push(row);
                    }
                });
            }
            console.log(this.multipleSelection);
        },
        output(){
          let datalist = [];
          datalist.push([
            "工号",
            "姓名",
            "性别",
            "手机号",
            "时间",
            "基础工资",
            "绩效工资",
            "总工资",
          ]);
          this.multipleSelection.forEach(item=>{
            datalist.push([
              item.id,
              item.name,
              item.sex,
              item.card,
              item.salaryMonth,
              item.achievement,
              item.basicSalary,
              item.salary,
            ]);
          });
          downloadXlsx(datalist, "员工工资单.xlsx");
        },
        send(){
          var _this = this
          const nowTime = new Date()
          var time = nowTime.getFullYear() + '-' + (nowTime.getMonth()+1) + '-11'
          let salaryList = []

          this.$axios.post('/salary/countMonth?salaryMonth=' + time , {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.salaryNum = resp.data.data
            }
          })
          var count = 0

          this.$axios.post('/salary/sameMonth?salaryMonth=' + time , {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.salaryList = resp.data.data
            }
            console.log(_this.salaryList)
            this.salaryList.forEach(item => {
              salaryList.push([
              "工号",
              "姓名",
              "性别",
              "手机号",
              "时间",
              "基础工资",
              "绩效工资",
              "总工资",
              ]);
              salaryList.push([
                item.id,
                item.name,
                item.sex,
                item.card,
                item.salaryMonth,
                item.basicSalary,
                item.achievement,
                item.salary,
              ]);
              count += 1
              downloadXlsx(salaryList, item.id+"员工工资单.xlsx");
              salaryList = []
              startLoading();
              this.$axios.post('/test/email?email=' + item.mail + "&file=" + item.id+"员工工资单.xlsx", {}).then(resp => {
                if (resp && resp.data.code === 200) {
                  loading.close();
                }
              })
            });
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

    }
  }
</script>
 <!-- 添加“scoped”属性以将CSS仅限于此组件 -->
 <style scoped>
 </style>
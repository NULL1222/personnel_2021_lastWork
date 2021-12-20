<template>
  <div style="text-align:left">
    <br><br>
      <el-button type="primary" style="margin-left:10px;" @click="refreshing">刷新</el-button>
      <search-bar @onSearch="searchResult" ref="searchBar" style="width:300px;margin-left:10px;float:right"></search-bar>
      <br><br>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-left:10px;">
        <el-tab-pane label="收入" name="first">
          <el-table aria-disabled="true" :data="rolesList" height=400px style="margin-left:250px;width:100%;margin-top:20px;float:center" :header-cell-style="{textAlign: 'center'}">
          <el-table-column label="日期" width="180">
            <template slot-scope="scope">
              {{ scope.row.date }}
            </template>
          </el-table-column>
          <el-table-column label="售票收入" width="180">
            <template slot-scope="scope">
              {{ scope.row.ticketingRevenue }}
            </template>
          </el-table-column>
          <el-table-column label="广告费收入" width="180">
            <template slot-scope="scope">
              {{ scope.row.advertisement }}
            </template>
          </el-table-column>
          <el-table-column label="商务合作收入" width="180">
            <template slot-scope="scope">
              {{ scope.row.cooperation }}
            </template>
          </el-table-column>
          </el-table>  
        </el-tab-pane>

        <el-tab-pane label="支出" name="second">
          <el-table ref="tableOut" :data="rolesList" height=400px style="margin-left:170px;width:100%;margin-top:20px;float:center" :header-cell-style="{textAlign: 'center'}">
            <el-table-column label="日期" width="180">
              <template slot-scope="scope">
                {{ scope.row.date }}
              </template>
            </el-table-column>
            <el-table-column label="工资支出" width="180">
            <template slot-scope="scope">
              {{ scope.row.SalaryExpend }}
            </template>
          </el-table-column>
          <el-table-column label="水电支出" width="180">
            <template slot-scope="scope">
              {{ scope.row.hydropower }}
            </template>
          </el-table-column>
          <el-table-column label="物业管理费" width="180">
            <template slot-scope="scope">
              {{ scope.row.manangementFee }}
            </template>
          </el-table-column>
          <el-table-column label="服务器费" width="180">
            <template slot-scope="scope">
              {{ scope.row.sever }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      </el-tabs>

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
        activeName: 'first',
        myCommend: '',
        currentPage: 1,
        pages: {
          pageNum: 1,
          pageSize: 10,
        },
        totalPages: 0,
        role: {
          date: '',
          ticketingRevenue: '', // 售票收入
          SalaryExpend: '', // 工资支出
          hydropower: '', // 水电支出
          manangementFee: '', // 物业管理费
          sever: '', // 服务器费
          advertisement: '', // 广告费收入
          cooperation: '', // 商务合作收入
        },
        routes: [],
        rolesList: [],
      }
  },
  
    mounted: function() {
      this.initFinance()
    },

    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pages.pageSize = val
        if(this.click === 'search')
          listen.$emit("searchAll")
        else this.initFinance();
      },
      handleCurrentChange(val) {
        this.currentPage = val
        console.log(`当前页: ${val}`);
        this.pages.pageNum = val
        if(this.click === 'search')
          listen.$emit("searchAll")
        else this.initFinance();
      }, 
      
      initFinance() {
        var _this = this
        this.$axios.post("/manager/page?page="+this.pages.pageNum+"&size="+this.pages.pageSize).then(resp => {
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
            .get('/manager/search?keywords=' + this.$refs.searchBar.keywords + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&job=" + this.myCommend, {}).then(resp => {
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
          .get('/manager/search?keywords=' + this.$refs.searchBar.keywords + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&job=" + this.myCommend, {}).then(resp => {
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
      handleClick(tab, event) {
        this.activeName = tab.name;
        var that = this;
        setTimeout(function(){
            that.onQuery();
        },500);
      },        
  }
}
</script>
<!-- 添加“scoped”属性以将CSS仅限于此组件 -->
<style scoped>
</style>
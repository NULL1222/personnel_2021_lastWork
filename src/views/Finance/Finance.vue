<template>
  <div style="text-align:left">
      <groupcard></groupcard>
      <el-button type="primary" style="float: right;margin-left:10px;margin-top: -25px;" @click="refreshing">刷新</el-button>
      <el-col :span=24>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-left:10px;margin-top: -35px;">
        <el-tab-pane label="收入" name="first">
          <el-table aria-disabled="true" :data="InList" height=385px style="margin-left:250px;width:100%;margin-top:-15px;float:center">
          <el-table-column label="日期" width="180" align="center">
            <template slot-scope="scope">
              {{ scope.row.date }}
            </template>
          </el-table-column>
          <el-table-column label="售票收入" width="180" align="center">
            <template slot-scope="scope">
              {{ scope.row.ticketingRevenue }}
            </template>
          </el-table-column>
          <el-table-column label="广告费收入" width="180" align="center">
            <template slot-scope="scope">
              {{ scope.row.advertisement }}
            </template>
          </el-table-column>
          <el-table-column label="商务合作收入" width="180" align="center">
            <template slot-scope="scope">
              {{ scope.row.cooperation }}
            </template>
          </el-table-column>
          </el-table>  
          <br><br>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="currentPage1"
              :page-sizes="[10, 20, 30, 40]"
              :page-size= pages1.pageSize
              layout="total, sizes, prev, pager, next, jumper"
              :total= totalPages1
              style="margin-top: -30px;">
            </el-pagination>
          </div>
      
        </el-tab-pane>

        <el-tab-pane label="支出" name="second">
          <el-table :data="OutList" height=400px style="margin-left:170px;width:100%;margin-top:20px;float:center" :header-cell-style="{textAlign: 'center'}">
            <el-table-column label="日期" width="180" align="center">
              <template slot-scope="scope">
                {{ scope.row.date }}
              </template>
            </el-table-column>
            <el-table-column label="工资支出" width="180" align="center">
            <template slot-scope="scope">
              {{ scope.row.salaryExpend }}
            </template>
          </el-table-column>
          <el-table-column label="水电支出" width="180" align="center">
            <template slot-scope="scope">
              {{ scope.row.hydropower }}
            </template>
          </el-table-column>
          <el-table-column label="物业管理费" width="180" align="center">
            <template slot-scope="scope">
              {{ scope.row.managementFee }}
            </template>
          </el-table-column>
          <el-table-column label="服务器费" width="180" align="center">
            <template slot-scope="scope">
              {{ scope.row.server }}
            </template>
          </el-table-column>
        </el-table>
        <br><br>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="currentPage2"
            :page-sizes="[10, 20, 30, 40]"
            :page-size= pages2.pageSize
            layout="total, sizes, prev, pager, next, jumper"
            :total= totalPages2>
          </el-pagination>
        </div>
    
      </el-tab-pane>

      </el-tabs>
    </el-col>

  </div>
</template>

<script>
import groupcard from './groupcard/index'
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
      SearchBar,
      groupcard
    },
    computed:{
      username(){
        return Cookies.get('id');
      }
    },
    data() {
      return {
        activeName: 'first',
        currentPage1: 1,
        currentPage2: 1,
        pages1: {
          pageNum: 1,
          pageSize: 10,
        },
        pages2: {
          pageNum: 1,
          pageSize: 10,
        },
        totalPages1: 0,
        totalPages2: 0,
        inRole: {
          date: '',
          ticketingRevenue: '', // 售票收入
          advertisement: '', // 广告费收入
          cooperation: '', // 商务合作收入
        },
        outRole: {
          date: '',
          salaryExpend: '', // 工资支出
          hydropower: '', // 水电支出
          managementFee: '', // 物业管理费
          server: '', // 服务器费
        },
        routes: [],
        InList: [],
        OutList:[],
      }
  },
  
    mounted: function() {
      this.initFinance1() 
    },

    methods: {
      handleSizeChange1(val) {
        console.log(`每页 ${val} 条`);
        this.pages1.pageSize = val
        this.initFinance1();
      },
      handleCurrentChange1(val) {
        this.currentPage1 = val
        console.log(`当前页: ${val}`);
        this.pages1.pageNum = val
        this.initFinance1();
      }, 
      handleSizeChange2(val) {
        console.log(`每页 ${val} 条`);
        this.pages2.pageSize = val
        this.initFinance2();
      },
      handleCurrentChange2(val) {
        this.currentPage2 = val
        console.log(`当前页: ${val}`);
        this.pages2.pageNum = val
        this.initFinance2();
      }, 

      
      initFinance1() {
        var _this = this
        this.$axios.post("/economic/page1?page="+this.pages1.pageNum+"&size="+this.pages1.pageSize).then(resp => {
          if (resp && resp.data.code === 200) {
            _this.InList = resp.data.data.list
            _this.totalPages1 = resp.data.data.total
          }
        })
      },
      initFinance2() {
        var _this = this
        this.$axios.post("/economic/page2?page="+this.pages2.pageNum+"&size="+this.pages2.pageSize).then(resp => {
          if (resp && resp.data.code === 200) {
            _this.OutList = resp.data.data.list
            _this.totalPages2 = resp.data.data.total
          }
        })
      },


    refreshing() {
      location.reload()
    },
    handleClick(tab) {
      console.log(tab)
      this.activeName = tab.name;
      if(this.activeName === "first")
        this.initFinance1();
      else this.initFinance2()
    },        
  }
}
</script>
<!-- 添加“scoped”属性以将CSS仅限于此组件 -->
<style scoped>
</style>
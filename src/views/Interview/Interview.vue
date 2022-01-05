<template>
    <div style="text-align:left">
      <br><br>
        <el-button type="primary" style="margin-left:10px;margin-top: -80px;" @click="refreshing">刷新</el-button>
        <el-row>
            <el-col :span="6">
              <p style="text-align: center; font-weight:bold; color: #882929;">未通过简历</p>
                <el-table class="fail" :data="rolesListFail" height=500px style="width: 100%;margin-top:10px;float:center;text-align:center" :header-cell-style="{textAlign: 'center'}" @selection-change="handleSelectionFail">
                    <el-table-column type="selection" width="40%" align="center">
                    </el-table-column>
                    <el-table-column label="姓名" width="100%" align="center">
                        <template slot-scope="scope">
                        {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" width="100%" align="center">
                        <template slot-scope="scope">
                        {{ scope.row.date }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="check(scope.row.id)">简历</el-button>
                        </template>
                    </el-table-column>        
                </el-table>
            </el-col>
            <el-col :span="3" style="margin-top: 20%;margin-left: 30px;">
              <el-row>
                <el-button type="primary" size="small" @click="back">﹤退回</el-button>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-button type="primary" size="small" @click="revocationFail">撤销﹥</el-button>
              </el-row>
            </el-col>
            <el-col :span="6">
              <p style="text-align: center; font-weight:bold; color: #726f6f;margin-left: -140px;">未审核简历</p>
                <el-table :data="rolesListAll" height=500px style="width: 100%;margin-top:10px;margin-left:-70px;float:center;text-align:center" :header-cell-style="{textAlign: 'center'}" @selection-change="handleSelection">
                    <el-table-column type="selection" width="40%">
                    </el-table-column>
                    <el-table-column label="姓名" width="100%" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" width="100%" align="center">
                        <template slot-scope="scope">
                        {{ scope.row.date }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="check(scope.row.id)">简历</el-button>
                        </template>
                    </el-table-column>        
                </el-table>
            </el-col>
            <el-col :span="3" style="margin-top: 20%;margin-right: -50px;margin-left: -20px;">
                <el-row>
                    <el-button type="primary" size="small" @click="pass">通过﹥</el-button>
                </el-row>
                <el-row style="margin-top: 10px;">
                    <el-button type="primary" size="small" @click="revocationPass">﹤撤销</el-button>
                </el-row>
            </el-col>
            <el-col :span="6">
              <p style="text-align: center; font-weight:bold; color: #5e8862" >已通过简历</p>
                <el-table class="pass" :data="rolesListPass" height=500px style="width: 100%;margin-top:10px;float:center;text-align:center" :header-cell-style="{textAlign: 'center'}" @selection-change="handleSelectionPass">
                    <el-table-column type="selection" width="40%">
                    </el-table-column>
                    <el-table-column label="姓名" width="100%" align="center">
                        <template slot-scope="scope">
                        {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" width="100%" align="center">
                        <template slot-scope="scope">
                        {{ scope.row.date }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="check(scope.row.id)">简历</el-button>
                        </template>
                    </el-table-column>        
                </el-table>
            </el-col>

        </el-row>
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
          Selection: [],
          PassSelection: [],
          FailSelection: [],
          role: {
            id: '',
            name: '',
            date: '',
            isPass: '',
          },
          routes: [],
          rolesListAll: [{
            id: '1',
            name: '1',
            date: '1',
            isPass: '1',
          }],
          rolesListPass: [{
            id: '1',
            name: '1',
            date: '1',
            isPass: '1',
          }],
          rolesListFail: [{
            id: '1',
            name: '1',
            date: '1',
            isPass: '1',
          }],
        }
    },
    
      mounted: function() {
        this.initStaff()
      },

      methods: {        
        initStaff() {
          var _this = this
          this.$axios.post("/apply/transformation")
          this.$axios.post("/apply/all?isPass="+0).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.rolesListAll = resp.data.data
            }
          })
          this.$axios.post("/apply/all?isPass="+1).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.rolesListPass = resp.data.data
            }
          })
          this.$axios.post("/apply/all?isPass="+ -1).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.rolesListFail = resp.data.data
            }
          })

        },
        handleSelection(rows){
          this.Selection = [];
            if (rows) {
                rows.forEach(row => {
                    if (row) {
                      this.Selection.push(row.id);
                    }
                });
            }
            console.log(this.Selection);
        },
        handleSelectionFail(rows){
          this.FailSelection = [];
            if (rows) {
                rows.forEach(row => {
                    if (row) {
                      this.FailSelection.push(row.id);
                    }
                });
            }
            console.log(this.FailSelection);
        },
        handleSelectionPass(rows){
          this.PassSelection = [];
            if (rows) {
                rows.forEach(row => {
                    if (row) {
                      this.PassSelection.push(row.id);
                    }
                });
            }
            console.log(this.PassSelection);
        },
        check(id){
          var _this = this
          this.$axios.post("/apply/showPDF?id=" + id ,{}).then(resp => {
            this.$message({
                message: '成功打开pdf',
                type: 'success'
            });
            window.open("http://localhost:8002/apply/showPDF?id="+id);
          })
        },
        back(){
          var _this = this
          for(var i = 0;i < this.Selection.length;i++)
            this.$axios.post("/apply/update?isPass=" + -1 +"&id=" + this.Selection[i]).then(resp => {
              if (resp && resp.data.code === 200) {
                this.$axios.post("/apply/all?isPass="+0).then(resp => {
                  if (resp && resp.data.code === 200) {
                    _this.rolesListAll = resp.data.data
                  }
                })
                this.$axios.post("/apply/all?isPass="+ -1).then(resp => {
                  if (resp && resp.data.code === 200) {
                    _this.rolesListFail = resp.data.data
                  }
                })
              }
            })
            this.$message({
                message: '成功退回',
                type: 'success'
            });

        },
        pass(){
          var _this = this
          for(var i = 0;i < this.Selection.length;i++)
            this.$axios.post("/apply/update?isPass=" + 1 +"&id=" + this.Selection[i]).then(resp => {
              if (resp && resp.data.code === 200) {
                this.$axios.post("/apply/all?isPass="+0).then(resp => {
                  if (resp && resp.data.code === 200) {
                    _this.rolesListAll = resp.data.data
                  }
                })
                this.$axios.post("/apply/all?isPass="+1).then(resp => {
                  if (resp && resp.data.code === 200) {
                    _this.rolesListPass = resp.data.data
                  }
                })
              }
            })
          this.$message({
              message: '成功通过',
              type: 'success'
          });

        },
        revocationFail(){
          var _this = this
          for(var i = 0;i < this.FailSelection.length;i++)
            this.$axios.post("/apply/update?isPass=" + 0 +"&id=" + this.FailSelection[i]).then(resp => {
              if (resp && resp.data.code === 200) {
                this.$axios.post("/apply/all?isPass="+0).then(resp => {
                  if (resp && resp.data.code === 200) {
                    _this.rolesListAll = resp.data.data
                  }
                })
                this.$axios.post("/apply/all?isPass="+ -1).then(resp => {
                  if (resp && resp.data.code === 200) {
                    _this.rolesListFail = resp.data.data
                  }
                })
              }
            })
          this.$message({
            message: '成功撤销退回',
            type: 'success'
          });

        },
        revocationPass(){
          var _this = this
          for(var i = 0;i < this.PassSelection.length;i++)
            this.$axios.post("/apply/update?isPass=" + 0 +"&id=" + this.PassSelection[i]).then(resp => {
              if (resp && resp.data.code === 200) {
                this.$axios.post("/apply/all?isPass="+0).then(resp => {
                  if (resp && resp.data.code === 200) {
                    _this.rolesListAll = resp.data.data
                  }
                })
                this.$axios.post("/apply/all?isPass="+1).then(resp => {
                  if (resp && resp.data.code === 200) {
                    _this.rolesListPass = resp.data.data
                  }
                })
              }
            })
          this.$message({
            message: '成功撤销通过',
            type: 'success'
          });

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
.fail >>> .el-table__body tr:hover>td {
background-color: #f5e4e4;
}
.pass >>> .el-table__body tr:hover>td {
background-color: #e8f5e3;
}
</style>
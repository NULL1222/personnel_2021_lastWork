<template>
    <div style="text-align:left">
      <br><br>
        <el-button type="primary" style="margin-left:10px;" @click="refreshing">刷新</el-button>
        <!-- <el-button type="primary" @click="handleAddRole" style="margin-left:10px;">请假申请</el-button> -->
  <!--dsfdfdg-->
        <!-- 请假记录表 -->
        <el-table :data="rolesList" height=450px style="width: 100%;margin-left:30px;margin-top:30px;float:center;text-align:center" :header-cell-style="{textAlign: 'center'}">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item label="请假详情" style="margin-bottom:-5px ;">
                  <span>{{ scope.row.description }}</span>
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
          <el-table-column label="申请时间" width="150%" align="center">
            <template slot-scope="scope">
              {{ scope.row.time }}
            </template>
          </el-table-column>
  
          <el-table-column label="请假起始时间" width="150%" align="center">
            <template slot-scope="scope">
              {{ scope.row.startdate }}
            </template>
          </el-table-column>
          <el-table-column label="请假结束时间" width="150%" align="center">
            <template slot-scope="scope">
              {{ scope.row.enddate }}
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
          <el-table-column label="操作" width="200%" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status == '未审核'">
                <el-button  type="success" plain style="margin-left:10px;" @click="pass(scope.row)">通过</el-button>
                <el-button  type="warning" plain style="margin-left:10px;" @click="back(scope.row)">驳回</el-button>
              </div>
              <div v-else>
                <el-button type="success" plain disabled style="margin-left:10px;" @click="refreshing" >通过</el-button>
                <el-button type="warning" plain disabled style="margin-left:10px;" @click="refreshing">驳回</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

    <div></div>

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
            pages: {
            pageNum: 1,
            pageSize: 10,
          },
          totalPages: 0,
          loadId: '',
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
            dialogVisible: false,
            rolesList: [{
              description : '出门吃饭去',
              id: '1111111',
              name: '李小李',
              time: '1111年11月11日',
              startdate: '1111年11月11日',
              enddate: '1111年11月11日',
              type: '事假',
              operate: '小李',
              status: '已销假',
              prove:'http://127.0.0.1:8887/absence/1.jpg',
            },{
              description : 'lalalal',
              id: '1111111',
              name: '李李',
              time: '1111年11月11日',
              startdate: '1111年11月11日',
              enddate: '1111年11月11日',
              type: '事假',
              operate: '小李',
              status: '未审核',
              prove:'http://127.0.0.1:8887/absence/1.jpg',
            }],
          }
      },
         mounted: function() {
          this.initCheck()
        },
        created() {
        const Id = sessionStorage.getItem('userId2');
        this.loadId = Id;
      },
         methods: {
           //上传图片并回显
          //页码
           handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pages.pageSize = val
            if(this.click == 'command')
              listen.$emit("status")
            else this.initCheck();
          },
          handleCurrentChange(val) {
            this.currentPage = val
            console.log(`当前页: ${val}`);
            this.pages.pageNum = val
            if(this.click == 'command')
              listen.$emit("status")
            else this.initCheck();
          }, 
          //页面初始化渲染
           initCheck() {
            var _this = this
            this.$axios.post("/absence/permit?page="+this.pages.pageNum+"&size="+this.pages.pageSize+"&id="+this.loadId,{}).then(resp => {
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
            if(command === "全部")
              this.click = 'all'
            else this.click = 'command'
            listen.$on("status",()=>{
              console.log("in command")
              var _this = this
              console.log(command)
              this.$axios.post('/absence/search?status=' + command + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&id=" + this.loadId,{}).then(resp => {
                if(resp && resp.data.code === 200){
                  _this.rolesList = resp.data.data.list
                  _this.totalPages = resp.data.data.total
                }
              })
            })
            this.pages.pageNum = 1
            var _this = this
            console.log(command)
            this.$axios.post('/absence/search?status=' + command + "&page=" + this.pages.pageNum + "&size=" + this.pages.pageSize + "&id=" + this.loadId,{}).then(resp => {
              if(resp && resp.data.code === 200){
                _this.rolesList = resp.data.data.list
                _this.totalPages = resp.data.data.total
              }
            })
          },
  
        // 刷新页面
        refreshing() {
          location.reload()
        },
  
        //修改状态
        pass(row){
          this.$confirm('确定通过此申请吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          })
          .then(async() => {
            var _this = this
            this.$axios.post('/absence/change?id='+row.id+'&keywords='+this.loadId+'&time='+row.time+'&status='+'已通过',{}).then(resp => {
              if(resp && resp.data.code === 200){
                _this.rolesList = resp.data.data.list
                _this.initCheck()

                this.$message({
                type: 'success',
                message: '申请状态修改成功!'
                })
              }
            }) 
          })
            .catch(err => { console.error("状态修改失败，请重试！") })
        },
        back(row){
          this.$confirm('确定驳回此申请吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          })
          .then(async() => {
            var _this = this
            this.$axios.post('/absence/change?id='+row.id+'&keywords='+this.loadId+'&time='+row.time+'&status='+'已驳回',{}).then(resp => {
              if(resp && resp.data.code === 200){
                _this.rolesList = resp.data.data.list
                _this.initCheck()

                this.$message({
                type: 'success',
                message: '申请状态修改成功!'
                })
              }
            }) 
          })
            .catch(err => { console.error("状态修改失败，请重试！") })
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
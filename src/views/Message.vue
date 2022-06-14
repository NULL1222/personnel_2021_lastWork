<template>
  <!-- :row-class-name="tableRowClassName" -->
  <div class="message">
    <div style="text-align: left ">
      <el-button plain type="primary" @click="allRead" style="margin-top: 15px;  margin-left: 8px; margin-bottom: 20px;">一键已读</el-button>
    </div>
    <el-table :data="rolesList" 
    style="width: 100%" 
    @row-click="clickData"
    :row-style="styleRead">
    
    
      <!-- <el-table-column prop="status" :render-header="button" width=130 align=center>
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column> -->
      <el-table-column label="日期" width="180" align=center>
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column label="发件人" width="130" align=center>
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="收件人" width="130" align=center>
        <template slot-scope="scope">
          {{ scope.row.approver }}
        </template>
      </el-table-column>
      <el-table-column label="内容" align=center>
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
        <el-button @click.stop="open(scope.row)" >查看</el-button>
        <el-button @click.stop="markRead(scope.row.id)">已读</el-button>
        <el-button @click.stop="handleDelete(scope.row.id)">删除</el-button>
      </template>
      </el-table-column>
  </el-table>

  <el-dialog title="详情" :visible.sync="dialogVisible" width="50%">
  <el-descriptions class="info">
    <el-descriptions-item label="发件人">{{ role.name }}</el-descriptions-item>
    <el-descriptions-item label="时间">{{ role.time }}</el-descriptions-item>
    <el-descriptions-item label="收件人">{{ role.approver }}</el-descriptions-item>
    <el-descriptions-item label="内容">{{ role.description }}</el-descriptions-item>
  </el-descriptions>
  <!-- <span>这是一段信息</span> -->
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  <!-- <el-backtop target=".page"></el-backtop>  -->
  <!-- 回到顶部（待完成） -->
  <!-- <el-backtop></el-backtop>   -->
</div> 
</template>


<script>
  export default {
    data() {
      return {
        userID:sessionStorage.getItem('userId2'),
        // messageNum: '2',
        dialogVisible: false,
        rolesList:[
          {
            id:'',
            name:'',
            time:'',
            approver:'',
            description:'',
            status:''
            // id: '1111',
            // status:'',
            // addresser:'王小虎',
            // time:'2016-05-02 15:30',
            // approver:'rachelwwww',
            // description:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
            // status:'未读'
          },
        ],
        role:{
          id:'',
          name:'',
          time:'',
          approver:'',
          description:'',
          status:''
        },
        // tableData: [{
        //     date: '2016-05-02',
        //     name: '王小虎',
        //     address: '上海市普陀区金沙江路 1518 弄'
        //   }, 
        // ]

      }
    },
    mounted: function() {
        this.initInfo() //载入数据库所有消息
    },
    methods: {
      initInfo() {
        var _this = this
          this.$axios.post("/message/all?id=" + this.userID, {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.rolesList = resp.data.data;
              console.log("userID=" + this.userID);
              console.log("data="+resp.data.data)
            }
          })
      },
      allRead() { // 一键已读
        this.$axios.post("/message/alreadyall?id=" + this.userID, {});
        location.reload();
      },
      open(row) { 
        // console.log('messageID=' + messageID+1);
        // console.log(" this.roleslist[]"+this.rolesList[messageID+1])
        // 点击按钮查看每一条详情 //查看按钮
        // row.status = '已读';
        // this.role = this.rolesList[messageID+1];
        row.status = '已读';
        // row.backgroundColor = '#dcdfd7';
        var _this = this
          this.$axios.post("/message/showOne?id=" + row.id, {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.role = resp.data.data[0];
              this.dialogVisible = true;
              this.$axios.post("/message/already?id=" + row.id, {})
              this.initInfo();
              // location.reload()
              // this.markRead(row.id);
            }
          })
      },
      markRead(messageID) { // 已读按钮
        // status = '已读'
        console.log("点击已读");
        this.$axios.post("/message/already?id=" + messageID, {})
        location.reload()
      },
      handleDelete(messageID){  //删除按钮
        console.log("点击删除");
        this.$confirm('确定删除此条信息吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async() => {
          console.log("删除在这儿")
          var _this = this
          this.$axios
          //向后端发送数据
          .post('/message/delete?id=' + messageID, {}).then(resp => {
            if (resp && resp.data.code === 200) {
              // location.reload()
              this.initInfo();
              this.$message({
              type: 'success',
              message: '删除成功!'
              })
            }
          }) 
        }).catch(err => { console.error(err) })
      },
      clickData(row) { // 点击一行查看
        // this.dialogVisible = true;
        this.role = this.rolesList[row.id+1];
        row.status = '已读';
        // console.log("点击了这一行");
        // console.log(row.status);
        // console.log(this.role);
        this.$axios.post("/message/already?id=" + row.id, {})
        this.initInfo();
      },
      // button() {
      //   return(
      //     <div>
      //       <el-button on-click= {() => this.allRead()}>一键已读</el-button>
      //     </div>
      //   )
        
      // },
      // allRead(){
      //   console.log("一键已读");
        //修改数据库中所有记录的未读标记flag 

      // },
      // tableRowClassName({row, rowIndex }) {
      //   if (rowIndex === 3) {
      //     return '冫unread-row';
      //   }
      //   return '';
      // },
      styleRead({row, rowIndex}){
        if(row.status === "未读"){
          return { backgroundColor: "#dcdfd7" };
        } else {
          return { backgroundColor: "#ffffff" };
        }
      },
    },
  }
</script>

<style scoped>

  /* .el-table .unread-row {
    background: #dcdfd7;
  }
  .el-table .read-row {
    background: #ac5555;
  } */

</style>

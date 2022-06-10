<template>
  <div class="message">
    <!-- <div class="button">
      <el-button type="primary" @click="clickbutton">主要按钮</el-button>
    </div> -->
    <el-table :data="rolesList" style="width: 100%" :row-class-name="tableRowClassName" @row-click="clickData">
      <el-table-column prop="status" :render-header="button" width=130 align=center>
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column prop="sendTime" label="日期" width="180" align=center>
        <template slot-scope="scope">
          {{ scope.row.sendTime }}
        </template>
      </el-table-column>
      <el-table-column prop="addresser" label="发件人" width="130" align=center>
        <template slot-scope="scope">
          {{ scope.row.addresser }}
        </template>
      </el-table-column>
      <el-table-column prop="recipients" label="收件人" width="130" align=center>
        <template slot-scope="scope">
          {{ scope.row.recipients }}
        </template>
      </el-table-column>
      <el-table-column prop="contents" label="内容" align=center>
        <template slot-scope="scope">
          {{ scope.row.contents }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <el-button @click="dialogVisible = true" >查看</el-button>
        <el-button @click="markRead(scope.row.id)">已读</el-button>
        <el-button @click="handleDelete(scope.row.id)">删除</el-button>
      </el-table-column>
  </el-table>

  <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
  <el-descriptions class="info">
    <el-descriptions-item label="发件人">{{ role.addresser }}</el-descriptions-item>
    <el-descriptions-item label="时间">{{ role.sendTime }}</el-descriptions-item>
    <el-descriptions-item label="收件人">{{ role.recipients }}</el-descriptions-item>
    <el-descriptions-item label="内容">{{ role.contents }}</el-descriptions-item>
  </el-descriptions>
  <!-- <span>这是一段信息</span> -->
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  <!-- <el-backtop target=".page"></el-backtop>  -->
  <!-- 回到顶部（待完成） -->
  </div> 
</template>

<script>
  export default {
    data() {
      return {
        // messageNum: '2',
        dialogVisible: false,
        rolesList:[
          {
            id:'',
            addresser:'',
            sendTime:'',
            recipients:'',
            contents:'',
            id: '1111',
            status:'',
            addresser:'王小虎',
            sendTime:'2016-05-02 15:30',
            recipients:'rachelwwww',
            contents:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
            status:'未读'
          },
          {
            id: '1111',
            addresser:'王小虎',
            sendTime:'2016-05-02 15:30',
            recipients:'rachelwwww',
            contents:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
            status:'未读'
          },
          {
            id: '1111',
            addresser:'王小虎',
            sendTime:'2016-05-02 15:30',
            recipients:'rachelwwww',
            contents:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
            status:'未读'
          },
          {
            id: '1111',
            addresser:'王小虎',
            sendTime:'2016-05-02 15:30',
            recipients:'rachelwwww',
            contents:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
            status:'未读'
          },
          {
            id: '1111',
            addresser:'王小虎',
            sendTime:'2016-05-02 15:30',
            recipients:'rachelwwww',
            contents:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
            status:'未读'
          },
          {
            id: '1111',
            addresser:'王小虎',
            sendTime:'2016-05-02 15:30',
            recipients:'rachelwwww',
            contents:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
            status:'未读'
          },
          {
            id: '1111',
            addresser:'王小虎',
            sendTime:'2016-05-02 15:30',
            recipients:'rachelwwww',
            contents:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
            status:'未读'
          },
          {
            id: '1111',
            addresser:'王小虎',
            sendTime:'2016-05-02 15:30',
            recipients:'rachelwwww',
            contents:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
            status:'未读'
          },
          {
            id: '1111',
            addresser:'王小虎',
            sendTime:'2016-05-02 15:30',
            recipients:'rachelwwww',
            contents:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
            status:'未读'
          },
          {
            id: '1111',
            addresser:'王小虎',
            sendTime:'2016-05-02 15:30',
            recipients:'rachelwwww',
            contents:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
            status:'未读'
          },
          {
            id: '1111',
            addresser:'王小虎',
            sendTime:'2016-05-02 15:30',
            recipients:'rachelwwww',
            contents:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
            status:'未读'
          },
          {
            id: '1111',
            addresser:'王小虎',
            sendTime:'2016-05-02 15:30',
            recipients:'rachelwwww',
            contents:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
            status:'未读'
          },
        ],
        role:{
          id:'',
          addresser:'',
          sendTime:'',
          recipients:'',
          contents:'',
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
        this.initInfo()
    },
    methods: {
      // clickbutton() {
      //   console.log("点击成功")
      // }
      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // }
      initInfo() {
        var _this = this
          // this.$axios.post("="+this.y+"="+, {}).then(resp => {
          //   if (resp && resp.data.code === 200) {
          //     _this.rolesList = resp.data.data
          //     console.log(resp.data.data)
          //   }
          // })
      },
      clickData(row, column) {
        this.dialogVisible = true;
        status = '已读';
      },
      button() {
        return(
          <div>
            <el-button click="allRead">一键已读</el-button>
          </div>
        )
        
      },
      allRead(){
        console.log("一键已读");
      },
      tableRowClassName({row, status}) {
        if ( status === '未读') {
          return 'unread-row';
        } else {
          return 'read-row';
        }
        return '';
      },
      markRead(id) {
        status = '已读'
        var _this = this
        // this.$axios
          //向后端发送数据
          // .post('/staff/detail?id=' + id, {}).then(resp => {
          //   if (resp && resp.data.code === 200) {
          //     _this.role = resp.data.data
          //   }
          // })

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
    },
  }
</script>

<style>
  .el-table .unread-row {
    background: #f7f7ec;
  }
  .el-table .read-row {
    background: #ffffff;
  }

</style>

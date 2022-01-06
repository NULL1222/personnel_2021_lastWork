<template>
  <div  style="text-align:left">
    <br><br>
    <el-button type="primary" style="margin-left:10px;" @click="refreshing">刷新</el-button>
    
    <p style="text-align: center; font-weight:bold; color: #726f6f;font-size: 2rem;">公 告 栏</p>
    <br>
    <el-collapse v-model="activeNames" class="notice" v-for="(item, index) in rolesList" :key="index" :accordion="accordion" accordion:true style="width: 1200px;">
      <el-collapse-item :key="index" :name="index" :disabled="disable">
        <template slot="title">
          <el-col :span="12">
            {{item.title}}
          </el-col>
          <el-col :span="3" :offset="6">
            <i class="header-icon el-icon-user" ></i>&nbsp;{{item.person}}
          </el-col>
          <el-col :span="4" style="color: #9c9a9a;">
            <i class="header-icon el-icon-date" ></i>&nbsp;{{item.date}}  
          </el-col>
        </template>
        <div style="margin-top:10px;">{{ item.notice }}</div>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script>
  const defaultRole = {
    job: '人事管理',
    sex: '男',
  }

  import Cookies from 'js-cookie';
  export default{
      computed:{
        username(){
          return Cookies.get('id');
        }
      },
      data() {
        return {
          activeNames:[0],
          accordion: true,
          role: {
            id:'',
            title: '',
            person: '',
            date: '',
            notice: '',
          },
          routes: [],
          rolesList: [{
            title: '1',
            person: '2',
            date: '3',
            notice: '4',
          },
          {
            title: '1',
            person: '2',
            date: '3444-44-44 44:44:44',
            notice: '4',
          }],
        }
    },
    
    mounted: function() {
      this.initNotice()
    },

    methods: {        
      initNotice() {
        var _this = this
        this.$axios.post("/notice/all").then(resp => {
          if (resp && resp.data.code === 200) {
            _this.rolesList = resp.data.data
          }
        })
      },
      refreshing() {
        location.reload()
      },       

    }
  }
</script>
<style scoped>
  .notice >>> .el-collapse-item__header {
    margin-left: 20px;
    font-size: 15px;
  }
  .notice >>> .el-collapse-item__content{
    margin-left: 25px;
    font-size: 10px;
  }
  .notice {
    margin-left: calc((100vw - 1450px) / 2);
  }
  </style>

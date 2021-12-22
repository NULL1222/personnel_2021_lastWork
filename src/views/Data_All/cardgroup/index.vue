<template>
  <el-row :gutter="40" class="panel-group">
    
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
        <i class="el-icon-user-solid"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户人数
          </div>
          <count-to :start-val="0" :end-val=userNum :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
        <i class="el-icon-s-custom"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            员工人数
          </div>
          <count-to :start-val="0" :end-val=managerNum :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <i class="el-icon-s-shop"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日售票数
          </div>
          <count-to :start-val="0" :end-val=ticketNum :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
           <i class="el-icon-s-data"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            访问次数
          </div>
          <count-to :start-val="0" :end-val=hitsNum :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data(){
      return {
        managerNum:' ',
        hitsNum:'',
        userNum:'',
        ticketNum:''
      }
     
  },
  mounted:function(){
      this.numOfManager(),
      this.numOfHits(),
      this.numOfUser(),
      this.numOfTicket()
  },
  methods: {
        numOfTicket() {
        var _this = this
          this.$axios
            //向后端发送数据
            .post('/train/numOfTickets' ,{}).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.ticketNum = resp.data.data
              }
            })
      },
  numOfManager() {
        var _this = this
          this.$axios
            //向后端发送数据
            .post('/manager/numOfManager' ,{}).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.managerNum = resp.data.data
              }
            })
      },
numOfHits() {
             var _this = this
          this.$axios
            //向后端发送数据
            .post('/analysis/numOfHits' ,{}).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.hitsNum= resp.data.data
              }
            })
      },
numOfUser() {
        var _this = this
          this.$axios
            //向后端发送数据
            .post('/user/numOfUser' ,{}).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.userNum = resp.data.data
              }
            })
      },
  }
}
</script>

<style>

 .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
 }

     
      .card-panel-icon-wrapper:hover {
        color: #fff;
      }

      .icon-people:hover {
        background: #34bfa3
      }

      .icon-message:hover {
        background: #36a3f7;
      }

      .icon-money:hover{
        background: #f4516c;
      }

      .icon-shopping:hover {
        background: #34bfa3
      }
    

 .card-panel-col {
    margin-bottom: 8px;
  }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      width:80px;
      height:80px;
      font-size:40px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

.card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
      
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      
    }

.panel-group {
  margin-top: 8px;
  }

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}


</style>

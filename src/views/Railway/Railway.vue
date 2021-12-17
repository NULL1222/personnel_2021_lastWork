<template>
  <div class="train">
    <el-form label-position="labelPosition" label-width="115px" :model="formInline" class="demo-form-inline">
      <div class="form-left">
        <el-row>
          <el-col :span="4">
            <el-form-item label="车次" label-width="50px">
              <el-input v-model="formInline.id" placeholder="G8888" prefix-icon="el-icon-search"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出发地" label-width="70px">
              <el-input v-model="formInline.depStation" placeholder="上海" prefix-icon="el-icon-search" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="目的地" label-width="70px">
              <el-input v-model="formInline.desStation" placeholder="宁波" prefix-icon="el-icon-search" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" label-width="20px">
              <el-radio-group v-model="train">
                <el-radio label="G高铁"></el-radio>
                <el-radio label="D动车"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="header-button">
            <el-button type="primary" @click="resetForm" class="resetButton">重置</el-button>
            <el-button type="primary" @click="refreshing">刷新</el-button>
          </el-col>
        </el-row>
        <!-- <div style="width: 100%;"></div> -->
        <el-row>
          <el-col :span="11">
            <el-form-item label="选择日期、时间">
              <el-col :span="9">
                <el-date-picker 
                  type="date" 
                  placeholder="起始日期" 
                  v-model="formInline.startDay" 
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  >
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="9">
                <el-time-picker 
                  placeholder="选择时间" 
                  v-model="formInline.earliestTime" 
                  style="width: 100%;"
                  format="HH:mm"
                  value-format="HH:mm">
                </el-time-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label-width="10px">
              <el-col :span="9">
                <el-date-picker type="date" 
                placeholder="结束日期" 
                v-model="formInline.endDay" 
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="9">
                <el-time-picker 
                  placeholder="选择时间" 
                  v-model="formInline.latestTime" 
                  style="width: 100%;"
                  format="HH:mm"
                  value-format="HH:mm">
                </el-time-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="header-button">
            <el-button type="primary" icon="el-icon-search" style="width: 150px;" @click="searchResult">查询</el-button>
          </el-col>
      </el-row>

      </div>
      <!-- <div class="form-right"> -->
        
        <!-- <search-bar @onSearch="searchResult" ref="formInline" ></search-bar> -->
      <!-- </div> -->
    </el-form>
    <el-table
    :data="rolesList"
    height = "450"
    stripe
    :header-cell-style="{background: 'lightblue', color: '#fff'}"
    style="width: 95%; margin-top: 10px;margin-left: 30px;">
    <el-table-column
      label="日期"
      fixed
      width="100"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.date }}
      </template>
    </el-table-column>
    <el-table-column
      fixed
      label="车次"
      width="100"
      align="center">
      <!-- <template slot="header">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link" @click="test">
            车次<i class="el-icon-arrow-down el-icon--right el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
                <el-radio-group v-model="radio">
                  <el-dropdown-item command="全部">全部</el-dropdown-item>
                  <el-dropdown-item command="G高铁">G高铁</el-dropdown-item>
                  <el-dropdown-item command="D动车">D动车</el-dropdown-item>
                </el-radio-group>
          </el-dropdown-menu>
        </el-dropdown>
      </template> -->
      <template slot-scope="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column
      label="出发站"
      width="80"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.depStation }}
      </template>
    </el-table-column>
    <el-table-column
      label="到达站"
      width="80"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.desStation }}
      </template>
    </el-table-column>
    <el-table-column
      label="出发时间"
      width="100"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.depTime }}
      </template>
    </el-table-column>
    <el-table-column
      label="到达时间"
      width="100"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.desTime }}
      </template>
    </el-table-column>
    <el-table-column
      label="历时"
      width="150"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.lastTime }}
      </template>
    </el-table-column>
    <el-table-column
      label="一等座"
      width="100"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.firstClass }}
      </template>
    </el-table-column>
    <el-table-column
      label="价格一"
      width="100"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.firstPrice }} 元
      </template>
    </el-table-column>
    <el-table-column
      label="二等座"
      width="100"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.secondClass }}
      </template>
    </el-table-column>
    <el-table-column
      label="价格二"
      width="100"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.secondPrice }} 元
      </template>
    </el-table-column>
    <el-table-column
      label="无座"
      width="100"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.noSeats }}
      </template>
    </el-table-column>
    <el-table-column
      label="价格三"
      width="100"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.thirdPrice }} 元
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100"
      align="center">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row.id)" type="text" size="small">设置</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
// import SearchBar from '../SearchBar'

  export default {
    data() {
      return {
        radio: '',
        rolesList: [
          {
          date: '12.1',
          id: 'G4535',
          depStation: '上海',
          desStation: '宁波',
          depTime: '7:00',
          desTime: '8:30',
          lastTime: '1小时30分',
          firstClass: '23',
          firstPrice: '100',
          secondClass: '55',
          secondPrice: '80',
          noSeats: '售空',
          thirdPrice: "50"
        }, 
        {
          date: '12.1',
          id: 'D553',
          depStation: '杭州',
          desStation: '北京',
          depTime: '7:00',
          desTime: '13:30',
          lastTime: '6小时30分',
          firstClass: '66',
          firstPrice: '100元',
          secondClass: '189',
          secondPrice: '80元',
          noSeats: '45',
          thirdPrice: "50元"
        },
        {
          date: '12.1',
          id: 'D553',
          depStation: '杭州',
          desStation: '北京',
          depTime: '7:00',
          desTime: '13:30',
          lastTime: '6小时30分',
          firstClass: '66',
          firstPrice: '100元',
          secondClass: '189',
          secondPrice: '80元',
          noSeats: '45',
          thirdPrice: "50元"
        },
        {
          date: '12.1',
          id: 'D553',
          depStation: '杭州',
          desStation: '北京',
          depTime: '7:00',
          desTime: '13:30',
          lastTime: '6小时30分',
          firstClass: '66',
          firstPrice: '100元',
          secondClass: '189',
          secondPrice: '80元',
          noSeats: '45',
          thirdPrice: "50元"
        },
        {
          date: '12.1',
          id: 'D553',
          depStation: '杭州',
          desStation: '北京',
          depTime: '7:00',
          desTime: '13:30',
          lastTime: '6小时30分',
          firstClass: '66',
          firstPrice: '100元',
          secondClass: '189',
          secondPrice: '80元',
          noSeats: '45',
          thirdPrice: "50元"
        },
        {
          date: '12.1',
          id: 'D553',
          depStation: '杭州',
          desStation: '北京',
          depTime: '7:00',
          desTime: '13:30',
          lastTime: '6小时30分',
          firstClass: '66',
          firstPrice: '100元',
          secondClass: '189',
          secondPrice: '80元',
          noSeats: '45',
          thirdPrice: "50元"
        },
        {
          date: '12.1',
          id: 'D553',
          depStation: '杭州',
          desStation: '北京',
          depTime: '7:00',
          desTime: '13:30',
          lastTime: '6小时30分',
          firstClass: '66',
          firstPrice: '100元',
          secondClass: '189',
          secondPrice: '80元',
          noSeats: '45',
          thirdPrice: "50元"
        },
        {
          date: '12.1',
          id: 'D553',
          depStation: '杭州',
          desStation: '北京',
          depTime: '7:00',
          desTime: '13:30',
          lastTime: '6小时30分',
          firstClass: '66',
          firstPrice: '100元',
          secondClass: '189',
          secondPrice: '80元',
          noSeats: '45',
          thirdPrice: "50元"
        },
        {
          date: '12.1',
          id: 'D553',
          depStation: '杭州',
          desStation: '北京',
          depTime: '7:00',
          desTime: '13:30',
          lastTime: '6小时30分',
          firstClass: '66',
          firstPrice: '100元',
          secondClass: '189',
          secondPrice: '80元',
          noSeats: '45',
          thirdPrice: "50元"
        },
        // {
        //   date: '12.1',
        //   id: 'D553',
        //   depStation: '杭州',
        //   desStation: '北京',
        //   depTime: '7:00',
        //   desTime: '13:30',
        //   lastTime: '6小时30分',
        //   firstClass: '66',
        //   firstPrice: '100元',
        //   secondClass: '189',
        //   secondPrice: '80元',
        //   noSeats: '45',
        //   thirdPrice: "50元"
        // },
        ],
        formInline: {
          id: '',
          depStation: '',
          desStation: '',
          startDay: '',
          endDay: '',
          earliestTime: '',
          latestTime: ''
        },
        labelPosition: 'right',
        // pickerOptions0: {
        //   disabledDate(time) {
        //     return time.getTime() < Date.now() - 8.64e7;
        //   }
        // } 
        train: null
      }
    },
    created() {
      this.setTime()
    },
    mounted: function() {
        this.initUser()
      },
    methods: {
      test() {
        console.log('111111')
      },
      setTime(){
        const nowD = new Date()
        nowD.setTime(nowD.getTime())
        this.formInline.startDay = nowD
        this.formInline.endDay = nowD
        this.formInline.earliestTime = nowD
        this.formInline.latestTime = nowD
        this.formInline.startDay = nowD.getFullYear() + '-' + (nowD.getMonth() + 1) + '-' + nowD.getDate();
        this.formInline.endDay = nowD.getFullYear() + '-' + (nowD.getMonth() + 1) + '-' + nowD.getDate();
        this.formInline.earliestTime = nowD.getHours() + ':' + nowD.getMinutes();
        this.formInline.latestTime = nowD.getHours() + ':' + nowD.getMinutes();
        console.log(this.formInline.startDay)
        console.log(this.formInline.earliestTime)
       },
      initUser() {
        var _this = this
          this.$axios.post("/train/initial?startDay="+this.formInline.startDay+"&endDay="+this.formInline.endDay, {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.rolesList = resp.data.data
            }
          })
      },
      handleClick(id) {
        console.log(id);
      },
      searchResult() {
        console.log("searchResult");
        var _this = this
          this.$axios
            //向后端发送数据
            .post('/train/search?id=' + this.formInline.id 
            + "&startDay=" + this.formInline.startDay 
            + "&endDay=" + this.formInline.endDay 
            + "&depStation=" + this.formInline.depStation
            + "&desStation=" + this.formInline.desStation 
            + "&earliestTime=" + this.formInline.earliestTime
            + "&latestTime=" + this.formInline.latestTime ,{}).then(resp => {
              if (resp && resp.data.code === 200) {
                _this.rolesList = resp.data.data
              }
            })
      },
      refreshing() {
        location.reload()
      },
      resetForm() {
        this.formInline.id = "",
        this.formInline.depStation = "",
        this.formInline.desStation = "",
        this.$options.methods.setTime.bind(this)()
      },
    },
  }
</script>

<style scoped>

.demo-form-inline {
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start; 
  flex-wrap: wrap;
  flex-direction: row;
}

.header-button {
  display: flex;
  justify-content: flex-end;
}

/* .form-left {
  flex: 1;
  flex-direction: row;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start; 
  flex-wrap: wrap;
} */

/* .form-right {
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
} */
.el-dropdown {
    display: inline-block;
    position: relative;
    color: white;
    font-size: 14px;
}
.form-right button {
  margin-left: 0;
  margin-bottom: 20px;
}
.resetButton {

}
</style>
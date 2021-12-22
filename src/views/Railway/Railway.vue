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
              <el-radio-group v-model="formInline.train">
                <el-radio label="G高铁" @click.native.prevent = 'handleCancel("G")'></el-radio>
                <el-radio label="D动车" @click.native.prevent = 'handleCancel("D")'></el-radio>
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
    </el-form>
    <el-table
    :data="rolesList"
    height = "430"
    stripe
    :header-cell-style="{background: 'lightblue', color: '#fff'}"
    style="width: 95%; margin-top: 10px;margin-left: 30px;"
    @sort-change='sortChange'>
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
      align="center"
      sortable="custom"
      prop="depTime">
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
        <el-button @click="openDrawer(scope.row.id, scope.row.date)" type="text" size="small">详情</el-button>
        <el-drawer
          title="车次信息"
          :visible.sync="drawer"
          :direction="direction"
          append-to-body class="drawer-title">
          <el-descriptions class="margin-top" :labelStyle="{'font-size': '16px','font-weight': 'bold', }" :column="2" style="margin-left:40px">
            <el-descriptions-item label="日期" >{{ role.date }}</el-descriptions-item>
            <el-descriptions-item label="车次">{{ role.id}}</el-descriptions-item>
            <el-descriptions-item label="出发站">{{ role.depStation }}</el-descriptions-item>
            <el-descriptions-item label="到达站">{{role.desStation }}</el-descriptions-item>
            <el-descriptions-item label="出发时间">{{ role.depTime }}</el-descriptions-item>
            <el-descriptions-item label="到达时间">{{ role.desTime }}</el-descriptions-item>
            <el-descriptions-item label="历时">{{ role.lastTime }}</el-descriptions-item>
            <el-descriptions-item label="停站时间">{{ role.dwellTime }}</el-descriptions-item>

          </el-descriptions>
          <el-table :data="gridData" class="table-gridData" style="margin-left: 30px;">
            <el-table-column label="一等座" width=100 align="center">
              <el-table-column label="余票" property="firstClass" width=65 align="center" ></el-table-column>
              <el-table-column property="firstPrice" label="票价" width=65 align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="二等座" width=100 align="center">
              <el-table-column label="余票" property="secondClass" width=65 align="center"></el-table-column>
              <el-table-column property="secondPrice" label="票价" width=65 align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="无座" width=100 align="center">
              <el-table-column label="余票" property="noSeats" width=65 align="center"></el-table-column>
              <el-table-column property="thirdPrice" label="票价" width=65 align="center"></el-table-column>
            </el-table-column>
          </el-table>
          <br>
          <span class="title-middle">车身信息</span>
          <el-descriptions class="margin-top" :labelStyle="{'font-size': '16px','font-weight': 'bold', }" :column="1" style="margin-left:40px" :colon='false'>
            <el-descriptions-item label="">
              <img :src="trainImg" class="photo-train"/>
            </el-descriptions-item>
            <el-descriptions-item label="车型：">{{ role.train}}</el-descriptions-item>
            <el-descriptions-item label="时速：">{{ role.speed}}</el-descriptions-item>
            <el-descriptions-item label="列车编组：">{{ role.group}}</el-descriptions-item>
            <el-descriptions-item label="制造商：">{{ role.producer}}</el-descriptions-item>
            <el-descriptions-item label="制造时间：">{{ role.makeDate}}</el-descriptions-item>
          </el-descriptions>
          
        </el-drawer>
        <!-- <addDialog ref="aaa" :dialogForm="dialogForm"></addDialog> -->
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
// import addDialog from './addDialog'

  export default {
    data() {
      return {
        order: '',
        trainImg: require("../../assets/train.png"),
        // dialogForm: {
        //   show: false
        // },
        // dialogVisible: false,
        direction: 'rtl',
        drawer: false,
        radio: '',
        gridData: [{
          date: '',
          id: '',
          depStation: '',
          desStation: '',
          depTime: '',
          desTime: '',
          lastTime: '',
          dwellTime: '',
          firstClass: '',
          firstPrice: '',
          secondClass: '',
          secondPrice: '',
          noSeats: '',
          thirdPrice: '',
          train: '',
          speed: '',
          group: '',
          producer: '',
          makeDate: '',
        }],
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
          }
        ], 
        formInline: {
          id: '',
          depStation: '',
          desStation: '',
          startDay: '',
          endDay: '',
          earliestTime: '',
          latestTime: '',
          train: ''
        },
        labelPosition: 'right',
        role: {
          date: '',
          id: '',
          depStation: '',
          desStation: '',
          depTime: '',
          desTime: '',
          lastTime: '',
          dwellTime: '',
          firstClass: '',
          firstPrice: '',
          secondClass: '',
          secondPrice: '',
          noSeats: '',
          thirdPrice: '',
          train: '',
          speed: '',
          group: '',
          producer: '',
          makeDate: '',
        },
      }
    },
    created() {
      this.setTime()
    },
    mounted: function() {
      this.initUser()
    },
    methods: {
      sortChange: function(column) {
        // console.log(column + '-' + column.prop + '-' + column.order)
        var _this = this
          // console.log(this.order)
            if(column.order === "descending")
              this.order = "tr.depTime DESC"
            else if(column.order === "ascending")
              this.order = "tr.depTime ASC"
            else
              this.order = null
            // console.log(this.order)
            this.$axios.post('/train/search?sort=' + this.order
            + "&id=" + this.formInline.id 
            + "&startDay=" + this.formInline.startDay 
            + "&endDay=" + this.formInline.endDay 
            + "&depStation=" + this.formInline.depStation
            + "&desStation=" + this.formInline.desStation 
            + "&earliestTime=" + this.formInline.earliestTime
            + "&latestTime=" + this.formInline.latestTime
            + "&type=" + this.formInline.train ,{}).then(resp => {
                if(resp && resp.data.code === 200){
                  _this.rolesList = resp.data.data
                }
          })
      },
      handleCancel(e) {
        e === this.formInline.train ? this.formInline.train = '' : this.formInline.train = e
      },
      setTime(){
        const nowD = new Date()
        nowD.setTime(nowD.getTime())
        // this.formInline.startDay = nowD
        // this.formInline.endDay = nowD
        // this.formInline.earliestTime = nowD
        // this.formInline.latestTime = nowD
        this.formInline.startDay = nowD.getFullYear() + '-' + (nowD.getMonth() + 1) + '-' + nowD.getDate();
        this.formInline.endDay = nowD.getFullYear() + '-' + (nowD.getMonth() + 1) + '-' + nowD.getDate();
        // this.formInline.earliestTime = nowD.getHours() + ':' + nowD.getMinutes();
        // this.formInline.latestTime = nowD.getHours() + ':' + nowD.getMinutes();
       },
      initUser() {
        var _this = this
          this.$axios.post("/train/initial?startDay="+this.formInline.startDay+"&endDay="+this.formInline.endDay, {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.rolesList = resp.data.data
              console.log(resp.data.data)
            }
          })
      },
      openDrawer(id, date) {
        console.log(id);
        this.drawer = true
        var _this = this
        this.$axios
          //向后端发送数据
          .post('/train/detail?id=' + id + "&date="+ date , {}).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.role = resp.data.data[0]
              _this.gridData = resp.data.data
            }
          })
        // this.dialogVisible = true
        // this.dialogForm.show = true
        // this.$ref.aaa.bool = true
      },
      searchResult() {
        console.log("searchResult");
        var _this = this
        console.log(this.order);
          this.$axios
            //向后端发送数据
            .post('/train/search?id=' + this.formInline.id 
            + "&startDay=" + this.formInline.startDay 
            + "&endDay=" + this.formInline.endDay 
            + "&depStation=" + this.formInline.depStation
            + "&desStation=" + this.formInline.desStation 
            + "&earliestTime=" + this.formInline.earliestTime
            + "&latestTime=" + this.formInline.latestTime
            + "&type=" + this.formInline.train 
            + "&sort=" + this.order,{}).then(resp => {
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
        this.$options.methods.initUser.bind(this)()
        this.formInline.train = ""
        this.formInline.earliestTime = "",
        this.formInline.latestTime = ""
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
.drawer-title {
  font-size: 18px;
  font-weight: bold;
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
.photo-train {
  width: 380px;
  height: 110px;
}
.title-middle {
  color: rgb(114, 118, 123);
  margin-left: 20px;
}
</style>
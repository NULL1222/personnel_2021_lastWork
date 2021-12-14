<template>
  <div>
    <!-- <div class="head"> -->
    <el-form :model="formInline" class="demo-form-inline">
      <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline"> -->
      <el-form-item label="车次">
        <el-input v-model="formInline.id" placeholder="G8888" prefix-icon="el-icon-search" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label="出发地">
        <el-input v-model="formInline.depStation" placeholder="上海" prefix-icon="el-icon-search" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label="目的地">
        <el-input v-model="formInline.desStation" placeholder="宁波" prefix-icon="el-icon-search" style="width: 100px;"></el-input>
      </el-form-item>
      <!-- <div class="headTime"> -->
      <el-form-item label="出发日">
        <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 80%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="起始时间">
        <el-time-picker
          v-model="formInline.value1"
          placeholder="选择时间"
          value-format="HH:mm"
          format="HH:mm">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="返程日">
        <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date2" style="width: 80%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-time-picker
          v-model="formInline.value2"
          placeholder="任意时间点"
          value-format="HH:mm"
          format="HH:mm">
        </el-time-picker>
      </el-form-item>
      <!-- </div> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  <!-- </div> -->
    <el-table
    :data="rolesList"
    stripe
    :header-cell-style="{background: 'lightblue', color: '#fff'}"
    style="width: 90%; margin-top: 30px;margin-left: 30px;">
    <el-table-column
      fixed
      label="车次"
      width="120"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column
      label="出发站"
      width="70"
      align="center">
      <template slot-scope="scope">
        {{ scope.row.depStation }}
      </template>
    </el-table-column>
    <el-table-column
      label="到达站"
      width="70"
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
        {{ scope.row.firstPrice }}
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
        {{ scope.row.secondPrice }}
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
        {{ scope.row.thirdPrice }}
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
  export default {
    data() {
      return {
        rolesList: [{
          id: 'G4535',
          depStation: '上海',
          desStation: '宁波',
          depTime: '7:00',
          desTime: '8:30',
          lastTime: '1小时30分',
          firstClass: '23',
          firstPrice: '100元',
          secondClass: '55',
          secondPrice: '80元',
          noSeats: '售空',
          thirdPrice: "50元"
        }, 
        {
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
        ],
        formInline: {
          id: '',
          depStation: '',
          desStation: '',
          date1: '',
          date2: '',
          value1: new Date(),
          value2: new Date()
        } 
      }
    },
    methods: {
      handleClick(id) {
        console.log(id);
      },
      onSubmit() {
        console.log('submit!');
      }
    },
  }
</script>

<style scoped>

.head {
  margin-top: 30px;
  display: flex;
  justify-content: left;
  align-items: center; 
}

.headTime {
  display: flex;
  justify-content: left;
  /* align-items: left;  */
}

/* .demo-form-inline {
  display: flex;
  justify-content: center;
  align-items: center; 
} */

</style>
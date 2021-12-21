<template>
  <div>
    <!-- <el-calendar>
       这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
        </p>
      </template>
    </el-calendar> -->
    <el-calendar>
      <template slot="dateCell" slot-scope="{ data }">
        <p>{{ data.day.split("-").slice(2).join("-") }}<br/></p>
        <div v-for="(item, index) in calendarData" :key="index">
          <!-- <div v-for="(day, index) in list" :key="index"></div> -->
          <!-- <div>
              {{item.status}}
          </div> -->
          <!-- <div v-if="data.day == item.day"> -->
            {{item.status}}
          <!-- </div> -->
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      calendarData: [
        { 
        day: '',
        status:'',
        list: []
        },
        // { day: "2021-12-19",status:"unpass", },
      ],
    }
  },
  created() {
    const myData = sessionStorage.getItem('userId2');
    this.id = myData;
  },
  mounted: function() {
    this.initCalendar()
  },
  methods: {
    initCalendar() {   
      var _this = this
      var _count = null
      this.$axios.post("/checking/count?id=" + _this.id, {}).then(resp => {
          if (resp && resp.data.code === 200) {
            _count = resp.data.data
          }
        })

      this.$axios.post("/checking/all?id="+ _this.id, {}).then(resp => {
        if (resp && resp.data.code === 200) {
          for( var i = 0; i < _count; i++) {
            _this.calendarData[0].list[i] = resp.data.data[i].date
            
            console.log("list[" + i +"] = " + _this.calendarData[0].list[i]);
            
            if( data.day === _this.calendarData[0].list[i]) {
              _this.calendarData[0].status = "pass";
            }
          }
        }
      })
    },
  },
}


</script>


<style>
  .is-selected {
    color: #1989FA;
  }
</style>
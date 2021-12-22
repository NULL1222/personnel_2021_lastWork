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
        <p>{{ data.day.split("-").slice(1).join("-") }}<br/>
        <br><br></p>
          <p>{{ (data.day == today) ? '✔️' : ''}}</p>
        <div v-for="(item, index) in calendarData" :key="index">
          <div v-if="data.day == item.day[0]">
            {{item.status}}
          </div>
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
      // _count: '',
      calendarData: [ ],
      today: new Date()
    }
  },
  created() {
    var _this = this;
    const myData = sessionStorage.getItem('userId2');
    this.id = myData;
    this.$nextTick(() => {
      let preBtn = document.querySelector('tbody');
      preBtn.addEventListener('click', () => {
        let currDate = document.querySelector('.is-today');
        let currSelected = document.querySelector('.is-selected');
        if (currDate.isSameNode(currSelected)) {
          let dd = String(this.today.getDate()).padStart(2, '0');
          let mm = String(this.today.getMonth() + 1).padStart(2, '0');
          let yyyy = this.today.getFullYear();
          if (currDate.textContent == `${yyyy}-${mm}-${dd}`) {
            this.today = `${yyyy}-${mm}-${dd}`;
          }

          // this.today = `${yyyy}-${mm}-${dd}`;

          // this.$axios.post("/save/count?id=" + _this.id, { /*currFullDate */}).then(resp => {
          //   if (resp && resp.data.code === 200) {
          //   _count = resp.data.data;
          //   }
          //   console.log("count" + _count);
          // });

          this.$axios.post("/checking/attendance?id=" + _this.id
          +"&date=" + this.today, {}).then(resp => {
            if (resp && resp.data.code === 200) {
              const h = this.$createElement;
              this.$notify({
              title: 'Notification',
              message: h('i', { style: 'color: teal'}, '今日打卡成功！')
              });
            } 
          })
        }
      })
    })
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
           _count = resp.data.data;
          }
          console.log("count" + _count);
        })

      console.log("_count = " + _count)
      this.$axios.post("/checking/all?id="+ _this.id, {}).then(resp => {
        if (resp && resp.data.code === 200) {
          console.log(_count);
          for( var i = 0; i < _count; i++) {
            _this.calendarData.push({day: [], status: '✔️'});
            _this.calendarData[i].day[0]= resp.data.data[i].date;
            // console.log("calendarDar[" + i "]: " + _this.calendarData[i].day);
            // console.log("calendarDar[0]= " + _this.calendarData[0].day[i]);
            
            // console.log("list[" + i +"] = " + _this.calendarData[0].list[i]); 
            // if( data.day === _this.calendarData[0].list[i]) {
            //   _this.calendarData[0].status = "pass";
            // }
            // console.log("_this.canlendarData[0].status = " + _this.calendarData[0].status);
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


  /* .el-calendar-table {

    &:not(.is-range){
      td.next{
          pointer-events: none;
      }
      td.prev{
          pointer-events: none;
      }
      }
      /* //td{
      //    pointer-events: none;
      //} */
.el-calendar-table:not(.is-range) td.next, .el-calendar-table:not(.is-range) td.prev{
pointer-events: none;
}


</style>
<template>
  <div>
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
        if (currDate && currSelected && currDate.isSameNode(currSelected)) {
          this.today = new Date();
          let dd = String(this.today.getDate()).padStart(2, '0');
          let mm = String(this.today.getMonth() + 1).padStart(2, '0');
          let yyyy = this.today.getFullYear();
          // console.log("yyyymmdd=" + yyyy + mm + dd);
          this.today = `${yyyy}-${mm}-${dd}`
          if (!currDate.textContent.includes( `✔️`)) {
            this.$axios.post("/checking/attendance?id=" + _this.id +"&date=" + this.today, {}).then(resp => {
              if (resp && resp.data.code === 200) {
                this.today = `${yyyy}-${mm}-${dd}`;
                const h = this.$createElement;
                this.$notify({
                title: 'Success',
                message: h('i', { style: 'color: teal'}, '今日打卡成功！'),
                type: 'success'
                });
              } 
            }).catch(err => console.log("Error: ", err))
          } else {
            // 已经打过卡了
            this.today = `${yyyy}-${mm}-${dd}`;
            const h = this.$createElement;
            this.$notify({
              title: 'Warning',
              message: h('i', { style: 'color: black'}, '今日已打卡, 请勿重复打卡!'),
              type: 'warning'
            });
          }
        }
      })
    })
  },
  mounted: function() {
    this.initCalendar();
  },
  methods: {
    initCalendar() {   
      var _this = this;
      var _count = null;
      this.$axios.all([
        this.$axios.post("/checking/count?id=" + _this.id, {}),
        this.$axios.post("/checking/all?id="+ _this.id, {})
      ]).then(
        this.$axios.spread((resp1, resp2) => {
          if (resp1.data && resp1.data.code === 200) {
            _count = resp1.data.data;
          }
          if (resp2.data && resp2.data.code === 200) {
            for( var i = 0; i < _count; i++) {
              _this.calendarData.push({day: [], status: '✔️'});
              _this.calendarData[i].day[0]= resp2.data.data[i].date;            
            }
          }
        })
      ).catch(err => console.log("Error: ", err))
    },
  },
}
</script>
<style>
  .is-selected {
    color: #1989FA;
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
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
      <template slot="dateCell" slot-scope="{ date, data }">
        <p>{{ data.day.split("-").slice(1).join("-") }}<br/>
        <br></p>
          <!-- <p>{{ data.isSelected ? '✔️' : ''}}</p> -->
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
      calendarData: [
        // { 
        // day: [],
        // status:'pass',
        // },
        // { day: "2021-12-19",status:"unpass", },
      ],
    }
  },
  created() {
    const myData = sessionStorage.getItem('userId2');
    this.id = myData;

    //span 是蓝色字体，需要改成灰色
   $('.is-today ').parent().prevAll().find('span').css('color', '#b4b4bb')
    $('.is-today ').parent().prevAll().css('pointer-events', 'none')
    $('.is-today ').prevAll().css('pointer-events', 'none')
    $('.is-today ').prevAll().find('span').css('color', '#b4b4bb')

      // 点击前一个月
      this.$nextTick(() => {
      let prevBtn = document.querySelector(
        '.el-calendar__button-group .el-button-group>button:nth-child(1)');
      prevBtn.addEventListener('click', () => {
        // count =0 说明是本月    count 在 data中定义
        this.count--
        this.getMonthInfo(this.count) //获取本月的排班信息
        // 判断 是否月份是上个月还是下个月    
        // count < 0 说明是上个月
        // count >0 说明是下个月
        if (this.count < 0) {
          // 如果是上个月  那就全都不可选  文字变灰
          console.log(this.count);
          $('.current').css('pointer-events', 'none')
          $('.current').find('span').css('color', '#b4b4bb')
        } else if (this.count > 0) {
          // 如果是上个月  那就全都可选  文字变蓝
          $('.current').css('pointer-events', 'auto')
          $('.current').find('span').css('color', '#1c9bf7')
        } else if (this.count == 0) {
          // 如果是 等于七月  那么刷新页面  
          // 毕竟多次操纵dom节点  最开始的月份已经被该乱
          // 这里我直接刷新页面解决初始月份被该乱的问题  简单粗暴
          // 如果有大佬有更简单的办法更好
          location.reload();
        }
      })
    })
    // 点击后一个月
    this.$nextTick(() => {
      let prevBtn = document.querySelector(
        '.el-calendar__button-group .el-button-group>button:last-child');
      prevBtn.addEventListener('click', () => {
        this.count++
        this.getMonthInfo(this.count) //获取本月的排班信息
        // 判断 是否月份是上个月还是下个月    
        // count < 0 说明是上个月
        // count >0 说明是下个月
        if (this.count < 0) {
          // 如果是上个月  那就全都不可选  文字变灰
          console.log(this.count);
          $('.current').css('pointer-events', 'none')
          $('.current').find('span').css('color', '#b4b4bb')
        } else if (this.count > 0) {
          // 如果是上个月  那就全都可选  文字变蓝
          $('.current').css('pointer-events', 'auto')
          $('.current').find('span').css('color', '#1c9bf7')
        } else if (this.count == 0) {
          // 如果是 等于七月  那么刷新页面  
          // 毕竟多次操纵dom节点  最开始的月份已经被该乱
          // 这里我直接刷新页面解决初始月份被该乱的问题  简单粗暴
          // 如果有大佬有更简单的办法更好
          location.reload();
        }
      })
    })
  // 点击今天  刷新页面  回到本日
    this.$nextTick(() => {
      let prevBtn = document.querySelector(
        '.el-calendar__button-group .el-button-group>button:nth-child(2)');
      prevBtn.addEventListener('click', () => {
         location.reload();
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
            _this.calendarData.push({day: [], status: 'pass'});
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
/* // 使不是本月的日期不可点击，不会跳转到其他月份 */
/deep/ .el-calendar-table {
  &:not(.is-range) {
    td.next {
      pointer-events: none;
    }
    td.prev {
      pointer-events: none;
    }
  }
}



</style>
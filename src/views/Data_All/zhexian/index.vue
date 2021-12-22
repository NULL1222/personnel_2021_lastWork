<template>
<div class="bk">
    <div id="zhexian" style="width: 50%;height: 235px;margin-top:10px;display:inline-block;float:left" />
    <zhutu class="zhutu" style="width:50%;height:270px;margin-top:10px;display:inline-block;float:left"></zhutu>
</div>
</template>

<script>
import zhutu from '../zhutu/index'
import Vue from 'vue'

export default {
    data() {
        return {
        msg:"折线图",
        dshouru:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90],
        dzhichu:[220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290],
        dyingli:[150, 232, 201, 154, 190, 330, 410,150, 232, 201, 154, 190],
        };
    },
    components: {
        zhutu
    },
    mounted:function() {
    this.drawLine();
    },
    created(){
    var _this = this;
     var length = 12;
    this.$axios.post("/economic/income").then((response) => {
      if (response.data.code == 200) {
        _this.dshouru.length = 0; //清空数组
        for (let i = 0; i <12 ; i++) {
          _this.dshouru.push(response.data.data[i].incomeSum);
        }
      }
    });
    this.$axios.post("/economic/output").then((response) => {
      if (response.data.code == 200) {
        _this.dzhichu.length = 0; //清空数组
        for (let i = 0; i <12 ; i++) {
          _this.dzhichu.push(response.data.data[i].outputSum);
        }
      }
    });
    this.$axios.post("/economic/profit").then((response) => {
      if (response.data.code == 200) {
        _this.dyingli.length = 0; //清空数组
        for (let i = 0; i <12 ; i++) {
          _this.dyingli.push(response.data.data[i].profitSum);
        }
      }
    });
    },
  watch: {
    dshouru: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {
        this.drawLine();
      },
      deep: true,
    },
    dzhichu: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {
        this.drawLine();
      },
      deep: true,
    },
    dyingli: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {
        this.drawLine();
      },
      deep: true,
    },
  },
  methods:{
  drawLine(){
          //基于准备好的dom，初始化echarts实例
    var echarts = require('echarts')
    // 初始化echarts实例
    var myChart = echarts.init(document.getElementById('zhexian'))
    
    let options = {
        title: {
        x:'center',
        text: '公司收支',
        textStyle:{
            fontSize:25
        }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    //   orient: 'vertical',
     left: 2,
    // top: 'center',
    data: ['收入', '支出', '盈利']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '收入',
      type: 'line',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: this.dshouru,
    },
    {
      name: '支出',
      type: 'line',
      areaStyle: {},
      emphasis: {
        focus: 'series'
    },
      data: this.dzhichu,
    },
    {
      name: '盈利',
      type: 'line',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data:this.dyingli,
    }
    ]
        };
        myChart.setOption(options);
      },
  },
};
</script>
<style>
.bk{
    height: 260px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
}

</style>
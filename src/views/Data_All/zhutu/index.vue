<template>
<div class="kuang" style="margin-top:30px:margin-bottom:30px;">
    <div id="main" style="width:100%;height: 270px;margin-top:10px;" />
</div>
</template>

<script>
import Vue from 'vue'
 
export default {
data() {
     return {
      // 定义图表，各种参数
      msg: "柱状图",
      datay:  [ 218251, 181988, 132464, 93745, 84432, 71238,123750, 181988, 101234, 103283, 103093, 172280],
    };
},
mounted:function() {
        this.drawLine();
},
created(){
    var length = 0;
        this.$axios.post("/analysis/num").then((response) => {
      if (response.data.code == 200) {
        length = response.data.data; //清空数组
      }
    });
    this.$axios.post("/analysis/hits").then((response) => {
      if (response.data.code == 200) {
        this.datay.length = 0; //清空数组
        for (let i = 0; i < length; i++) {
          this.datay.push(response.data.data[i]);
        }
      }
    });
},
  watch: {
    datay: {
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
    var myChart = echarts.init(document.getElementById('main'))
    //构造图表数据
    let options = {
        title: {
        x:'center',
        text: '用户点击量',
        textStyle:{
            fontSize:25
        }
    },
    tooltip: {},
    legend: {
    left: 2,
        data: ['每月用户点击量']
    },
    xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月'],
        
    },
    yAxis: {},

    series: [{
        name: '每月用户点击量',
        type: 'bar',
        data:this.datay,
    }]
    };
    myChart.setOption(options);
},
},
    

};
</script>
<style>

</style>
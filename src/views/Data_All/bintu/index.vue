<template>
  <div>
    <div class="pie">
        <div id="pie1">
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <div id="main1" style="float:left;width:33%;height: 270px;display: inline-block;"></div>
        </div>
        <div id="pie2">
            <div id="main2" style="float:left;width:34%;height: 270px;display: inline-block"></div>
        </div>
        <div id="pie2">
            <div id="main3" style="float:left;width:33%;height: 270px;;display: inline-block;"></div>
        </div>
    </div>
  </div>
</template>
 
<script>// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
 
export default {
  created(){
  },
  mounted(){
    this.initData();
  },
  methods:{
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main1'));
      var yourChart = echarts.init(document.getElementById('main2'));
      var herChart = echarts.init(document.getElementById('main3'));
      // 绘制图表
      myChart.setOption({
          title : {
              text: '公司花销分布',//主标题
              x:'center',//x轴方向对齐方式
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              bottom: 'bottom',
              data: ['工资支出','卖票收入','水电费']
          },
          series : [
              {
                  name: '支出:',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:335, name:'工资支出'},
                      {value:310, name:'卖票收入'},
                      {value:234, name:'水电费'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      });

      yourChart.setOption({
          title : {
              text: '公司花销分布',//主标题
              x:'center',//x轴方向对齐方式
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              bottom: 'bottom',
              data: ['工资支出','卖票收入','水电费']
          },
          series : [
              {
                  name: '支出:',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:335, name:'工资支出'},
                      {value:310, name:'卖票收入'},
                      {value:234, name:'水电费'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      });
      
      herChart.setOption({
          title : {
              text: '公司花销分布',//主标题
              x:'center',//x轴方向对齐方式
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              bottom: 'bottom',
              data: ['工资支出','卖票收入','水电费']
          },
          series : [
              {
                  name: '支出:',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:335, name:'工资支出'},
                      {value:310, name:'卖票收入'},
                      {value:234, name:'水电费'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      });
    },
  }
}
</script>
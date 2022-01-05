<template>
  <div>
    <div class="pie" style="margin-top=15px">
        <div id="pie1" class="kk">
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <div id="main1" style="float:left;width:33%;height: 220px;display: inline-block;"></div>
        </div>
        <div id="pie2" class="kk">
            <div id="main2" style="float:left;width:34%;height: 220px;display: inline-block"></div>
        </div>
        <div id="pie2" class="kk">
            <div id="main3" style="float:left;width:33%;height: 220px;;display: inline-block;"></div>
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
    data(){
        return{
             mdg:"饼图",
             nnbdatay:[
            
                  ],
            hxdatay:[
    
            ],
        };
    },
    mounted:function(){
    this.drawLine();
  },
   created(){
      var _this = this;
      var length=2;
            var llength=3;
      this.$axios.post("/staff/scale").then((response) => {
        if (response.data.code == 200) {
                _this.nnbdatay.length = 0; //清空数组
        for (let i = 0; i <2; i++) {
          _this.nnbdatay.push(response.data.data[i]);
        }
        
        }
        });
      this.$axios.post("/economic/scale").then((response) => {
        if (response.data.code == 200) {
                _this.hxdatay.llength = 0; //清空数组
        for (let i = 0; i <3; i++) {
          _this.hxdatay.push(response.data.data[i]);
        }
        
        }
        });
    },

    watch: {
    nnbdatay: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {
        this.drawLine();
      },
      deep: true,
    },
    hxdatay: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {
        this.drawLine();
      },
      deep: true,
    },
  },

  methods:{
    //初始化数据
    drawLine() {
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
          series : [
              {
                  name: '支出:',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:this.hxdatay,
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
              text: '员工男女比',//主标题
              x:'center',//x轴方向对齐方式
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series : [
              {
                  name: '占比:',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:this.nnbdatay,
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
              text: '员工年龄分布',//主标题
              x:'center',//x轴方向对齐方式
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series : [
              {
                  name: '年龄占比:',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:32, name:'18~30岁'},
                      {value:159, name:'30~40岁'},
                      {value:29, name:'40~50岁'},
                      {value:13, name:'50岁及以上'}
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
<style>
.pie{
    height: 220px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
}
</style>
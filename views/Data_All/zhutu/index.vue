<template>
<div>
    <div id="main" style="width: 100%;height: 270px;" />
</div>
</template>

<script>
export default {
data() {
    return {}
},
mounted() {
    var echarts = require('echarts')
    // 初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // 配置参数
    var option = {
    title: {
        x:'center',
        text: '用户点击量',
        textStyle:{
            fontSize:25
        }
    },
    tooltip: {},
    legend: {
    orient: 'vertical',
    right: 10,
    top: 'center',
        data: ['每月用户点击量']
    },
    xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月'],
        
    },
    yAxis: {},
    series: [{
        name: '每月用户点击量',
        type: 'bar',
        data: [ 218251, 181988, 132464, 93745, 84432, 71238,123750, 181988, 101234, 103283, 103093, 172280],
    }]
    }
    myChart.setOption(option)
}
}
</script>

<template>
    <div>
       <div class="echarts" id="echarts"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "Echarts",
        mounted() {
            this.first()
        },
        methods:{
            first(){
                let myChart =document.getElementById('echarts');
                let option = {
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                };
                myChart.setOption(option);
                window.addEventListener("resize", function() {
                    myChart.resize();
                });
            }
        }
    }
</script>

<style scoped>
    .echarts{
        height: 300px;
        width: 300px;
    }
</style>
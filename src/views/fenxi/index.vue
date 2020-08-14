<template>
  <div>
    <h2>智能销售分析</h2>
    <div id="chart_example">

    </div>
  </div>

</template>
<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        xData: [],
        yData: [],
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$store.dispatch('index/fenxi').then(res => {
          if (res.code == 0) {
            res.data.forEach(item => {
              this.xData.push(item.createTime)
              this.yData.push(item.orderPrice)
            })
            let this_ = this;
            let myChart = echarts.init(document.getElementById('chart_example'));
            let option = {
              color: ['#55aaff'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              xAxis: [{
                type: 'category',
                data: this_.xData,
                axisTick: {
                  alignWithLabel: true
                }
              }],
              yAxis: [{
                type: 'value'
              }],
              series: [{
                name: '销售额',
                type: 'bar',
                barWidth: '60%',
                data: this_.yData
              }]
            };
            myChart.setOption(option);
            window.addEventListener('resize', function() {
              myChart.resize()
            });
          } else {
            this.$message.warning(res.msg)
          }
        }).catch(err => {
          this.$message.error(res.msg)
          console.log(err)
        })
      }
    },
    watch: {},
    created() {

    }
  }
</script>


<style scoped>
  h2 {
    text-align: center;
    padding: 30px;
    font-size: 18px;
  }

  #chart_example {
    width: 50%;
    height: 500px;
    border: 1px solid white;
    margin: 0 auto;
  }
</style>

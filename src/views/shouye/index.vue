<template>
  <div class="block">
    <el-calendar v-model="value" />
    <el-timeline>
      <el-timeline-item v-for="(data, i) in XiaoXiLieBiao" :key="i" :timestamp="data.createTime.split('T')[0] + ' ' + data.createTime.split('T')[1]" placement="top">
        <el-card>
          <h4>{{data.title}}</h4>
          <p>{{data.description}}</p>
        </el-card>
      </el-timeline-item>
      <!-- <el-timeline-item timestamp="2020/4/12" placement="top">
        <el-card>
          <h4>新订单</h4>
          <p>阿里 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <h4>新的订单</h4>
          <p>小兰兰 提交于 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>超级新的订单</h4>
          <p>小紫 提交于 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item> -->
    </el-timeline>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: new Date(),
        XiaoXiLieBiao: [],
      }
    },
    mounted() {
      this.HuoQuXiaoXiLieBiao()
    },
    methods: {
      HuoQuXiaoXiLieBiao() {
        this.$store.dispatch('index/getMessage').then(res => {
          this.XiaoXiLieBiao = res.data;
        }).catch(err => {
          console.log('err is ===', err)
        })
      }
    }
  }
</script>

<style>
</style>

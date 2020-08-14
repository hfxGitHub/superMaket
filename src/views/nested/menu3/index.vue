<template>
  <div align="right">
    <br />
    <el-button type="success" icon="el-icon-share" @click="daoChuDingDan"></el-button>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column align="center" label="商品图片" width="95">
        <template slot-scope="scope">
          <img :src="baseURL + scope.row.commodityInfo.imgUrl" style="width: 100%;" />
        </template>
      </el-table-column>
      <el-table-column label="商品名称">
        <template slot-scope="scope">
              <span v-if="String(scope.row.commodityInfo.title).length <6">
                    {{String(scope.row.commodityInfo.title)}}
                  </span>
          <span v-else>
                    {{ String(scope.row.commodityInfo.title).substr(0,5)+"..." }}
                  </span>
        </template>
      </el-table-column>
      <el-table-column label="商品单价" show-overflow-tooltip>
        <template slot-scope="scope">{{ "￥"+scope.row.price }}</template>
      </el-table-column>
      <el-table-column label="购买数量" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.amount }}</template>
      </el-table-column>
      <el-table-column label="订单总价" show-overflow-tooltip>
        <template slot-scope="scope">{{ "￥"+scope.row.priceTotal }}</template>
      </el-table-column>
      <el-table-column label="收货人姓名">
        <template slot-scope="scope">{{ scope.row.orderInfo.name }}</template>
      </el-table-column>
      <el-table-column label="联系电话">
        <template slot-scope="scope">{{ scope.row.orderInfo.phone }}</template>
      </el-table-column>
      <el-table-column  label="收货地址">
        <template slot-scope="scope">{{ scope.row.orderInfo.address }}</template>
      </el-table-column>
      <el-table-column label="日期">
        <template slot-scope="scope">{{ String(scope.row.createTime).substr(0,10) }}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>
<script src="bundle.js"></script>
<script>
  import {Message} from "element-ui"
  export default {
    data() {
      return {
        tableData: [],
        total:1,
        pageSize:8,
        current:1,
        multipleSelection: [],
        excelData:[],
        baseURL: this.$baseURL,
      }
    },
    mounted(){
      this.huoQuDianPuDingDanLieBiao()
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      huoQuDianPuDingDanLieBiao(){
        const sendData={
          size:this.pageSize,
          current:this.current
        }
        this.$store.dispatch("dingdan/huoQuDianPuDingDanLieBiao",sendData).then(res=>{
          if(res.code===0){
            this.tableData=res.data.records
            this.total=res.data.total
          }
          else{
            Message({
              type:"error",
              message:"数据请求失败",
              duration:1000
            })
          }
        }).catch(err=>{
          Message({
            type:"error",
            message:"数据请求失败",
            duration:1000
          })
        })
      },
      handleCurrentChange(val){
        this.current=val;
        this.huoQuDianPuDingDanLieBiao();
      },
      daoChuDingDan(){
        if(this.multipleSelection.length<=0){
          Message({
            type:"error",
            message:"请选择需要导出的订单",
            duration:1000
          })
          return
        }
        this.$confirm('确定将订单导出为excel吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.excelData = this.multipleSelection;
          this.shengChengExcel();
        }).catch(() => {

        });
      },
      // 数据写入excel
      shengChengExcel () {
        var that = this;
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/excel/export2Excel'); // 这里必须使用绝对路径，使用@/+存放export2Excel的路径
          const tHeader = ['商品名称', '商品单价', '购买数量','订单总价','收货人姓名','联系电话','收货地址','日期']; // 导出的表头名信息
          const list = that.excelData;
          let data=[]
          list.forEach((item,index) => {
            let tbody = []
            //订单总的信息
            tbody.push(item.commodityInfo.title)
            tbody.push(item.price)
            tbody.push(item.amount)
            tbody.push(item.priceTotal)
            tbody.push(item.orderInfo.name)
            tbody.push(item.orderInfo.phone)
            tbody.push(item.orderInfo.address)
            tbody.push(item.createTime)
            data.push(tbody)
          })
          export_json_to_excel(tHeader, data, '店铺订单信息表');
        });
      }
    }
  }
</script>

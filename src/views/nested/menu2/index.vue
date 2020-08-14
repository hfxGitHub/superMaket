<template>
  <div align="right">
    <br />
    <el-button type="success" icon="el-icon-share" @click="daoChuDingDan"></el-button>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.orderDetails" style="width: calc(100%)" class="two-list">
            <el-table-column label="商品名称">
              <template slot-scope="scope">
              <span v-if="String(scope.row.commodityInfo.title).length <7">
                    {{String(scope.row.commodityInfo.title)}}
                  </span>
                <span v-else>
                    {{ String(scope.row.commodityInfo.title).substr(0,7)+"..." }}
                  </span>
              </template>
            </el-table-column>
            <el-table-column label="商品分类">
              <template slot-scope="scope">{{ scope.row.commodityInfo.classify.title }}</template>
            </el-table-column>
            <el-table-column label="商品单价">
              <template slot-scope="scope">{{ "￥"+scope.row.price }}</template>
            </el-table-column>
            <el-table-column prop="amount" label="购买数量"></el-table-column>
            <el-table-column label="商品总价">
              <template slot-scope="scope">{{ "￥"+scope.row.priceTotal }}</template>
            </el-table-column>
            <el-table-column label="商家昵称">
              <template slot-scope="scope">{{ scope.row.businessInfo.nickname }}</template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ String(scope.row.create_time).substr(0,10) }}</template>
      </el-table-column>
      <el-table-column prop="name" label="收货人姓名" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" width="120">
      </el-table-column>
      <el-table-column prop="address" label="收货地址" width="120">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column prop="address" label="订单总价" show-overflow-tooltip>
        <template slot-scope="scope">{{ "￥"+scope.row.orderPrice }}</template>
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
        excelData:[]
      }
    },
    mounted(){
      this.huoQuDingDanLieBiao()
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
      huoQuDingDanLieBiao(){
        const sendData={
          size:this.pageSize,
          current:this.current
        }
        this.$store.dispatch("dingdan/huoQuDingDanLieBiao",sendData).then(res=>{
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
        this.huoQuDingDanLieBiao();
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
          const tHeader = ['收货人姓名', '收货地址', '手机号','订单总价','创建时间']; // 导出的表头名信息
          const filterVal = ['name', 'address', 'phone','orderPrice','create_time']; // 导出的表头字段名，需要导出表格字段名
          const xiangQingHeader=['','商品名称','商品分类','商品单价','购买数量','商品总价','商家昵称']
          const list = that.excelData;
          let data=[]
          list.forEach((item,index) => {
            let tbody = []
            //订单总的信息
            for(let i=0;i<filterVal.length;i++){
              tbody.push(item[filterVal[i]])
            }
            data.push(tbody)
            data.push('')
            data.push(xiangQingHeader)
            //订单详情信息
            item.orderDetails.forEach((detail) => {
              let tc = ['']
              tc.push(detail['commodityInfo']['title'])
              tc.push(detail['commodityInfo']['classify']['title'])
              tc.push(detail['price'])
              tc.push(detail['amount'])
              tc.push(detail['priceTotal'])
              tc.push(detail['businessInfo']['nickname'])
              data.push(tc)
            })
            data.push('')
          })
          export_json_to_excel(tHeader, data, '订单信息表');
        });
      }
    }
  }
</script>

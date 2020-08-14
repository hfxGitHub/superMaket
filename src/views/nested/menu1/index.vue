<template>
  <div align="right">
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

<script>
  import {Message} from "element-ui"
  export default {
    data() {
      return {
        tableData: [],
        total:1,
        pageSize:8,
        current:1,
        multipleSelection: []
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
      }
    }
  }
</script>

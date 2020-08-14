<template>
  <div style="margin-top: 20px">
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column align="center" label="商品图片" width="95">
        <template slot-scope="scope">
          <img :src="baseURL + scope.row.commodityInfo.imgUrl" style="width: 100%;" />
        </template>
      </el-table-column>
      <el-table-column label="商品名称" >
        <template slot-scope="scope">{{ scope.row.commodityInfo.title }}</template>
      </el-table-column>
      <el-table-column  label="购买数量" >
        <template slot-scope="scope">{{ scope.row.amount }}</template>
      </el-table-column>
      <el-table-column label="商品单价" >
        <template slot-scope="scope">{{ "￥"+scope.row.commodityInfo.price }}</template>
      </el-table-column>
      <el-table-column label="商品总价" >
        <template slot-scope="scope">{{ "￥"+scope.row.price }}</template>
      </el-table-column>
      <el-table-column label="创建时间" >
        <template slot-scope="scope">{{ String(scope.row.createTime).substr(0,10) }}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    <br />

    合计:￥<span style="color: #c43fc7;">{{this.heji}}</span>
    <!--<el-button type="primary" icon="el-icon-check">合计</el-button>-->

    <br />
    <div class="anniu" align="center">
      <el-button type="success" @click="shengChengDingDan">立即购买</el-button>
      <el-button type="danger" @click="yiChuGouWuChe">移出购物车</el-button>
    </div>

    <!--sss-->
    <el-dialog title="填写订单信息"  :visible.sync="dialogFormVisible" class="demo-ruleForm">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="收货人姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="shengChengDingDan2('form')">确定购买</el-button>
      </div>
    </el-dialog>
    <!--sss-->
  </div>

</template>

<script>
  import {Message} from "element-ui"
  export default {
    data() {
      var jianYanPhone = (rule, value, callback) => {
        console.log(value)
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      return {
        tableData: [],
        baseURL: this.$baseURL,
        heji:0,
        dialogFormVisible:false,
        cartData:[],
        form: {
          name: '',
          address: '',
          total:1,
          pageSize:8,
          current:1,
          phone:'',
          idList:[]
        },
        rules:{
          phone: [
            {validator: jianYanPhone, trigger: 'blur'}
          ],
          name: [
            { required: true, message: '请输入收货人姓名', trigger: 'blur' },
            {  max: 100, message: '长度应小于 100 个字符', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入收货地址', trigger: 'blur' },
            {  max: 100, message: '长度应小于 100 个字符', trigger: 'blur' }
          ]
        },
        total:1,
        pageSize:2,
        current:1,
        formLabelWidth: '120px',
        multipleSelection: []
      }
    },
    mounted(){
      this.huoQuGouWuCheList()
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
        this.heji=0
        val.forEach(item=>{
          this.heji+=item.price
        })

      },
      handleCurrentChange(val){
        this.current=val;
        this.huoQuGouWuCheList();
      },
      huoQuGouWuCheList(){
        const sendData={
          size:this.pageSize,
          current:this.current
        }
        this.$store.dispatch("gouwuche/huoQuGouWuCheList",sendData).then(res=>{
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
      yiChuGouWuChe(){
        if(this.multipleSelection.length<=0){
          Message({
            type:"error",
            message:"选择需要移出购物车的商品信息",
            duration:1000
          })
          return
        }
        this.$confirm('确定将该条商品移出购物车吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.cartData=[]
          this.multipleSelection.forEach((item)=>{
            this.cartData.push(item.cartId)
          })
          this.yiChuGouWuChe2();
        }).catch(() => {

        });
      },
      yiChuGouWuChe2(){
        this.cartData.forEach(item=>{
          this.$store.dispatch("gouwuche/yiChuGouWuChe",{cartId:item}).then(res=>{
            if(res.code===0) this.huoQuGouWuCheList()
            else{
              Message({
                type:"error",
                message:res.msg,
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
        })
      },
      shengChengDingDan(){
        if(this.multipleSelection.length<=0){
          Message({
            type:"error",
            message:"选择需要购买的商品信息",
            duration:1000
          })
          return
        }
        this.form.idList=[]
        this.multipleSelection.forEach(item=>{
          this.form.idList.push(item.cartId)
        })
        this.dialogFormVisible=true
      },
      shengChengDingDan2(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch("gouwuche/shengChengDingDan",JSON.stringify(this.form)).then(res=>{
              if(res.code===0){
                Message({
                  type:"success",
                  message:"购买成功",
                  duration:1000
                })
                this.dialogFormVisible=false
                this.huoQuGouWuCheList();
              }
              else{
                Message({
                  type:"error",
                  message:res.msg,
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      }
    }
</script>

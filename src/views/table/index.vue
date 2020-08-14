<template>
  <div class="app-container">
    <div align="right">
      <el-button type="primary" plain @click="tianjia()" v-if="userType == 1">添加商品</el-button>
    </div>
    <br />
    <el-table v-loading="listLoading" :data="list" element-loading-text="~加载中~" border fit highlight-current-row>
      <el-table-column align="center" label="商品序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品图片" width="95">
        <template slot-scope="scope">
          <img :src="baseURL + scope.row.imgUrl" style="width: 100%;" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品数量" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="商品售价" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag type="success">在售</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime.split('T')[0] + ' ' + scope.row.createTime.split('T')[1] }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="userType == 1" label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="success" size="mini" @click="bianji(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="delShop(row)">
            删除
          </el-button>
        </template>
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
  import {
    getList
  } from '@/api/table'
  import {
    getUserType,
    getUserID
  } from '@/utils/auth'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          0: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        userType: getUserType(),
        baseURL: this.$baseURL,
        list: null,
        total:1,
        pageSize:5,
        current:1,
        listLoading: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 编辑商品
      bianji(row) {
        sessionStorage.setItem('editShop', row.commodityId)
        this.$router.push('/example/form')
      },
      // 删除商品
      delShop(row) {
        this.$confirm('确定删除该商品吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('table/ShanChuShangPin', {
            commodityId: row.commodityId
          }).then(res => {
            if (res.code == 0) {
              this.$message.success(res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        }).catch(() => {})
      },
      handleCurrentChange(val){
        this.current=val;
        this.fetchData();
      },
      tianjia() {
        this.$router.push('/example/add')
      },
      fetchData() {
        this.$store.dispatch('table/getList', {
          userId: getUserID(),
          size:this.pageSize,
          current:this.current
        }).then(res => {
          this.list = res.data.records;
          this.total=res.data.total
          this.listLoading = false;
        }).catch(err => {
          this.listLoading = false;
          console.log(err);
        })
      }
    },
  }
</script>

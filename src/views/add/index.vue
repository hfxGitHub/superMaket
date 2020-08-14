<template>
  <div class="ad">
    <br />
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="title" style="width:500px">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="请选择商品图片" prop="Img">
        <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-change="XuanZeTuPian" :limit="1">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="img" slot-scope="{img}">
            <img class="el-upload-list__item-thumbnail" :src="img.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-delete" @click="handleRemove">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>

      <br />

      <el-form-item label="商品价格" prop="price" style="width:500px">
        <el-input v-model="ruleForm.price" type="number"></el-input>
      </el-form-item>

      <el-form-item label="商品数量" prop="amount" style="width:500px">
        <el-input v-model="ruleForm.amount" type="number"></el-input>
      </el-form-item>

      <el-form-item label="商品分类" prop="region">
        <el-select v-model="ruleForm.classId" placeholder="请选择商品分类">
          <el-option-group v-for="group in ruleForm.region" :key="group.classId" :label="group.title">
            <el-option v-for="item in group.child" :key="item.classId" :label="item.title" :value="item.classId">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      </el-form-item>

      <el-form-item label="是否推荐" prop="recommend">
        <el-switch v-model="ruleForm.recommend"></el-switch>
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <el-input placeholder="请输入商品描述" type="textarea" v-model="ruleForm.description" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">确认添加</el-button>
        <el-button @click="resetForm('ruleForm')">恢复默认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios'
  import {
    getToken,
  } from '@/utils/auth'
  export default {

    data() {
      return {
        ruleForm: {
          title: '',
          region: [],
          price: '',
          amount: '',
          classId: '',
          recommend: 0,
          description: ''
        },
        img: {},
        dialogImageUrl: '',
        dialogVisible: false,
        loading: false,
        disabled: false,
        rules: {
          title: [{
            required: true,
            message: '请输入商品名称！！！',
            trigger: 'blur'
          }],
          price: [{
            required: true,
            message: '请输入商品价格！！！',
            trigger: 'blur'
          }],
          amount: [{
            required: true,
            message: '请输入商品数量！！！',
            trigger: 'blur'
          }],
          region: [{
            required: true,
            message: '请选择商品分类！！！',
            trigger: 'change'
          }],
          description: [{
            required: true,
            message: '请填写商品描述！！',
            trigger: 'blur'
          }]
        }
      };
    },
    mounted() {
      this.HuoQuLieBiao()
    },
    methods: {
      // 获取分类信息便于选择
      HuoQuLieBiao() {
        this.$store.dispatch('table/getClassify').then(res => {
          this.ruleForm.region = res.data;
        }).catch(err => {
          this.$message.warning(err.data.msg)
          console.log(err)
        })
      },
      // 选择图片时
      XuanZeTuPian(file) {
        this.img = file.raw;
        console.log(this.img)
      },

      // 上传商品
      submitForm(formName) {
        if (this.img == {}) {
          return;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            let fileFormData = new FormData();
            fileFormData.append('img', this.img, this.img.name)
            let requestConfig = {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': getToken()
              }
            }
            let str = '?'
            for (let key in this.ruleForm) {
              if (key != 'region' && key != 'recommend') {
                str = str + key + '=' + this.ruleForm[key] + '&'
              }
              if (key == 'recommend') {
                let recommend = this.ruleForm[key] == true ? '1' : '0';
                str = str + key + '=' + recommend + '&'
              }
            }
            axios.post(this.$baseURL + '/commodity/add' + str, fileFormData, requestConfig).then(res => {
              if (res.data.code == 0) {
                this.loading = false;
                this.$message.success(res.data.msg)
                this.resetForm()
              } else {
                this.loading = false;
                this.$message.warning(res.data.msg)
              }
            }).catch(err => {
              this.loading = false;
              this.$message.warning(err.data.msg)
              console.log(err)
            })
          } else {
            this.loading = false;
            this.$message.warning('请输入完整的正确参数！')
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.loading = false;
        this.img = {}
      },
      handleRemove() {
        this.img = {}
      },
    }
  }
</script>

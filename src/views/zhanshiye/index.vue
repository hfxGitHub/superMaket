<template>
  <div class="container" align="center">
    <el-container>
      <el-header>
        <div class="fen" align="right">

          <el-input placeholder="请输入搜索内容" v-model="contents" style="width: 10rem;" clearable>
          </el-input>
          <el-button type="primary" @click="souSuo()">搜索</el-button>
          <el-dropdown size="small" split-button type="primary">
            商品分类
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, i) in classify" :key="i">
                <span style="width: 100%;display: block" @click="xuanZeClassify(item.id)">{{item.title}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>


      <el-main>
        <div class="block" style="background-color: #99a9bf;">
          <el-carousel height="28rem">
            <el-carousel-item v-for="(item, index) in LunBoTu" :key="index">
              <img :src="item.imgUrl" class="lunbotu">
            </el-carousel-item>
          </el-carousel>
        </div>

        <!--sss-->
        <el-row>
          <el-col :span="8" v-for="(item, index) in shangpinInfo" :key="index" :offset="2" v-infinite-scroll="load"
            style="overflow:auto;cursor: pointer;">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img :src="baseURL + item.imgUrl" class="image" @click="previewShop(item)">
              <div style="padding: 14px;">
                <span class="biaoti" @click="previewShop(item)">{{item.title}}</span>
                <p class="miaoshu">{{String(item.description).length>15? String(item.description).substr(0,15)+"..." :String(item.description)}}</p>
                <!-- <p class="miaoshu" @click="previewShop(item)">{{item.description}}</p> -->
                <p class="miaoshu" @click="previewShop(item)"><span style="color: #a41c10;">￥ {{item.price}}</span></p>
                <p class="miaoshu" @click="previewShop(item)" style="color: #000;">商家:<span style="color: #a41c10;">{{item.userInfo.nickname}}</span></p>
                <p class="miaoshu" @click="previewShop(item)" style="color: #000;">分类:<span style="color: #a41c10;">{{item.classify.title}}</span></p>

                <div class="bottom clearfix">

                  <time class="time" @click="previewShop(item)">发布时间：{{ String(item.createTime).substr(0,10) }}</time>
                  <el-button type="text" class="button" @click="jiaRuGouWuChe(item.commodityId)">加入购物车</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- foot区域 -->
        <div class="footMenu">
          <ul>
            <li>
              <h3>帮助中心</h3>
            </li>
            <li>
              <h3>服务支持</h3>
            </li>
            <li>
              <h3>线下门店</h3>
            </li>
            <li>
              <h3>关于超级小商城</h3>
            </li>
            <li>
              <h3>关注我们</h3>
            </li>
            <li>
              <h3>特色服务</h3>
            </li>
          </ul>
          <ul>
            <li>账户管理</li>
            <li>售后政策</li>
            <li>商城之家</li>
            <li>了解超级小商城</li>
            <li>新浪微博</li>
            <li>送货上门</li>
          </ul>
          <ul>
            <li>购物指南</li>
            <li>自助服务</li>
            <li>服务网点</li>
            <li>加入超级小商城</li>
            <li>官方微信</li>
            <li>免费领取</li>
          </ul>
          <ul>
            <li>订单操作</li>
            <li>相关下载</li>
            <li>授权体验店</li>
            <li>投资者关系</li>
            <li>联系我们</li>
            <li>防伪查询</li>
          </ul>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li>企业社会责任</li>
            <li>公益社会基金</li>
            <li></li>
          </ul>
        </div>


        <!-- foot区域 -->

        <!--sss-->
        <el-dialog title="选择购买数量" :visible.sync="dialogFormVisible" class="demo-ruleForm">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="购买数量" :label-width="formLabelWidth" prop="amount">
              <el-input type="number" v-model="form.amount" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="jiaRuGouWuChe2('form')">确认加入</el-button>
          </div>
        </el-dialog>

        <!-- 商品详情窗口 -->
        <el-dialog title="商品详情" :visible.sync="dialogFormVisible1" class="demo-ruleForm">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img :src="baseURL + previewInfo.imgUrl" class="image">
            <div style="padding: 14px;">
              <span class="biaoti">{{previewInfo.title}}</span>
              <p class="miaoshu">{{previewInfo.description}}</p>
              <p class="miaoshu"><span style="color: #a41c10;">￥ {{previewInfo.price}}</span></p>
              <p class="miaoshu" style="color: #000;">商家:<span style="color: #a41c10;">{{previewInfo.userInfo.nickname}}</span></p>
              <p class="miaoshu" style="color: #000;">分类:<span style="color: #a41c10;">{{previewInfo.classify.title}}</span></p>

              <div class="bottom clearfix">
                <time class="time">发布时间：{{ String(previewInfo.createTime).substr(0,10) }}</time>
              </div>
            </div>
          </el-card>
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="购买数量" :label-width="formLabelWidth" prop="amount">
              <el-input type="number" v-model="form.amount" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="jiaRuGouWuChe2('form')">确认加入</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import {
    Message
  } from "element-ui"
  export default {
    data() {
      let jianYanShuLiang = (rule, value, callback) => {
        if (!value) {
          return new Error('请输入需要加入的商品数量')
        } else {
          value = Number(value)
          if (!Number.isInteger(value)) {
            callback(new Error('请输入正整数值'))
          } else {
            if (value <= 0) {
              callback(new Error('请输入正整数值'))
            } else {
              callback()
            }
          }
        }
      }
      return {
        LunBoTu: [{
          imgUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1143438203,2101264949&fm=26&gp=0.jpg'
        }, {
          imgUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1143438203,2101264949&fm=26&gp=0.jpg'
        }, {
          imgUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1143438203,2101264949&fm=26&gp=0.jpg'
        }, {
          imgUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1143438203,2101264949&fm=26&gp=0.jpg'
        }, {
          imgUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1143438203,2101264949&fm=26&gp=0.jpg'
        }],
        classify: [{
          id: null,
          title: "所有"
        }, {
          id: 2,
          title: "国产车"
        }, {
          id: 3,
          title: "进口车"
        }, {
          id: 5,
          title: "大型家电"
        }, {
          id: 6,
          title: "小型家用"
        }, {
          id: 8,
          title: "男士服装"
        }, {
          id: 9,
          title: "女士服装"
        }],
        nowClassifyId: null,
        contents: "",
        baseURL: this.$baseURL,
        shangpinInfo: [],
        previewInfo: {
          userInfo: {},
          classify: {}
        },
        dialogFormVisible: false,
        dialogFormVisible1: false,
        formLabelWidth: '120px',
        form: {
          amount: null,
          commodityId: null,
        },
        rules: {
          amount: [{
              required: true,
              message: '请输入数量',
              trigger: 'blur'
            },
            {
              validator: jianYanShuLiang,
              trigger: 'blur'
            }
          ],
        },
        total: 1,
        pageSize: 2,
        current: 1,
        isSearch: false
      }
    },
    mounted() {
      this.huoQuShangPinList({
        size: this.pageSize,
        current: this.current
      })
    },
    methods: {
      souSuo() {
        this.current = 1
        this.total = 1
        this.pageSize = 8
        this.nowClassifyId = '-1'
        this.shangpinInfo = [] //先清空
        if (this.contents == "") {
          this.isSearch = false
          this.huoQuShangPinList({
            size: this.pageSize,
            current: this.current
          });
          return;
        }
        this.isSearch = true
        const data = {
          contents: this.contents,
          size: this.pageSize,
          current: this.current
        }
        this.$store.dispatch("shangpin/souSuo", data).then(res => {
          if (res.code === 0) {
            this.shangpinInfo = this.shangpinInfo.concat(res.data.records)
            this.total = res.data.pages
          } else {
            Message({
              type: "error",
              message: res.msg,
              duration: 1000
            })
          }
        }).catch(err => {
          Message({
            type: "error",
            message: "数据请求失败",
            duration: 1000
          })
        })
      },
      //滚动监听
      load() {
        if (this.current >= this.total) return;
        if (!this.isSearch && this.nowClassifyId == null) {
          this.huoQuShangPinList({
            current: ++this.current,
            size: this.pageSize
          })
          return;
        }

        if (this.isSearch && this.nowClassifyId == '-1') {
          //搜索
          const data = {
            contents: this.contents,
            size: this.pageSize,
            current: ++this.current
          }
          this.$store.dispatch("shangpin/souSuo", data).then(res => {
            if (res.code === 0) {
              this.shangpinInfo = this.shangpinInfo.concat(res.data.records)
            } else {
              Message({
                type: "error",
                message: res.msg,
                duration: 1000
              })
            }
          }).catch(err => {
            Message({
              type: "error",
              message: "数据请求失败",
              duration: 1000
            })
          })
        } else {
          this.huoQuShangPinList({
            classId: this.nowClassifyId,
            size: this.pageSize,
            current: ++this.current
          })
        }

      },
      xuanZeClassify(id) {
        if (this.isSearch) {
          //关闭搜索
          this.isSearch = false
          this.current = 1
          this.total = 1
          this.shangpinInfo = []
        }
        if (id == null) {
          this.current = 1
          this.nowClassifyId = null
          this.shangpinInfo = []
          this.huoQuShangPinList({
            size: this.pageSize,
            current: this.current
          });
        } else {
          this.current = 1
          this.shangpinInfo = []
          this.nowClassifyId = id
          this.huoQuShangPinList({
            classId: id,
            size: this.pageSize,
            current: this.current
          });
        }
      },
      jiaRuGouWuChe(shangPinId) {
        this.form.commodityId = shangPinId;
        this.dialogFormVisible = true;
      },
      jiaRuGouWuChe2() {
        this.form.amount = Number(this.form.amount)
        this.$store.dispatch("shangpin/jiaRuGouWuChe", this.form).then(res => {
          if (res.code === 0) {
            Message({
              type: "success",
              message: "加入成功",
              duration: 1000
            })
            this.dialogFormVisible = false
            this.dialogFormVisible1 = false
          } else {
            Message({
              type: "error",
              message: res.msg,
              duration: 1000
            })
          }
        }).catch(err => {
          Message({
            type: "error",
            message: "数据请求失败",
            duration: 1000
          })
        })
      },
      huoQuShangPinList(query) {
        this.$store.dispatch("shangpin/huoQuShangPinList", query).then(res => {
          if (res.code === 0) {
            this.shangpinInfo = this.shangpinInfo.concat(res.data.records)
            this.total = res.data.pages
          } else {
            Message({
              type: "error",
              message: res.msg,
              duration: 1000
            })
          }
        }).catch(err => {
          Message({
            type: "error",
            message: "数据请求失败",
            duration: 1000
          })
        })
      },
      // 预览商品详情
      previewShop(item) {
        this.previewInfo = item;
        this.form.commodityId = item.commodityId;
        this.dialogFormVisible1 = true;
      }
    }
  }
</script>


<style>
  .footMenu {
    margin-top: 80px;
    width: 100%;
  }

  .footMenu ul {
    /* display: inline-block; */
    /* width: 15%; */
    /* position: relative; */
    /* top: 0; */
  }

  .footMenu ul li {
    cursor: pointer;
    display: inline-block;
    /* float: left; */
    width: 15%;
  }

  .footMenu ul li:hover {
    color: #d19a66;
  }


  .el-header,
  .el-footer {
    background-color: #e1e1e1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  li {
    list-style: none;
  }

  .el-main {
    background-color: #859baa;
    color: #333;
    text-align: center;
    line-height: 1.5;
  }

  body>.el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .time {
    font-size: 13px;
    color: #999;
    text-align: left;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .el-col {
    margin-top: 10px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 15rem;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .biaoti {
    margin: 10px auto;
  }

  .miaoshu {
    margin: 10px auto;
    color: #999;
    font-size: 0.8rem;
    text-align: left;
  }

  .lunbotu {
    height: 100%;
    margin: 0 auto;
    /*max-width:100%;*/
    width: 100%;
    display: block;
  }
</style>

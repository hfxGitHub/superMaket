import {
  getList,
  getClassify,
  ShanChuShangPin,
  HuoQuShangPin,
  XiuGaiShangPin
} from '@/api/table'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

const state = {
  toekn: getToken(),
  ShopList: [],
}

const mutations = {
  SET_LIST: (state, data) => {
    state.ShopList = data
  }
}

const actions = {
    // 获取所有商品列表
    getList({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        getList(params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取所有商品分类
    getClassify({
      commit
    },query) {
      return new Promise((resolve, reject) => {
        getClassify(query).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 删除商品
    ShanChuShangPin({
      commit
    }, commodityId) {
      return new Promise((resolve, reject) => {
        ShanChuShangPin(commodityId).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 根据ID获取商品
    HuoQuShangPin({
      commit
    }, commodityId) {
      return new Promise((resolve, reject) => {
        HuoQuShangPin(commodityId).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 修改商品信息
    XiuGaiShangPin({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        XiuGaiShangPin(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }


  }



export default {
  namespaced: true,
  state,
  mutations,
  actions
}

import {
  huoQuGouWuCheList,
  yiChuGouWuChe,
  shengChengDingDan
} from '@/api/gouwuche'

// const mutations = {
//   SET_LIST: (state, data) => {
//     state.messageList = data
//   }
// }

const actions = {
  huoQuGouWuCheList({
                        commit
                      },query) {
    return new Promise((resolve, reject) => {
      huoQuGouWuCheList(query).then(res => {
        const data = res
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  yiChuGouWuChe({
                      commit
                    },query) {
    return new Promise((resolve, reject) => {
      yiChuGouWuChe(query).then(res => {
        const data = res
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  shengChengDingDan({
                  commit
                },sendData) {
    return new Promise((resolve, reject) => {
      shengChengDingDan(sendData).then(res => {
        const data = res
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}


export default {
  namespaced: true,
  // mutations,
  actions
}

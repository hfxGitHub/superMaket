import {
  huoQuDingDanLieBiao,
  huoQuDianPuDingDanLieBiao
} from '@/api/dingdan'

// const mutations = {
//   SET_LIST: (state, data) => {
//     state.messageList = data
//   }
// }

const actions = {
  huoQuDingDanLieBiao({
               commit
             },query) {
    return new Promise((resolve, reject) => {
      huoQuDingDanLieBiao(query).then(res => {
        const data = res
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  huoQuDianPuDingDanLieBiao({
                        commit
                      },query) {
    return new Promise((resolve, reject) => {
      huoQuDianPuDingDanLieBiao(query).then(res => {
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

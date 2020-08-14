import {
  huoQuShangPinList,
  jiaRuGouWuChe,
  souSuo
} from '@/api/shangpin'


const actions = {
  huoQuShangPinList({
                      commit
                    },query) {
    return new Promise((resolve, reject) => {
      huoQuShangPinList(query).then(res => {
        const data = res
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  jiaRuGouWuChe({
                      commit
                    },query) {
    return new Promise((resolve, reject) => {
      jiaRuGouWuChe(query).then(res => {
        const data = res
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  souSuo({
                  commit
                },query) {
    return new Promise((resolve, reject) => {
      souSuo(query).then(res => {
        const data = res
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
}


export default {
  namespaced: true,
  actions
}

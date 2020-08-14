import {
  getMessage
} from '@/api/index'
import {
  fenxi
} from '@/api/fenxi'
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
  messageList: [],
}

const mutations = {
  SET_LIST: (state, data) => {
    state.messageList = data
  }
}

const actions = {
  getMessage({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getMessage().then(res => {
        const data = res
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  
  fenxi({
    commit
  }) {
    return new Promise((resolve, reject) => {
      fenxi().then(res => {
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

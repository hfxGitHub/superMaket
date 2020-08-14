import {
  login,
  logout,
  apply,
  register,
  modifyPwd
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  setUserType,
  setUserID
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'
import {
  Message
} from 'element-ui'

const state = {
  token: getToken(),
  userType: '',
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.Authorization)
        commit('SET_NAME', data.nickname)
        setToken(data.Authorization)
        setUserType(data.userType)
        sessionStorage.setItem('nickname', data.nickname)
        setUserID(data.userId)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户申请成为商家
  apply({
    commit
  }) {
    return new Promise((resolve, reject) => {
      apply().then(res => {
        if (res.code == 0) {
          Message({
            message: '申请成功，请重新登录！',
            type: 'success',
            duration: 10 * 100
          })
          setUserType(1);
        }
        console.log(res)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 注册
  register({
    commit
  }, registerForm) {
    return new Promise((resolve, reject) => {
      register(registerForm).then(res => {
        if (res.code == 0) {
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 100
          })
          resolve(res)
        }
      })
    }).catch(err => {
      reject(err)
    })
  },

  // 修改密码
  modifyPwd({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      modifyPwd(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

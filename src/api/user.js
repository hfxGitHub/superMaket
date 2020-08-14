import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

// 注册
  export function register(data) {
    return request({
      url: '/user/register',
      method: 'post',
      data
    })
  }

// 申请成为商家
export function apply() {
  return request({
    url: '/user/apply',
    method: 'get'
  })
}

// 修改密码
export function modifyPwd(data) {
  return request({
    url: '/user/modifyPwd',
    method: 'post',
    data
  })
}
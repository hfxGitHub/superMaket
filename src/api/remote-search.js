import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/VUE-DXSC/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/VUE-DXSC/transaction/list',
    method: 'get',
    params: query
  })
}

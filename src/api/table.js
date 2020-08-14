import request from '@/utils/request'


// 获取所有商品列表
export function getList(params) {
  return request({
    url: '/commodity/list',
    method: 'get',
    params: params
  })
}

// 获取所有商品分类
export function getClassify(query) {
  return request({
    url: '/classify/list',
    method: 'get',
    params:query
  })
}

// 删除商品
export function ShanChuShangPin(data) {
  return request({
    url: '/commodity/del',
    method: 'get',
    params: data
  })
}

// 根据商品ID获取商品详情
export function HuoQuShangPin(data) {
  return request({
    url: '/commodity/get',
    method: 'get',
    params: data
  })
}

// 修改商品信息
export function XiuGaiShangPin(data) {
  return request({
    url: '/commodity/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

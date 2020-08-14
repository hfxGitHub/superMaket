import request from '@/utils/request'


// 获取购物车列表
export function huoQuGouWuCheList(query) {
  return request({
    url: '/cart/list',
    method: 'get',
    params:query
  })
}

// 移出购物车
export function yiChuGouWuChe(query) {
  return request({
    url: '/cart/del?cartId='+query.cartId,
    method: 'get',
  })
}
// 生成订单
export function shengChengDingDan(data) {
  return request({
    url: '/order/add',
    method: 'post',
    headers:{
      "Content-Type":"application/json"
    },
    data:data
  })
}

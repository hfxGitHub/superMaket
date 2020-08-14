import request from '@/utils/request'

//dbc
// 获取订单列表
export function huoQuDingDanLieBiao(query) {
  return request({
    url: '/order/get',
    method: 'get',
    params:query
  })
}
// 获取店铺订单列表
export function huoQuDianPuDingDanLieBiao(query) {
  return request({
    url: '/order/getOrderToMe',
    method: 'get',
    params:query
  })
}

import request from '@/utils/request'


// 获取订单列表
export function huoQuShangPinList(query) {
  return request({
    url: "/commodity/list",
    method: 'get',
    params:query
  })
}

// 加入购物车
export function jiaRuGouWuChe(query) {
  return request({
    url: "/cart/add",
    method: 'get',
    params:query
  })
}
// 搜索商品
export function souSuo(query) {
  return request({
    url: "/commodity/search",
    method: 'get',
    params:query
  })
}

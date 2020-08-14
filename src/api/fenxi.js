import request from '@/utils/request'

// 获取数据分析数据
export function fenxi() {
  return request({
    url: 'order/analysis',
    method: 'get'
  })
}

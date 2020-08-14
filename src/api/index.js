import request from '@/utils/request'

// 获取首页消息列表
export function getMessage() {
  return request({
    url: '/message/get',
    method: 'get',
  })
}

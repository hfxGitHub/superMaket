import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/VUE-DXSC/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/VUE-DXSC/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/VUE-DXSC/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/VUE-DXSC/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/VUE-DXSC/role/${id}`,
    method: 'delete'
  })
}

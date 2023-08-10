import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/maintain/list',
    method:'get',
    params:params
  })
}

export function createMaintain(data) {
  return request({
    url:'/maintain/create',
    method:'post',
    data:data
  })
}

export function getMaintain(id) {
  return request({
    url:'/maintain/'+id,
    method:'get',
  })
}

export function updateMaintain(id,data) {
  return request({
    url:'/maintain/update/'+id,
    method:'post',
    data:data
  })
}

export function deleteMaintain(id) {
  return request({
    url:'/maintain/delete/'+id,
    method:'post',
  })
}

export function setStatus(id) {
  return request({
    url:'/maintain/status/' + id,
    method:'get'
  })
}

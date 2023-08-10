import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/device/list',
    method:'get',
    params:params
  })
}

export function createDevice(data) {
  return request({
    url:'/device/create',
    method:'post',
    data:data
  })
}

export function getDevice(id) {
  return request({
    url:'/device/'+id,
    method:'get',
  })
}

export function getList() {
  return request({
    url:'/device/listAll',
    method:'get',
  })
}

export function updateDevice(id,data) {
  return request({
    url:'/device/update/'+id,
    method:'post',
    data:data
  })
}

export function deleteDevice(id) {
  return request({
    url:'/device/delete/'+id,
    method:'post',
  })
}

export function getFittingList(id) {
  return request({
    url:'/device/listFitting/'+id,
    method:'get',
  })
}

import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/fitting/list',
    method:'get',
    params:params
  })
}

export function createFitting(data) {
  return request({
    url:'/fitting/create',
    method:'post',
    data:data
  })
}

export function getFitting(id) {
  return request({
    url:'/fitting/'+id,
    method:'get',
  })
}

export function updateFitting(id,data) {
  return request({
    url:'/fitting/update/'+id,
    method:'post',
    data:data
  })
}

export function deleteFitting(id) {
  return request({
    url:'/fitting/delete/'+id,
    method:'post',
  })
}

export function getDevice(id) {
  return request({
    url:'/fitting/getDevice/'+id,
    method:'get',
  })
}

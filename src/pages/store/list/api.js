import request from 'util/request';

export function getStoreList(data) {
  return request.post({
    url: '/seller/store/list',
    data,
  });
}

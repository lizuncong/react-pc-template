import request from '../../../utils/request';

export function getStoreList(data) {
  return request.post({
    url: '/seller/store/list',
    data,
  });
}

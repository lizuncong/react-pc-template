import request from '../../../utils/request';

export function getRegions(data) {
  return request.get({
    url: '/seller/common/region/list',
    data,
  });
}

export function getPlace(data) {
  return request.get({
    url: '/seller/common/place',
    data,
  });
}

export function save(data) {
  return request.upload({
    url: '/seller/store/new',
    data,
  });
}

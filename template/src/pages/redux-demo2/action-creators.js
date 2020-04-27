import { createAction } from '../../utils/utils';
import { CHANGE_MORE_VALUE } from './types';

// 这么写太麻烦了，，所以写个createAction抽离出逻辑
// export const changeMoreValueAction = (payload) => ({
//   type: CHANGE_MORE_VALUE,
//   payload,
// });

// createAction返回的其实就是(payload) => ({
//   type: CHANGE_MORE_VALUE,
//   payload,
// })
export const changeMoreValue = createAction(CHANGE_MORE_VALUE, 'payload'); // 这个payload需要在reducers.js里使用到

import { createAction } from '../../utils/utils';
import { CHANGE_MORE_VALUE } from './types';

// export const changeMoreValueAction = (payload) => ({
//   type: CHANGE_MORE_VALUE,
//   payload,
// });

export const changeMoreValueAction = createAction(CHANGE_MORE_VALUE, 'payload');

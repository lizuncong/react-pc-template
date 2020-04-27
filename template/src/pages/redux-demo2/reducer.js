import { CHANGE_MORE_VALUE, RESET } from './types';

const defaultState = {
  count2: 0,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case RESET:
      return defaultState;
    case CHANGE_MORE_VALUE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

import { SWITCH_MENU } from './actionTypes';

const initialState = {
  menuId: '',
  menuName: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SWITCH_MENU:
      return action.payload;
    default:
      return state;
  }
}

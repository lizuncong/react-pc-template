import { SWITCH_MENU } from './actionTypes';

export const switchMenu = (menu) => ({
  type: SWITCH_MENU,
  payload: menu,
});

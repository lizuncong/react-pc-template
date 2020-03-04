import { SET_FILTER } from './actionTypes';

const initialState = 'all'; // 'all', 'completed', 'incomplete'

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
}

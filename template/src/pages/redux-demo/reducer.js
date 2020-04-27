import { CHANGE_MORE_VALUE, RESET } from './types';

const defaultState = {
  count: 0,
  testNameSpaceCount: 0, // 用于测试命名空间，如果把redux-demo和redux-demo2下面的types的namespace设置为''，
  // 访问redux-demo2页面，并点击add，会发现testNameSpaceCount也跟着变了。因此命名空间很重要，防止type重复
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case RESET:
      return defaultState;
    case CHANGE_MORE_VALUE:
      console.log('redux-demo-change-more-value');
      return {
        ...state,
        ...action.payload,
        ...{ testNameSpaceCount: state.testNameSpaceCount + 1 },
      };
    default:
      return state;
  }
}

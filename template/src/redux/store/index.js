// import { createStore, applyMiddleware } from 'redux';
import { createStore } from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from '../reducer';
// import request from '../../utils/request';

// 安装redux-devtools-extension的可视化工具。
// import { composeWithDevTools } from 'redux-devtools-extension'
// const initialState = {
//   menuName: ''
// }
// const configureStore = () => createStore(reducer, initialState);

export default createStore(rootReducer);

// export default createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(request)));

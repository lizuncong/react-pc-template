import { createStore } from 'redux';
import rootReducer from '../reducer';


// 安装redux-devtools-extension的可视化工具。
// import { composeWithDevTools } from 'redux-devtools-extension'
// const initialState = {
//   menuName: ''
// }
// const configureStore = () => createStore(reducer, initialState);

export default createStore(rootReducer);

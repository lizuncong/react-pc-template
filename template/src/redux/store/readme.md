redux知识汇总：
1.connect接受四个参数，其中用的最多的就是connect(mapStateToProps, mapDispatchToProps)
mapDispatchToProps可以是一个对象，也可以是一个函数(dispatch, ownProps?) => Object
如果mapDispatchToProps为null，则redux会自动将dispatch传给被connect包裹的组件。
如果mapDispatchToProps不为null，则被connect包裹的组件不会接受到dispatch属性。这时候需要手动
将dispatch传入组件
即connect(null,{ toggleTodo })(Todo);由于mapDispatchToProps不为null，因此Todo组件
并没有dispatch这个属性。
connect(null,null)(Todo);由于mapDispatchToProps为null，因此Todo组件会自动接受到dispatch属性

mapDispatchToProps为函数时，接受一个dispatch参数，ownProps参数可选
const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
})
const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch, // 手动将dispatch传入
  toggleTodo: () => dispatch(toggleTodo(ownProps.todoId))
}
toggleTodo就是一个actionCreator，dispatch派发的就是一个普通的action对象，即dispatch({ type: 'TOGGLE_TODO', payload: { id: 1 }})

注意type的命名空间，如果多个地方定义了同一个type，到时候dispatch派发的时候，都会同时触发这些监听了同一个type的reducer。

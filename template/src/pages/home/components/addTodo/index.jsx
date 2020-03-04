import React from 'react';
import styles from './index.module.less';

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  onInputChange(input) {
    this.setState({ input });
  }

  handleAddTodo() {
    const { addTodo } = this.props;
    const { input } = this.state;
    addTodo(input);
    this.setState({ input: '' });
  }

  render() {
    const { input } = this.state;
    return (
      <div className={styles.row}>
        <input
          onChange={(e) => this.onInputChange(e.target.value)}
          value={input}
        />
        <div
          className={styles.addBtn}
          onClick={() => this.handleAddTodo()}
        >
          添加
        </div>
      </div>
    );
  }
}

export default AddTodo;

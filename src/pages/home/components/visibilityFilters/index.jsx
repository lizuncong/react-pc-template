import React from 'react';
import styles from './index.module.less';

const tabs = [
  {
    title: '全部',
    status: 'all',
  },
  {
    title: '已办',
    status: 'completed',
  },
  {
    title: '待办',
    status: 'incomplete',
  },
];
class VisibilityFilters extends React.Component {
  render() {
    const { activeFilter, setFilter } = this.props;
    return (
      <div className={styles.tab}>
        {
            tabs.map((item) => (
              <div
                key={item.status}
                onClick={() => setFilter(item.status)}
                className={[styles.tabItem, item.status === activeFilter && styles.selected].join(' ')}
              >
                {item.title}
              </div>
            ))
          }
      </div>
    );
  }
}

export default VisibilityFilters;

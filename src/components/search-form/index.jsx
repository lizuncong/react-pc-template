import React from 'react';
import styles from './index.module.less';
import FormItems from './formItems';
import OtherItems from './otherItems';

class SearchForm extends React.Component {
  onValueChange(newValue, formItem) {
    const { onValueChange } = this.props;
    Object.keys(newValue).forEach((key) => {
      if (newValue[key] === '' || newValue[key] === undefined) {
        delete newValue[key];
      }
    });
    onValueChange(newValue, formItem);
  }

  render() {
    const { formItems = [], value, otherItems = [] } = this.props;
    return (
      <div className={styles.searchFormContainer}>
        <FormItems
          formItems={formItems.filter((item) => !item.hidden)}
          value={value}
          onValueChange={(newValue, formItem) => this.onValueChange(newValue, formItem)}
        />
        <OtherItems
          otherItems={otherItems.filter((item) => !item.hidden)}
          value={value}
          onValueChange={(newValue, formItem) => this.onValueChange(newValue, formItem)}
        />
      </div>
    );
  }
}

export default SearchForm;

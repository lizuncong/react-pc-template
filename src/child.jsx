import React from 'react';

class Child extends React.Component {
  render() {
    return (
      <div
        onClick={() => {
          import(/* webpackChunkName: "lodash", webpackPrefetch: true */'lodash').then((_) => {
            console.log(_.join(['li', 'zun', 'cong'], '++++'));
          });
          import(/* webpackChunkName: "moment", webpackPreload: true */'moment').then((moment) => {
            console.log(moment());
          });
          // import(/* webpackChunkName: "jquery" */'jquery').then(($) => {
          //   console.log($);
          // });
        }}
      >
        child Element
      </div>
    );
  }
}

export default Child;

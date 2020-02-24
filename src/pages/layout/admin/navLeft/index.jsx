import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import MenuConfig from '../../../../config/menuConfig';
import styles from './index.module.less';

const { SubMenu } = Menu;

class NavLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuTreeNode: [],
      currentUrl: '',
    };
  }

  componentWillMount() {
    const { switchMenu } = this.props;
    const menuTreeNode = this.renderMenu(MenuConfig);
    const currentUrl = window.location.hash.replace(/#|\?.*$/g, '');
    const menuItem = this.getMenuItemByUrl(currentUrl, MenuConfig);
    if (menuItem) {
      switchMenu({ menuId: menuItem.url, menuName: menuItem.title });
    }
    this.setState({
      menuTreeNode,
      currentUrl,
    });
  }

  getMenuItemByUrl(url, menus) {
    for (let i = 0; i < menus.length; i += 1) {
      const menuItem = menus[i];
      if ((!menuItem.children || !menuItem.children.length) && url.indexOf(menuItem.url) > -1) {
        return menuItem;
      } if (menuItem.children && menuItem.children.length) {
        return this.getMenuItemByUrl(url, menuItem.children);
      }
    }
  }

  // 菜单渲染
  renderMenu(data) {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.url}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.url}>
          <NavLink to={item.url}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  }

  handleClick(menuItem) {
    const { switchMenu } = this.props;
    const menuName = menuItem.item.props.children.props.children;
    switchMenu({ menuId: menuItem.url, menuName });
    this.setState({
      currentUrl: menuItem.key,
    });
  }

  render() {
    const { currentUrl, menuTreeNode } = this.state;
    return (
      <div className={styles.navLeftContent}>
        <div className={styles.logo}>
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>MTAdmin</h1>
        </div>
        <Menu
          onClick={(menuItem) => this.handleClick(menuItem)}
          selectedKeys={[currentUrl]}
          theme="dark"
        >
          { menuTreeNode }
        </Menu>
      </div>
    );
  }
}


export default NavLeft;

import React from 'react';
import {Menu} from 'antd';
import {
  AimOutlined,
  BarsOutlined,
  CloseSquareOutlined,
} from '@ant-design/icons';
import {useHistory} from 'react-router';
import {useMoralis} from "react-moralis";

const SideNav = () => {
  const history = useHistory();
  const { logout } = useMoralis();

  const handleUserClick = () => {
    history.push('/users');
  }

  const handleTokensClick = () => {
    history.push('/tokens');
  }

  const handleAirdropClick = () => {
    history.push('/airdrop');
  }

  return (
    <div>
      <div style={{height: "32px", margin: "16px"}}></div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
        <Menu.Item key="1" onClick={handleTokensClick}>
          <BarsOutlined />
          <span>Tokens</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={handleAirdropClick}>
          <AimOutlined />
          <span>Airdrop</span>
        </Menu.Item>
        <Menu.Item key="3" onClick={() => logout()}>
          <CloseSquareOutlined />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default SideNav;

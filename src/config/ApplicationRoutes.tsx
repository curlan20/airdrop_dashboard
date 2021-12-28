import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Tokens from "../components/pages/tokens";
import Nfts from "../components/pages/nfts";
import Users from "../components/pages/users";
import Airdrop from "../components/pages/airdrop";
import SideNav from "../components/layouts/sidebar";

import {Layout} from 'antd';
import {useMoralis} from "react-moralis";

const {Header, Sider, Content} = Layout;


const ApplicationRoutes = () => {
  const {logout, user} = useMoralis();

  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
  }, []);

  const handleToggle = (event: any) => {
    event.preventDefault();
    collapse ? setCollapse(false) : setCollapse(true);
  }

  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapse}>
          <SideNav/>
        </Sider>
        <Layout>
          <Header className="siteLayoutBackground" style={{padding: 0, background: "#001529"}}>
          </Header>
          <Content style={{margin: '24px 16px', padding: 24, minHeight: "calc(100vh - 114px)", background: "#fff"}}>
            <Switch>
              <Route path="/tokens" component={Tokens}/>
              <Route path="/nfts" component={Nfts}/>
              <Route path="/airdrop" component={Airdrop}/>
              { user?.get('role')== 'admin' && <Route path="/users" component={Users}/>}
              <Redirect to="/airdrop" from="/"/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default ApplicationRoutes;

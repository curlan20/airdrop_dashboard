import React from 'react';
import ApplicationRoutes from "./config/ApplicationRoutes";
import {useMoralis} from "react-moralis";
import {Auth} from "./components/Auth";
import {Layout} from "antd";

function App() {
  const {isAuthenticated} = useMoralis();

  if (isAuthenticated) {
    return (
      <ApplicationRoutes/>
    );
  }

  return (
    <Layout>
      <Auth/>
    </Layout>
  )
}

export default App;

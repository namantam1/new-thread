import React from "react";
// import Slider from "./SideBar";
import Thread from "./Thread";
// import { Layout, Breadcrumb } from "antd";
import Test from './MyRoute'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

class MyLayout extends React.Component {
  render() {
    return (
      < Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/thread">Thread</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/test">Test</Link></Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Breadcrumb style={{ margin: "16px 0" }} className="ml-2">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <Switch>
            <Route path="/thread">
              <div className="site-layout-content"><Thread /></div>
            </Route>
            <Route path="/test">
              <div className="site-layout-content"><Test/></div>
            </Route>
            <Route path="/">
              <div className="site-layout-content">This is home</div>
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      </ Router>
    );
  }
}

export default MyLayout;

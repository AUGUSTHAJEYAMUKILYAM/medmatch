import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Layout } from "antd";

import Dashboard from "./pages/Dashboard";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "24px 40px" }}>
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
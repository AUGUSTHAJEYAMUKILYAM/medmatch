import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

function AppFooter() {
  return (
    <Footer
      style={{
        textAlign: "center",
        background: "#f5f5f5",
      }}
    >
      MedMatch ©2026 - Smart Healthcare Companion
    </Footer>
  );
}

export default AppFooter;
import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import {
  SearchOutlined,
  SafetyOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px 40px",
        }}
      >
        <Title level={1}>
          Welcome to MedMatch
        </Title>

        <Paragraph
          style={{
            fontSize: "18px",
            color: "#666",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          Your smart healthcare companion for finding medicines,
          checking drug interactions, locating pharmacies, and
          managing prescriptions.
        </Paragraph>

        <div style={{ marginTop: "30px" }}>
          <Button
            type="primary"
            size="large"
            icon={<SearchOutlined />}
            onClick={() => navigate("/medicines")}
            style={{ marginRight: "12px" }}
          >
            Search Medicines
          </Button>

          <Button
            size="large"
            icon={<SafetyOutlined />}
            onClick={() => navigate("/interactions")}
          >
            Check Interactions
          </Button>
        </div>
      </div>

      {/* Features */}
      <Row gutter={[24, 24]}>
        
        {/* Medicine Search */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{ height: "100%" }}
            cover={
              <div
                style={{
                  fontSize: "40px",
                  textAlign: "center",
                  padding: "25px 0 10px",
                }}
              >
                <SearchOutlined />
              </div>
            }
          >
            <Card.Meta
              title="Medicine Search"
              description="Search medicines by name or generic name and view detailed information."
            />
          </Card>
        </Col>

        {/* Interaction Checker */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{ height: "100%" }}
            cover={
              <div
                style={{
                  fontSize: "40px",
                  textAlign: "center",
                  padding: "25px 0 10px",
                }}
              >
                <SafetyOutlined />
              </div>
            }
          >
            <Card.Meta
              title="Interaction Checker"
              description="Check whether multiple medicines may interact with each other."
            />
          </Card>
        </Col>

        {/* Pharmacy Locator */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{ height: "100%" }}
            cover={
              <div
                style={{
                  fontSize: "40px",
                  textAlign: "center",
                  padding: "25px 0 10px",
                }}
              >
                <EnvironmentOutlined />
              </div>
            }
          >
            <Card.Meta
              title="Pharmacy Locator"
              description="Find pharmacies and locate them easily using the map."
            />
          </Card>
        </Col>

        {/* Prescription Management */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{ height: "100%" }}
            cover={
              <div
                style={{
                  fontSize: "40px",
                  textAlign: "center",
                  padding: "25px 0 10px",
                }}
              >
                <FileTextOutlined />
              </div>
            }
          >
            <Card.Meta
              title="Prescription Management"
              description="Upload and manage your digital prescriptions securely."
            />
          </Card>
        </Col>

      </Row>
    </div>
  );
}

export default Dashboard;
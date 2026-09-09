import React from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Tag,
} from "antd";

import {
  SearchOutlined,
  SafetyOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

const { Title, Paragraph, Text } = Typography;

function Dashboard() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SearchOutlined />,
      title: "Medicine Search",
      description:
        "Quickly find medicines, generic names, strengths, and detailed information.",
      action: "Explore Medicines",
      path: "/medicines",
      className: "feature-blue",
    },
    {
      icon: <SafetyOutlined />,
      title: "Drug Interaction Checker",
      description:
        "Check whether two or more medicines may interact before taking them together.",
      action: "Check Interactions",
      path: "/interactions",
      className: "feature-purple",
    },
    {
      icon: <EnvironmentOutlined />,
      title: "Pharmacy Locator",
      description:
        "Find nearby pharmacies and view their locations, contact details, and timings.",
      action: "Find Pharmacies",
      path: "/pharmacies",
      className: "feature-green",
    },
    {
      icon: <FileTextOutlined />,
      title: "Prescription Management",
      description:
        "Keep your digital prescriptions organized and easily accessible in one place.",
      action: "Manage Prescriptions",
      path: "/prescriptions",
      className: "feature-orange",
    },
  ];

  return (
    <div className="dashboard">

      {/* ================= HERO ================= */}

      <section className="hero-section">

        <div className="hero-background-circle circle-one"></div>
        <div className="hero-background-circle circle-two"></div>

        <div className="hero-content">

          <Tag className="hero-tag">
            <MedicineBoxOutlined /> Smart Healthcare Platform
          </Tag>

          <Title className="hero-title">
            Your Health,
            <br />
            <span>Smarter & Simpler.</span>
          </Title>

          <Paragraph className="hero-description">
            MedMatch helps you find medicines, check drug interactions,
            locate pharmacies, and securely manage your prescriptions —
            all from one place.
          </Paragraph>

          <div className="hero-buttons">

            <Button
              type="primary"
              size="large"
              className="primary-hero-button"
              icon={<SearchOutlined />}
              onClick={() => navigate("/medicines")}
            >
              Explore Medicines
            </Button>

            <Button
              size="large"
              className="secondary-hero-button"
              onClick={() => navigate("/interactions")}
            >
              Check Interactions
              <ArrowRightOutlined />
            </Button>

          </div>

          <div className="hero-trust">

            <div className="trust-item">
              <CheckCircleOutlined />
              <span>Easy to use</span>
            </div>

            <div className="trust-item">
              <CheckCircleOutlined />
              <span>Secure</span>
            </div>

            <div className="trust-item">
              <CheckCircleOutlined />
              <span>All in one place</span>
            </div>

          </div>

        </div>

        {/* Hero visual */}

        <div className="hero-visual">

          <div className="medical-card main-medical-card">

            <div className="medical-icon">
              <MedicineBoxOutlined />
            </div>

            <div>
              <Text className="medical-card-label">
                MedMatch
              </Text>

              <div className="medical-card-title">
                Smart Healthcare
              </div>
            </div>

          </div>

          <div className="floating-card interaction-floating">

            <div className="floating-icon purple-icon">
              <SafetyOutlined />
            </div>

            <div>
              <strong>Drug Safety</strong>
              <span>Interaction checked</span>
            </div>

            <CheckCircleOutlined className="success-icon" />

          </div>

          <div className="floating-card pharmacy-floating">

            <div className="floating-icon green-icon">
              <EnvironmentOutlined />
            </div>

            <div>
              <strong>Pharmacy</strong>
              <span>Find nearby</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= SECTION TITLE ================= */}

      <section className="features-section">

        <div className="section-heading">

          <Tag className="section-tag">
            Everything you need
          </Tag>

          <Title level={2}>
            Healthcare made easier
          </Title>

          <Paragraph>
            Powerful tools designed to make managing your medicines
            simple, safe, and convenient.
          </Paragraph>

        </div>


        {/* ================= FEATURE CARDS ================= */}

        <Row gutter={[24, 24]}>

          {features.map((feature) => (

            <Col
              xs={24}
              sm={12}
              lg={6}
              key={feature.title}
            >

              <Card
                hoverable
                className={`feature-card ${feature.className}`}
                onClick={() => navigate(feature.path)}
              >

                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>

                <Title
                  level={4}
                  className="feature-title"
                >
                  {feature.title}
                </Title>

                <Paragraph className="feature-description">
                  {feature.description}
                </Paragraph>

                <Button
                  type="link"
                  className="feature-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(feature.path);
                  }}
                >
                  {feature.action}
                  <ArrowRightOutlined />
                </Button>

              </Card>

            </Col>

          ))}

        </Row>

      </section>


      {/* ================= BOTTOM CTA ================= */}

      <section className="bottom-cta">

        <div>

          <div className="cta-icon">
            <MedicineBoxOutlined />
          </div>

          <div>

            <Title level={3}>
              Take control of your medication journey.
            </Title>

            <Paragraph>
              Search medicines and access your healthcare tools
              whenever you need them.
            </Paragraph>

          </div>

        </div>

        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/medicines")}
        >
          Get Started
          <ArrowRightOutlined />
        </Button>

      </section>

    </div>
  );
}

export default Dashboard;
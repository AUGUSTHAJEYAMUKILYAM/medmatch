import React from "react";
import {
  SearchOutlined,
  SafetyOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const { Title, Paragraph, Text } = Typography;

function Dashboard() {
  const navigate = useNavigate();

  const services = [
    {
      icon: <MedicineBoxOutlined />,
      title: "Find Medicines",
      description:
        "Search medicines, check dosage information and explore generic alternatives.",
      action: "Browse Medicines",
      path: "/medicines",
      className: "service-blue",
    },
    {
      icon: <SafetyOutlined />,
      title: "Drug Interaction Check",
      description:
        "Check whether your medicines may interact before taking them together.",
      action: "Check Interactions",
      path: "/interactions",
      className: "service-green",
    },
    {
      icon: <EnvironmentOutlined />,
      title: "Find a Pharmacy",
      description:
        "Locate nearby pharmacies and view their address, hours and contact details.",
      action: "Find Pharmacy",
      path: "/pharmacies",
      className: "service-purple",
    },
    {
      icon: <FileTextOutlined />,
      title: "Manage Prescriptions",
      description:
        "Keep your digital prescriptions organized and accessible in one place.",
      action: "My Prescriptions",
      path: "/prescriptions",
      className: "service-orange",
    },
  ];

  return (
    <div className="dashboard">

      {/* ================= HERO ================= */}
      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            <CheckCircleOutlined />
            <span>Trusted Digital Healthcare Companion</span>
          </div>

          <Title className="hero-title">
            Your health.
            <br />
            <span>Our priority.</span>
          </Title>

          <Paragraph className="hero-description">
            MedMatch helps you find medicines, check drug interactions,
            discover pharmacies and securely manage your prescriptions —
            all from one place.
          </Paragraph>

          <div className="hero-buttons">

            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              className="primary-hero-btn"
              onClick={() => navigate("/medicines")}
            >
              Find a Medicine
            </Button>

            <Button
              size="large"
              className="secondary-hero-btn"
              onClick={() => navigate("/pharmacies")}
            >
              Find a Pharmacy
              <ArrowRightOutlined />
            </Button>

          </div>

          {/* Trust points */}
          <div className="trust-points">

            <div>
              <CheckCircleOutlined />
              <span>Easy to use</span>
            </div>

            <div>
              <CheckCircleOutlined />
              <span>Secure prescriptions</span>
            </div>

            <div>
              <CheckCircleOutlined />
              <span>Medicine information</span>
            </div>

          </div>

        </div>

        {/* Hero medical visual */}
        <div className="hero-visual">

          <div className="medical-circle large"></div>
          <div className="medical-circle small"></div>

          <div className="medical-card">

            <div className="medical-card-icon">
              <MedicineBoxOutlined />
            </div>

            <div>
              <span className="medical-label">
                HEALTHCARE
              </span>

              <h3>
                MedMatch
              </h3>

              <p>
                Smarter medicine management
              </p>
            </div>

          </div>

          <div className="floating-card interaction-card">
            <SafetyOutlined />
            <div>
              <strong>Interaction Check</strong>
              <span>Stay medication safe</span>
            </div>
          </div>

          <div className="floating-card pharmacy-card">
            <EnvironmentOutlined />
            <div>
              <strong>Pharmacies</strong>
              <span>Find one near you</span>
            </div>
          </div>

        </div>

      </section>


      {/* ================= QUICK ACCESS ================= */}
      <section className="quick-section">

        <div className="section-heading">
          <div>
            <Text className="section-label">
              MEDMATCH SERVICES
            </Text>

            <Title level={2}>
              Everything you need for your medicines
            </Title>
          </div>

          <Paragraph>
            Simple tools designed to make managing your healthcare easier.
          </Paragraph>
        </div>


        <div className="services-grid">

          {services.map((service) => (
            <div
              key={service.title}
              className={`service-card ${service.className}`}
              onClick={() => navigate(service.path)}
            >

              <div className="service-icon">
                {service.icon}
              </div>

              <div className="service-content">

                <h3>{service.title}</h3>

                <p>
                  {service.description}
                </p>

                <span className="service-link">
                  {service.action}
                  <ArrowRightOutlined />
                </span>

              </div>

            </div>
          ))}

        </div>

      </section>


      {/* ================= HEALTHCARE BANNER ================= */}
      <section className="health-banner">

        <div className="health-icon">
          <HeartOutlined />
        </div>

        <div className="health-content">
          <Text>
            YOUR HEALTH, SIMPLIFIED
          </Text>

          <h2>
            Take control of your medication journey.
          </h2>

          <p>
            Search medicines, identify potential interactions,
            locate pharmacies and keep your prescriptions organized.
          </p>
        </div>

        <Button
          size="large"
          onClick={() => navigate("/medicines")}
          className="banner-button"
        >
          Explore Medicines
          <ArrowRightOutlined />
        </Button>

      </section>


      {/* ================= TRUST SECTION ================= */}
      <section className="trust-section">

        <div>
          <strong>15+</strong>
          <span>Medicines Available</span>
        </div>

        <div>
          <strong>24/7</strong>
          <span>Access to Your Data</span>
        </div>

        <div>
          <strong>100%</strong>
          <span>User-focused Experience</span>
        </div>

        <div>
          <strong>Secure</strong>
          <span>Prescription Management</span>
        </div>

      </section>

    </div>
  );
}

export default Dashboard;
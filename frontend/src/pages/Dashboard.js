import React from "react";
import {
  SearchOutlined,
  SafetyOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* ================= HERO ================= */}

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            <MedicineBoxOutlined />
            <span>SMART HEALTHCARE, SIMPLIFIED</span>
          </div>

          <h1>
            Your Health.
            <br />
            <span>Our Priority.</span>
          </h1>

          <p className="hero-description">
            Find medicines, check drug interactions, locate nearby
            pharmacies and securely manage your prescriptions — all
            in one place.
          </p>

          {/* Search */}

          <div className="hero-search">

            <SearchOutlined className="search-icon" />

            <Input
              placeholder="Search for medicines, generic names..."
              bordered={false}
              onPressEnter={() => navigate("/medicines")}
            />

            <Button
              type="primary"
              onClick={() => navigate("/medicines")}
            >
              Search
            </Button>

          </div>

          <div className="hero-actions">

            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              onClick={() => navigate("/medicines")}
            >
              Browse Medicines
            </Button>

            <Button
              size="large"
              icon={<FileTextOutlined />}
              onClick={() => navigate("/prescriptions")}
            >
              Upload Prescription
            </Button>

          </div>

        </div>

        {/* Hero visual */}

        <div className="hero-visual">

          <div className="medical-circle">

            <MedicineBoxOutlined />

          </div>

          <div className="floating-card floating-card-one">
            <CheckCircleOutlined />
            <div>
              <strong>Safe & Secure</strong>
              <span>Your health data matters</span>
            </div>
          </div>

          <div className="floating-card floating-card-two">
            <HeartOutlined />
            <div>
              <strong>Healthcare</strong>
              <span>Made simple</span>
            </div>
          </div>

        </div>

      </section>


      {/* ================= QUICK SERVICES ================= */}

      <section className="services-section">

        <div className="section-heading">

          <div>
            <span className="section-label">
              WHAT WE OFFER
            </span>

            <h2>
              Everything you need,
              <br />
              in one place.
            </h2>
          </div>

          <p>
            From finding the right medicine to locating a pharmacy,
            MedMatch makes everyday healthcare easier.
          </p>

        </div>


        <div className="service-grid">

          {/* Medicine */}

          <div
            className="service-card"
            onClick={() => navigate("/medicines")}
          >

            <div className="service-icon green">
              <SearchOutlined />
            </div>

            <h3>Medicine Search</h3>

            <p>
              Search medicines by brand or generic name and
              view detailed information.
            </p>

            <span className="service-link">
              Explore Medicines
              <ArrowRightOutlined />
            </span>

          </div>


          {/* Interactions */}

          <div
            className="service-card"
            onClick={() => navigate("/interactions")}
          >

            <div className="service-icon navy">
              <SafetyOutlined />
            </div>

            <h3>Drug Interaction Checker</h3>

            <p>
              Check whether two or more medicines may interact
              before taking them together.
            </p>

            <span className="service-link">
              Check Interactions
              <ArrowRightOutlined />
            </span>

          </div>


          {/* Pharmacy */}

          <div
            className="service-card"
            onClick={() => navigate("/pharmacies")}
          >

            <div className="service-icon green">
              <EnvironmentOutlined />
            </div>

            <h3>Find a Pharmacy</h3>

            <p>
              Locate nearby pharmacies and view their
              address, contact and opening hours.
            </p>

            <span className="service-link">
              Find Pharmacies
              <ArrowRightOutlined />
            </span>

          </div>


          {/* Prescription */}

          <div
            className="service-card"
            onClick={() => navigate("/prescriptions")}
          >

            <div className="service-icon navy">
              <FileTextOutlined />
            </div>

            <h3>Prescription Manager</h3>

            <p>
              Upload and securely manage your digital
              prescriptions from your account.
            </p>

            <span className="service-link">
              Manage Prescriptions
              <ArrowRightOutlined />
            </span>

          </div>

        </div>

      </section>


      {/* ================= PRESCRIPTION BANNER ================= */}

      <section className="prescription-banner">

        <div className="prescription-icon">
          <FileTextOutlined />
        </div>

        <div className="prescription-content">

          <span className="banner-label">
            PRESCRIPTION MANAGEMENT
          </span>

          <h2>
            Keep your prescriptions
            <br />
            safe and accessible.
          </h2>

          <p>
            Upload your prescription documents and access them
            whenever you need them.
          </p>

        </div>

        <Button
          size="large"
          onClick={() => navigate("/prescriptions")}
        >
          Upload Prescription
          <ArrowRightOutlined />
        </Button>

      </section>


      {/* ================= WHY MEDMATCH ================= */}

      <section className="trust-section">

        <div className="trust-heading">

          <span className="section-label">
            WHY MEDMATCH
          </span>

          <h2>
            Healthcare you can
            <br />
            rely on.
          </h2>

        </div>


        <div className="trust-items">

          <div className="trust-item">

            <div className="trust-number">
              01
            </div>

            <div>
              <h3>Simple</h3>

              <p>
                Find medicines and healthcare services
                without unnecessary complexity.
              </p>
            </div>

          </div>


          <div className="trust-item">

            <div className="trust-number">
              02
            </div>

            <div>
              <h3>Secure</h3>

              <p>
                Your prescriptions and personal information
                stay protected within your account.
              </p>
            </div>

          </div>


          <div className="trust-item">

            <div className="trust-number">
              03
            </div>

            <div>
              <h3>Connected</h3>

              <p>
                Medicines, interactions, pharmacies and
                prescriptions work together in one platform.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="bottom-cta">

        <div>

          <span>
            YOUR HEALTH JOURNEY STARTS HERE
          </span>

          <h2>
            Smarter healthcare.
            <br />
            Better decisions.
          </h2>

        </div>

        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/medicines")}
        >
          Explore MedMatch
          <ArrowRightOutlined />
        </Button>

      </section>

    </div>
  );
}

export default Dashboard;
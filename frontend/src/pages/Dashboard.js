// // import React from "react";
// // import { Card, Row, Col, Button, Typography } from "antd";
// // import {
// //   SearchOutlined,
// //   SafetyOutlined,
// //   EnvironmentOutlined,
// //   FileTextOutlined,
// // } from "@ant-design/icons";
// // import { useNavigate } from "react-router-dom";

// // const { Title, Paragraph } = Typography;

// // function Dashboard() {
// //   const navigate = useNavigate();

// //   return (
// //     <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      
// //       {/* Hero Section */}
// //       <div
// //         style={{
// //           textAlign: "center",
// //           padding: "60px 20px 40px",
// //         }}
// //       >
// //         <Title level={1}>
// //           Welcome to MedMatch
// //         </Title>

// //         <Paragraph
// //           style={{
// //             fontSize: "18px",
// //             color: "#666",
// //             maxWidth: "700px",
// //             margin: "0 auto",
// //           }}
// //         >
// //           Your smart healthcare companion for finding medicines,
// //           checking drug interactions, locating pharmacies, and
// //           managing prescriptions.
// //         </Paragraph>

// //         <div style={{ marginTop: "30px" }}>
// //           <Button
// //             type="primary"
// //             size="large"
// //             icon={<SearchOutlined />}
// //             onClick={() => navigate("/medicines")}
// //             style={{ marginRight: "12px" }}
// //           >
// //             Search Medicines
// //           </Button>

// //           <Button
// //             size="large"
// //             icon={<SafetyOutlined />}
// //             onClick={() => navigate("/interactions")}
// //           >
// //             Check Interactions
// //           </Button>
// //         </div>
// //       </div>

// //       {/* Features */}
// //       <Row gutter={[24, 24]}>
        
// //         {/* Medicine Search */}
// //         <Col xs={24} sm={12} lg={6}>
// //           <Card
// //             hoverable
// //             style={{ height: "100%" }}
// //             cover={
// //               <div
// //                 style={{
// //                   fontSize: "40px",
// //                   textAlign: "center",
// //                   padding: "25px 0 10px",
// //                 }}
// //               >
// //                 <SearchOutlined />
// //               </div>
// //             }
// //           >
// //             <Card.Meta
// //               title="Medicine Search"
// //               description="Search medicines by name or generic name and view detailed information."
// //             />
// //           </Card>
// //         </Col>

// //         {/* Interaction Checker */}
// //         <Col xs={24} sm={12} lg={6}>
// //           <Card
// //             hoverable
// //             style={{ height: "100%" }}
// //             cover={
// //               <div
// //                 style={{
// //                   fontSize: "40px",
// //                   textAlign: "center",
// //                   padding: "25px 0 10px",
// //                 }}
// //               >
// //                 <SafetyOutlined />
// //               </div>
// //             }
// //           >
// //             <Card.Meta
// //               title="Interaction Checker"
// //               description="Check whether multiple medicines may interact with each other."
// //             />
// //           </Card>
// //         </Col>

// //         {/* Pharmacy Locator */}
// //         <Col xs={24} sm={12} lg={6}>
// //           <Card
// //             hoverable
// //             style={{ height: "100%" }}
// //             cover={
// //               <div
// //                 style={{
// //                   fontSize: "40px",
// //                   textAlign: "center",
// //                   padding: "25px 0 10px",
// //                 }}
// //               >
// //                 <EnvironmentOutlined />
// //               </div>
// //             }
// //           >
// //             <Card.Meta
// //               title="Pharmacy Locator"
// //               description="Find pharmacies and locate them easily using the map."
// //             />
// //           </Card>
// //         </Col>

// //         {/* Prescription Management */}
// //         <Col xs={24} sm={12} lg={6}>
// //           <Card
// //             hoverable
// //             style={{ height: "100%" }}
// //             cover={
// //               <div
// //                 style={{
// //                   fontSize: "40px",
// //                   textAlign: "center",
// //                   padding: "25px 0 10px",
// //                 }}
// //               >
// //                 <FileTextOutlined />
// //               </div>
// //             }
// //           >
// //             <Card.Meta
// //               title="Prescription Management"
// //               description="Upload and manage your digital prescriptions securely."
// //             />
// //           </Card>
// //         </Col>

// //       </Row>
// //     </div>
// //   );
// // }

// // export default Dashboard;

// import React from "react";
// import {
//   Card,
//   Row,
//   Col,
//   Button,
//   Typography,
//   Space,
// } from "antd";

// import {
//   SearchOutlined,
//   SafetyOutlined,
//   EnvironmentOutlined,
//   FileTextOutlined,
//   ArrowRightOutlined,
//   MedicineBoxOutlined,
//   CheckCircleOutlined,
// } from "@ant-design/icons";

// import { useNavigate } from "react-router-dom";

// import "./Dashboard.css";

// const { Title, Paragraph, Text } = Typography;

// function Dashboard() {
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: <SearchOutlined />,
//       title: "Medicine Search",
//       description:
//         "Search medicines by name or generic name and view important medicine information.",
//       button: "Explore Medicines",
//       path: "/medicines",
//     },
//     {
//       icon: <SafetyOutlined />,
//       title: "Drug Interaction Checker",
//       description:
//         "Check whether two or more medicines may interact with each other.",
//       button: "Check Interactions",
//       path: "/interactions",
//     },
//     {
//       icon: <EnvironmentOutlined />,
//       title: "Pharmacy Locator",
//       description:
//         "Find nearby pharmacies and view their locations directly on the map.",
//       button: "Find Pharmacies",
//       path: "/pharmacies",
//     },
//     {
//       icon: <FileTextOutlined />,
//       title: "Prescription Management",
//       description:
//         "Upload, view and securely manage your digital prescriptions.",
//       button: "My Prescriptions",
//       path: "/prescriptions",
//     },
//   ];

//   return (
//     <div className="dashboard">

//       {/* ================= HERO ================= */}

//       <section className="hero-section">

//         <div className="hero-content">

//           <div className="hero-badge">
//             <MedicineBoxOutlined />
//             <span>Smart Healthcare Companion</span>
//           </div>

//           <Title className="hero-title">
//             Your Health.
//             <br />
//             <span>Made Simpler.</span>
//           </Title>

//           <Paragraph className="hero-description">
//             MedMatch helps you search medicines, check drug interactions,
//             locate pharmacies, and manage your prescriptions — all in one
//             secure platform.
//           </Paragraph>

//           <Space
//             size="middle"
//             wrap
//             className="hero-buttons"
//           >
//             <Button
//               type="primary"
//               size="large"
//               icon={<SearchOutlined />}
//               onClick={() => navigate("/medicines")}
//             >
//               Search Medicines
//             </Button>

//             <Button
//               size="large"
//               icon={<SafetyOutlined />}
//               onClick={() => navigate("/interactions")}
//             >
//               Check Interactions
//             </Button>
//           </Space>

//         </div>

//         {/* Hero visual */}

//         <div className="hero-visual">

//           <div className="medical-circle">

//             <MedicineBoxOutlined />

//           </div>

//           <div className="floating-card floating-card-one">
//             <CheckCircleOutlined />
//             <div>
//               <strong>Safe & Simple</strong>
//               <span>Healthcare tools</span>
//             </div>
//           </div>

//           <div className="floating-card floating-card-two">
//             <SafetyOutlined />
//             <div>
//               <strong>Drug Safety</strong>
//               <span>Interaction checking</span>
//             </div>
//           </div>

//         </div>

//       </section>


//       {/* ================= FEATURES ================= */}

//       <section className="features-section">

//         <div className="section-heading">

//           <Text className="section-label">
//             EVERYTHING IN ONE PLACE
//           </Text>

//           <Title level={2}>
//             Healthcare tools designed for you
//           </Title>

//           <Paragraph>
//             Access the essential features you need to manage your
//             medicines and prescriptions more easily.
//           </Paragraph>

//         </div>


//         <Row gutter={[24, 24]}>

//           {features.map((feature) => (

//             <Col
//               xs={24}
//               sm={12}
//               lg={6}
//               key={feature.title}
//             >

//               <Card
//                 className="feature-card"
//                 hoverable
//                 onClick={() => navigate(feature.path)}
//               >

//                 <div className="feature-icon">
//                   {feature.icon}
//                 </div>

//                 <Title level={4}>
//                   {feature.title}
//                 </Title>

//                 <Paragraph>
//                   {feature.description}
//                 </Paragraph>

//                 <Button
//                   type="link"
//                   className="feature-button"
//                   onClick={(event) => {
//                     event.stopPropagation();
//                     navigate(feature.path);
//                   }}
//                 >
//                   {feature.button}
//                   <ArrowRightOutlined />
//                 </Button>

//               </Card>

//             </Col>

//           ))}

//         </Row>

//       </section>


//       {/* ================= TRUST SECTION ================= */}

//       <section className="trust-section">

//         <div className="trust-content">

//           <div className="trust-icon">
//             <SafetyOutlined />
//           </div>

//           <div>

//             <Title level={3}>
//               Designed with healthcare in mind
//             </Title>

//             <Paragraph>
//               MedMatch brings medicine information, interaction checking,
//               pharmacy locations and prescription management together
//               in one convenient platform.
//             </Paragraph>

//           </div>

//         </div>

//         <div className="trust-points">

//           <div>
//             <CheckCircleOutlined />
//             <span>Easy to use</span>
//           </div>

//           <div>
//             <CheckCircleOutlined />
//             <span>Secure access</span>
//           </div>

//           <div>
//             <CheckCircleOutlined />
//             <span>All-in-one platform</span>
//           </div>

//         </div>

//       </section>

//     </div>
//   );
// }

// export default Dashboard;
import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import {
  SearchOutlined,
  SafetyOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

const { Title, Paragraph } = Typography;

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* =========================
          HERO SECTION
      ========================= */}

      <div className="dashboard-hero">

        <Title level={1}>
          Welcome to MedMatch
        </Title>

        <Paragraph className="dashboard-subtitle">
          Your smart healthcare companion for finding medicines,
          checking drug interactions, locating pharmacies, and
          managing prescriptions.
        </Paragraph>

        <div className="dashboard-actions">

          <Button
            type="primary"
            size="large"
            icon={<SearchOutlined />}
            onClick={() => navigate("/medicines")}
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


      {/* =========================
          FEATURE CARDS
      ========================= */}

      <div className="dashboard-features">

        <Row gutter={[24, 24]}>

          {/* Medicine Search */}

          <Col xs={24} sm={12} lg={6}>

            <Card
              hoverable
              className="dashboard-card"
              onClick={() => navigate("/medicines")}
            >

              <div className="dashboard-card-icon">
                <SearchOutlined />
              </div>

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
              className="dashboard-card"
              onClick={() => navigate("/interactions")}
            >

              <div className="dashboard-card-icon">
                <SafetyOutlined />
              </div>

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
              className="dashboard-card"
              onClick={() => navigate("/pharmacies")}
            >

              <div className="dashboard-card-icon">
                <EnvironmentOutlined />
              </div>

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
              className="dashboard-card"
              onClick={() => navigate("/prescriptions")}
            >

              <div className="dashboard-card-icon">
                <FileTextOutlined />
              </div>

              <Card.Meta
                title="Prescription Management"
                description="Upload and manage your digital prescriptions securely."
              />

            </Card>

          </Col>

        </Row>

      </div>

    </div>
  );
}

export default Dashboard; 
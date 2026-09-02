import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MedicineSearch from "./pages/MedicineSearch";
import MedicineDetails from "./pages/MedicineDetails";
import InteractionChecker from "./pages/InteractionChecker";
import PharmacyLocator from "./pages/PharmacyLocator";
import Prescriptions from "./pages/Prescriptions";
import Favorites from "./pages/Favorites";
import AdminDashboard from "./pages/AdminDashboard";

import { useSelector } from "react-redux";

const { Content } = Layout;

function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar />

        <Content style={{ padding: "24px 40px" }}>
          <Routes>

            {/* Public */}
            <Route path="/" element={<Dashboard />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
              path="/medicines"
              element={<MedicineSearch />}
            />

            <Route
              path="/medicines/:id"
              element={<MedicineDetails />}
            />

            <Route
              path="/interactions"
              element={<InteractionChecker />}
            />

            <Route
              path="/pharmacies"
              element={<PharmacyLocator />}
            />

            {/* Logged-in users */}
            <Route
              path="/prescriptions"
              element={
                <ProtectedRoute>
                  <Prescriptions />
                </ProtectedRoute>
              }
            />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />

            {/* Admin only */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* Unknown URL */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>
        </Content>

        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
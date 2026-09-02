import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import { useSelector } from "react-redux";

// Pages
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

const { Content } = Layout;


// ===============================
// Protected Route
// ===============================
function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// ===============================
// Admin Route
// ===============================
function AdminRoute({ children }) {
  const { token, user, role } = useSelector(
    (state) => state.auth
  );

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check admin role
  if (role !== "ADMIN" && user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}


// ===============================
// Main App
// ===============================
function App() {
  return (
    <BrowserRouter>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Content
          style={{
            padding: "24px 40px",
          }}
        >
          <Routes>

            {/* =========================
                Dashboard
            ========================== */}
            <Route
              path="/"
              element={<Dashboard />}
            />


            {/* =========================
                Authentication
            ========================== */}
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />


            {/* =========================
                Medicines
            ========================== */}
            <Route
              path="/medicines"
              element={<MedicineSearch />}
            />

            <Route
              path="/medicines/:id"
              element={<MedicineDetails />}
            />


            {/* =========================
                Interaction Checker
            ========================== */}
            <Route
              path="/interactions"
              element={<InteractionChecker />}
            />


            {/* =========================
                Pharmacy Locator
            ========================== */}
            <Route
              path="/pharmacies"
              element={<PharmacyLocator />}
            />


            {/* =========================
                Prescriptions
            ========================== */}
            <Route
              path="/prescriptions"
              element={
                <ProtectedRoute>
                  <Prescriptions />
                </ProtectedRoute>
              }
            />


            {/* =========================
                Favorites
            ========================== */}
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />


            {/* =========================
                Admin Dashboard
            ========================== */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />


            {/* =========================
                Unknown URL
            ========================== */}
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
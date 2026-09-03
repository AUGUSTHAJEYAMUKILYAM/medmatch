import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Layout } from "antd";
import { useSelector } from "react-redux";

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

const { Content } = Layout;

function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const { token, role, user } = useSelector(
    (state) => state.auth
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin =
    role === "ADMIN" || user?.role === "ADMIN";

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar />

        <Content
          style={{
            padding: "30px 40px",
            minHeight: "calc(100vh - 134px)",
          }}
        >
          <Routes>

            {/* ================= PUBLIC ROUTES ================= */}

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

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

            {/* ================= PROTECTED ROUTES ================= */}

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

            {/* ================= ADMIN ROUTE ================= */}

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* ================= UNKNOWN URL ================= */}

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
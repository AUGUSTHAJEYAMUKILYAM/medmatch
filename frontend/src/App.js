import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import MedicineSearch from "./pages/MedicineSearch";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <h1>MedMatch Test</h1>

        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/medicines"
            element={<MedicineSearch />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
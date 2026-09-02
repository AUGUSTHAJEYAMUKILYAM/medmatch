import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Dashboard from "./pages/Dashboard";
import MedicineSearch from "./pages/MedicineSearch";

function App() {
  return (
    <BrowserRouter>
      <div>
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
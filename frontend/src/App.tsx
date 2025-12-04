// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import OaklyInventory from "./pages/OaklyInventory";
import OaklyOrders from "./pages/OaklyOrders";
import OaklyContractors from "./pages/OaklyContractors";
import OaklyAnalytics from "./pages/OaklyAnalytics";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />

          {/* Protected dashboard routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<OaklyInventory />} />
            <Route path="orders" element={<OaklyOrders />} />
            <Route path="contractors" element={<OaklyContractors />} />
            <Route path="analytics" element={<OaklyAnalytics />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

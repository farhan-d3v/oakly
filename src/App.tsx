import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import OaklyInventory from "./pages/OaklyInventory";
import OaklyOrders from "./pages/OaklyOrders";
import OaklyContractors from "./pages/OaklyContractors";
import OaklyAnalytics from "./pages/OaklyAnalytics";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<OaklyInventory />} />
          <Route path="/orders" element={<OaklyOrders />} />
          <Route path="/contractors" element={<OaklyContractors />} />
          <Route path="/analytics" element={<OaklyAnalytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

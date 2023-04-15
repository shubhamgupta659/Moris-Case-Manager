import { Routes, Route } from "react-router-dom";
import Home from "../../Pages/Home";
import Dashboard from "../../Pages/Dashboard";
import ApplyTaxIncentiveDash from "../../Pages/TaxIncentiveDash";
import FIDash from "../../Pages/FI/dash";
import FIApp from "../../Pages/FI/fiApp";
import OICDash from "../../Pages/OIC/dash";
import ViewAppAction from "../../Pages/OIC/view";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/applyNewIncentive" element={<ApplyTaxIncentiveDash />}></Route>
      <Route path="/fi" element={<FIDash />}></Route>
      <Route path="/oic" element={<OICDash />}></Route>
      <Route path="/app/:action/:id" element={<FIApp />}></Route>
      <Route path="/view/:id" element={<ViewAppAction />}></Route>
    </Routes>
  );
}
export default AppRoutes;
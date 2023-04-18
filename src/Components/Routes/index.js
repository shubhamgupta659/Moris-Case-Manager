import { Routes, Route } from "react-router-dom";
import Home from "../../Pages/Home";
import Dashboard from "../../Pages/Dashboard";
import ApplyTaxIncentiveDash from "../../Pages/TaxIncentiveDash";
import Stage1Dash from "../../Pages/Stage1/dash";
import Stage1App from "../../Pages/Stage1/fiApp";
import Stage2Dash from "../../Pages/Stage2/dash";
import ViewAppAction from "../../Pages/CaseView/view";
import Stage3Dash from "../../Pages/Stage3/dash";
import Login from "../../Pages/Login/login";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/applyNewIncentive" element={<ApplyTaxIncentiveDash />}></Route>
      <Route path="/stage1" element={<Stage1Dash />}></Route>
      <Route path="/stage2" element={<Stage2Dash />}></Route>
      <Route path="/stage3" element={<Stage3Dash />}></Route>
      <Route path="/app/:action/:id" element={<Stage1App />}></Route>
      <Route path="/view/:stage/:id" element={<ViewAppAction />}></Route>
    </Routes>
  );
}
export default AppRoutes;
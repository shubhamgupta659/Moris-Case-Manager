import { Routes, Route } from "react-router-dom";
import Home from "../../Pages/Home";
import Dashboard from "../../Pages/Dashboard";
import ApplyTaxIncentiveDash from "../../Pages/TaxIncentiveDash";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/applyNewIncentive" element ={<ApplyTaxIncentiveDash />}></Route>
    </Routes>
  );
}
export default AppRoutes;
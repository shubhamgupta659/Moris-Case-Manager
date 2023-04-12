import { useLocation } from "react-router-dom";
import MultiStepForm from "../MultiStepForm";

function ApplyTaxIncentiveDash() {
    const location = useLocation();
    return (
        <div className="ti-main-container">
            <div className="ti-title">
                <h4>Apply New Tax Incentive</h4>
            </div>
            <MultiStepForm />
        </div>);
}

export default ApplyTaxIncentiveDash;
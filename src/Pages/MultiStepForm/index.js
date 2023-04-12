
import React, { useState, useRef } from 'react';
import { Steps, Button, Card } from 'antd';
import FormStep1 from './Step1';
import FormStep2 from './Step2';
import FormStep3 from './Step3';
import FormStep4 from './Step4';
import FormStep5 from './Step5';

const { Step } = Steps;

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef();
  const [formData, setFormData] = useState({
    step1Data: {},
    step2Data: {},
    step3Data: {},
    step4Data: {},
    step5Data: {},
  });

  const handleSaveDraft = () => {
    formRef.current.validateFields().then((values) => {
      setFormData({ ...formData, [`step${currentStep + 1}Data`]: values });
    });
  };

  const handleNext = () => {
    formRef.current.validateFields().then((values) => {
      setFormData({ ...formData, [`step${currentStep + 1}Data`]: values });
      setCurrentStep(currentStep + 1);
    });
    
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFormSubmit = () => {
    formRef.current.validateFields().then((values) => {
      setFormData({ ...formData, [`step${currentStep + 1}Data`]: values });
    });

  };

  return (
    <div className="multi-step-form">
      <Steps current={currentStep} style={{ marginBottom: 16 }}>
        <Step title="Institutional Info" />
        <Step title="Validation" />
        <Step title="Section I" />
        <Step title="Section II" />
        <Step title="Section III" />
      </Steps>
      <Card>
        {currentStep === 0 && (
          <FormStep1 formData={formData} setFormData={setFormData} formRef={formRef} />
        )}
        {currentStep === 1 && (
          <FormStep2 formData={formData} setFormData={setFormData} formRef={formRef} />
        )}
        {currentStep === 2 && (
          <FormStep3 formData={formData} setFormData={setFormData} formRef={formRef} />
        )}
        {currentStep === 3 && (
          <FormStep4 formData={formData} setFormData={setFormData} formRef={formRef} />
        )}
        {currentStep === 4 && (
          <FormStep5 formData={formData} setFormData={setFormData} formRef={formRef} />
        )}
        <div style={{
          display: 'flex',
          marginTop: '24px',
          justifyContent: 'space-between'
        }}>
          {currentStep > 0 && (
            <Button style={{ marginRight: 8 }} onClick={handlePrev}>
              Previous
            </Button>
          )}
          <Button style={{ marginRight: 8 }} onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          {currentStep < 4 && (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {currentStep === 4 && (
            <Button type="primary" onClick={handleFormSubmit}>
              Submit
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MultiStepForm;


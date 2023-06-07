import React, { useState, useEffect } from "react";
import StepOne from "./component/StepOne";
import StepTwo from "./component/StepTwo";
import StepThree from "./component/StepThree";
import Final from "./component/Final";



const App = () => {
  const initialStep = 1; 

  const [step, setStep] = useState(() => {
    const storedStep = localStorage.getItem("currentStep");
    return storedStep ? parseInt(storedStep, 10) : initialStep;
  });
  const [formData, setFormData] = useState({});
 

  useEffect(() => {
    localStorage.setItem("currentStep", step.toString());
  }, [step]);

  const handleFormData = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const resetForm = () => {
    setStep(initialStep);
    setFormData({});
    localStorage.removeItem("currentStep");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("collegeName");
    localStorage.removeItem("degree");
    localStorage.removeItem("year");
    localStorage.removeItem("skills");
  };

  return (
    <div>
      {step === 1 && (
        <StepOne
          nextStep={nextStep}
          handleFormData={handleFormData}
          values={formData}
        />
      )}
      {step === 2 && (
        <StepTwo
          nextStep={nextStep}
          prevStep={prevStep}
          handleFormData={handleFormData}
          values={formData}
        />
      )}
      {step === 3 && (
        <StepThree
          nextStep={nextStep}
          prevStep={prevStep}
          handleFormData={handleFormData}
          values={formData}
        />
      )}
      {step === 4 && (
        <Final
          values={formData}
          resetForm={resetForm}
        />
      )}
    </div>
  );
};

export default App;

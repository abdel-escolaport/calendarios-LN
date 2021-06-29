import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { useSelector } from "react-redux";

import "./Stepper.css";

export default function StepperComponent() {
  const steps = ["Prácticas", "Teoria", "Extras", "Pago"];

  const activeStep = useSelector((state) => state.stepper.activeStep);
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

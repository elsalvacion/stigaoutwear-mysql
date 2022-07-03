import React from "react";
import Stepper from "react-stepper-js";
import "react-stepper-js/dist/index.css";
import colors from "../utils/Colors";
const ShoppingStepper = ({ currentStep, lables }) => {
  return (
    <>
      <Stepper
        color={colors.main}
        fontSize="12px"
        fontColor={colors.main}
        steps={lables}
        padding={3}
        currentStep={currentStep}
      />
      <br />
    </>
  );
};

export default ShoppingStepper;

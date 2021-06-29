import { createSlice } from "@reduxjs/toolkit";

const stepperSlice = createSlice({
  name: "stepper",
  initialState: {
    activeStep: 0,
  },
  reducers: {
    handleNextStep(state, action) {
      state.activeStep = state.activeStep + 1;
    },
    handleBackStep(state, action) {
      state.activeStep = state.activeStep - 1;
    },
    setActiveStep(state, action) {
      state.activeStep = action.payload;
    },
  },
});

export const stepperActions = stepperSlice.actions;

export default stepperSlice;

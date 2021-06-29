import { configureStore } from "@reduxjs/toolkit";

import dataSlice from "./data-slice";
import toggleSlice from "./toggle-slice";
import screensSlice from "./screens-slice";
import stepperSlice from "./stepper-slice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    toggle: toggleSlice.reducer,
    screens: screensSlice.reducer,
    stepper: stepperSlice.reducer,
  },
});

export default store;

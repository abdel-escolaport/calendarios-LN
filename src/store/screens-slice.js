import { createSlice } from "@reduxjs/toolkit";

const screensSlice = createSlice({
  name: "screens",
  initialState: {
    mainScreen: "practicas",
    tipo: "",
  },
  reducers: {
    setMainScreen(state, action) {
      state.mainScreen = action.payload;
    },
    setTipo(state, action) {
      state.tipo = action.payload;
    },
  },
});

export const screenActions = screensSlice.actions;

export default screensSlice;

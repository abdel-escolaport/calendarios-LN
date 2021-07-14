import { createSlice } from "@reduxjs/toolkit";

const screensSlice = createSlice({
  name: "screens",
  initialState: {
    mainScreen: "practicas",
    tipo: "",
    scrollDivPracticas: "",
    scrollDivTeoria: "",
  },
  reducers: {
    setMainScreen(state, action) {
      state.mainScreen = action.payload;
    },
    setTipo(state, action) {
      state.tipo = action.payload;
    },
    setScrollDivPracticas(state, action) {
      state.scrollDivPracticas = action.payload;
    },
    setScrollDivTeoria(state, action) {
      state.scrollDivTeoria = action.payload;
    },
  },
});

export const screenActions = screensSlice.actions;

export default screensSlice;

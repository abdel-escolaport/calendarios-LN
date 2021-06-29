import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    practicas: {
      persons: 1,
      practica: {},
    },
    teoria: {
      persons: 1,
      fecha: {},
    },
  },
  reducers: {
    applyData(state, action) {
      state.data = action.payload;
    },
    applyPracticas(state, action) {
      state.practicas.persons = action.payload.persons;
      state.practicas.fecha = action.payload.practica;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;

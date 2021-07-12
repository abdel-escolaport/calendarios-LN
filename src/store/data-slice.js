import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    dataPracticas: {
      name: "",
      value: {
        entresemana: [],
        findesemana: [],
      },
    },
    dataTeoria: [],
    fechaDespues: null,
    elementoSeleccionadoEnPracticas: "",
    elementoSeleccionadoEnTeoria: "",
    practicas: {
      tipo: "practicas",
      periodo: "entre_semana",
      personas: 1,
      data: {},
    },
    teoria: {
      tipo: "teoria",
      personas: 1,
      data: {},
    },
    extras: [],
  },
  reducers: {
    applyDataPracticas(state, action) {
      state.dataPracticas = action.payload;
    },
    applyDataTeoria(state, action) {
      state.dataTeoria = action.payload;
    },
    applyPracticasData(state, action) {
      state.practicasentresemana = action.payload.entresemana;
      state.practicasfindesamana = action.payload.findesemana;
    },
    applyPracticas(state, action) {
      state.practicas.periodo = action.payload.periodo;
      state.practicas.personas = action.payload.personas;
      state.practicas.data = action.payload.data;
    },
    applyTeoria(state, action) {
      state.teoria.personas = action.payload.personas;
      state.teoria.data = action.payload.data;
    },
    applyExtras(state, action) {
      state.extras = action.payload;
    },
    setFechaDespues(state, action) {
      state.fechaDespues = action.payload;
    },
    elementoSeleccionadoEnPracticas(state, action) {
      state.elementoSeleccionadoEnPracticas = action.payload;
    },
    elementoSeleccionadoEnTeoria(state, action) {
      state.elementoSeleccionadoEnTeoria = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;

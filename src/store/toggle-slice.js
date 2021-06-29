import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    disable: false,
    showModal: false,
    disableFechaDespues: false,
    disableElements: false,
    showVolverButton: true,
  },
  reducers: {
    disableClass(state, action) {
      state.disable = action.payload;
    },
    toggleModal(state, action) {
      state.showModal = !state.showModal;
    },
    disableFechaDespues(state, action) {
      state.disableFechaDespues = action.payload;
    },
    disableElements(state, action) {
      state.disableElements = action.payload;
    },
    setShowVolverButton(state, action) {
      state.showVolverButton = action.payload;
    },
  },
});

export const toggleActions = toggleSlice.actions;

export default toggleSlice;

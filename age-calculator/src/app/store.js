import { configureStore } from "@reduxjs/toolkit";
import calculateReducer from "../features/calculate/calculateSlice";

export const store = configureStore({
  reducer: {
    calculateReducer: calculateReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../reducers/ProductReducer";

export const store = configureStore({
    reducer: {
      product: ProductReducer,
    },
  });
import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from './cart/slice';
import pizzaSlice from "./slices/pizzaSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizza: pizzaSlice
    },
  })

export type RootState = ReturnType<typeof store.getState>
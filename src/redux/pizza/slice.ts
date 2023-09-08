import { createSlice } from "@reduxjs/toolkit";
import { PizzaState, StatusValue } from "./types";
import { fetchPizzas } from "./asyncRequest";

const initialState: PizzaState = {
    pizzasArr: [],
    pageCount: 1,
    status: StatusValue.LOADING
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzasArr(state, action){
            state.pizzasArr = action.payload;
        },
        setPageCount(state,action){
            Number((action.payload.length/8).toFixed()) > 0 ? state.pageCount = Number((action.payload.length/8).toFixed()) : state.pageCount = 1;
        }
    }, 
    extraReducers(builder) {
        builder
          .addCase(fetchPizzas.pending, (state) => {
                state.status = StatusValue.LOADING;
                state.pizzasArr = [];
          })
          .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.pizzasArr = action.payload;
                state.status = StatusValue.SUCCESS;
          })
          .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = StatusValue.ERROR;
                state.pizzasArr = [];
          })
      }
})

export const {setPizzasArr, setPageCount} = pizzaSlice.actions;

export default pizzaSlice.reducer;
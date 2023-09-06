import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";

type Pizza = {
    id: number, title: string, imageUrl: string, types: number[], sizes: number[], price: number
}

export enum StatusValue {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaState {
    pizzasArr: Pizza[];
    pageCount: number;
    status: StatusValue;
}

const initialState: PizzaState = {
    pizzasArr: [],
    pageCount: 1,
    status: StatusValue.LOADING
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzas', async (params)=>{
    const {search, category, limit, page, sort, order} = params;
    const {data} = await axios.get<Pizza[]>(
        `https://64e73e4cb0fd9648b78f9b4b.mockapi.io/items?${
          search + category + limit + page + sort + order
        }`
      );
    return data;
})

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

export const selectPizzaData = ((state: RootState) => state.pizza);

export const {setPizzasArr, setPageCount} = pizzaSlice.actions;

export default pizzaSlice.reducer;
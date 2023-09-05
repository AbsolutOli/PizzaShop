import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";

type Pizza = {
    id: number, title: string, imageUrl: string, types: number[], sizes: number[], price: number
}

interface PizzaState {
    pizzasArr: Pizza[];
    pageCount: number;
    status: 'loading' | 'success' | 'error';
}

const initialState: PizzaState = {
    pizzasArr: [],
    pageCount: 1,
    status: 'loading'
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params)=>{
    const {search, category, limit, page, sort, order} = params;
    const {data} = await axios.get(
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
            ((action.payload.length/8).toFixed()) > 0 ? state.pageCount = Number((action.payload.length/8).toFixed()) : state.pageCount = 1;
        }
    }, 
    extraReducers: {
        [fetchPizzas.pending]:(state)=>{
            state.status = 'loading';
            state.pizzasArr = [];
        },
        [fetchPizzas.fulfilled]:(state, action)=>{
            state.pizzasArr = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]:(state)=>{
            state.status = 'error';
            state.pizzasArr = [];
        }
    }
})

export const selectPizzaData = ((state: RootState) => state.pizza);

export const {setPizzasArr, setPageCount} = pizzaSlice.actions;

export default pizzaSlice.reducer;
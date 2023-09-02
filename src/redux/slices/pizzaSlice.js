import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
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
            console.log('pending')
            state.pizzasArr = [];
        },
        [fetchPizzas.fulfilled]:(state, action)=>{
            state.pizzasArr = action.payload;
            console.log('success')
            state.status = 'success';
        },
        [fetchPizzas.rejected]:(state)=>{
            state.status = 'error';
            console.log('error')
            state.pizzasArr = [];
        }
    }
})

export const {setPizzasArr, setPageCount} = pizzaSlice.actions;

export default pizzaSlice.reducer;
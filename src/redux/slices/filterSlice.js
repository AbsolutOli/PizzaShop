import { createSlice } from "@reduxjs/toolkit";

const initialState = {
categoryId: 0, 
sort: {
    name: "популярности",
    parameter: "rating",
  },
order: false,
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action){
            state.categoryId = action.payload;
        },
        setSortType(state, action){
            state.sort = action.payload;
        },
        setOrder(state, action){
            state.order = action.payload;
        }
    }
})
export const {setCategoryId, setSortType, setOrder} = filterSlice.actions;

export default filterSlice.reducer;
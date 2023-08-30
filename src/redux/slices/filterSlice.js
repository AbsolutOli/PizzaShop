import { createSlice } from "@reduxjs/toolkit";

const initialState = {
categoryId: 0, 
sort: {
    name: "популярности",
    parameter: "rating",
  },
order: false,
page: 1
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
        },
        setPage(state, action){
            state.page = action.payload;
        },
        setFilters(state, action){
            state.categoryId = Number(action.payload.activeCategory);
            state.sort = action.payload.sort;
            state.order = action.payload.order;
            state.page = Number(action.payload.activePage);
        }
    }
})
export const {setCategoryId, setSortType, setOrder, setPage, setFilters} = filterSlice.actions;

export default filterSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Sort = {
    name: string;
    parameter: "rating" | "price" | "title";
}

interface FilterState {
categoryId: number; 
sort: Sort;
order: boolean;
page: number;
searchValue: string;
}

const initialState: FilterState = {
categoryId: 0, 
sort: {
    name: "популярности",
    parameter: "rating",
  },
order: false,
page: 1,
searchValue: ""
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
        },
        setSearchValue(state, action){
            state.searchValue = action.payload;
        }
    }
})

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterPage = (state: RootState) => state.filter.page;

export const {setCategoryId, setSortType, setOrder, setPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;
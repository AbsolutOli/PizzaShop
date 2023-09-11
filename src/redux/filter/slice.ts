import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterState, SortFilterState } from "./types";

const initialState: FilterState = {
    activeCategory: 0, 
    sort: {
        name: "популярности",
        parameter: "rating",
      },
    order: false,
    activePage: 1,
    searchValue: ""
    };
    
    const filterSlice = createSlice({
        name: 'filters',
        initialState,
        reducers: {
            setCategoryId(state, action: PayloadAction<number>){
                state.activeCategory = action.payload;
                state.activePage = 1;
            },
            setSortType(state, action: PayloadAction<SortFilterState>){
                state.sort = action.payload;
            },
            setOrder(state, action: PayloadAction<boolean>){
                state.order = action.payload;
            },
            setPage(state, action: PayloadAction<number>){
                state.activePage = action.payload;
            },
            setFilters(state, action: PayloadAction<FilterState>){
                state.activeCategory = Number(action.payload.activeCategory);
                state.sort = action.payload.sort;
                state.order = action.payload.order;
                state.activePage = Number(action.payload.activePage);
            },
            setSearchValue(state, action: PayloadAction<string>){
                state.searchValue = action.payload;
            }
        }
    })

    export const {setCategoryId, setSortType, setOrder, setPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;
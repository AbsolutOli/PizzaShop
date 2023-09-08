import { RootState } from "../store";

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterPage = (state: RootState) => state.filter.activePage;
export type SortFilterState = {
    name: string;
    parameter: "rating" | "price" | "title";
}

export interface FilterState {
activeCategory: number; 
sort: SortFilterState;
order: boolean;
activePage: number;
searchValue?: string;
}
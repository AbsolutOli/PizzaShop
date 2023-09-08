export type Pizza = {
    id: number, title: string, imageUrl: string, types: number[], sizes: number[], price: number
}

export enum StatusValue {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface PizzaState {
    pizzasArr: Pizza[];
    pageCount: number;
    status: StatusValue;
}

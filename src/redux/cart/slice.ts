import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getDataFromLS } from "../../utils/getDataFromLS";
import { CartSliceItem, CartSliceType } from "./types";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

const {totalPrice, items} = getDataFromLS();

const initialState: CartSliceType = {
    totalPrice,
    items
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartSliceItem>){
            const findItem = state.items.find((item)=>item.id===action.payload.id);

            if(findItem){
                findItem.count++;
            } else{
                state.items.push({...action.payload, count: 1});
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem(state, action: PayloadAction<number>){
            const findItem = state.items.find((item)=>item.id===action.payload);

            if(findItem){
                findItem.count--;
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        deleteItem(state, action: PayloadAction<number>){
            state.items = state.items.filter((item)=>item.id !== action.payload);

            state.totalPrice = calcTotalPrice(state.items);
        },
        clearCart(state){
            state.items = [];
            state.totalPrice = 0;
        }
    }
})

export const {addItem, deleteItem, clearCart, minusItem} = cartSlice.actions;

export default cartSlice.reducer;
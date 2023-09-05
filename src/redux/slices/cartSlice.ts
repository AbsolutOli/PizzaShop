import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";

type CartSliceItem = {
    id: number, title: string, imageUrl: string, type: string, size: string, count: number, price: number
}

interface CartSliceType {
    totalPrice: number;
    items: CartSliceItem[];
}

const initialState: CartSliceType = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action){
            const findItem = state.items.find((item)=>item.id===action.payload.id);

            if(findItem){
                findItem.count++;
            } else{
                state.items.push({...action.payload, count: 1});
            }

            state.totalPrice = state.items.reduce((sum, item)=> { 
                return item.price * item.count + sum
            }, 0)
        },
        minusItem(state, action){
            const findItem = state.items.find((item)=>item.id===action.payload.id);

            if(findItem){
                findItem.count--;
            }
            state.totalPrice = state.items.reduce((sum, item)=> { 
                return item.price * item.count + sum
            }, 0)
        },
        deleteItem(state, action){
            state.items = state.items.filter((item)=>item.id !== action.payload);

            state.totalPrice = state.items.reduce((sum, item)=> { 
                return item.price * item.count + sum
            }, 0)
        },
        clearCart(state){
            state.items = [];
            state.totalPrice = 0;
        }
    }
})

export const selectCart = (state: RootState) => state.cart;
export const selectPizzaData = (id: number) => (state: RootState) =>
state.cart.items.find((item) => item.id === id)

export const {addItem, deleteItem, clearCart, minusItem} = cartSlice.actions;

export default cartSlice.reducer;
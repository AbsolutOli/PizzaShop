import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action){
            state.items.push(action.payload);
        },
        deleteItem(state, action){
            state.items.filter((item)=>item!==action.payload);
        },
        clearCart(state){
            state = [];
        }
    }
})

export const {addItem, deleteItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
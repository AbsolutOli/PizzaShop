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

            findItem.count--;
            state.totalPrice = state.items.reduce((sum, item)=> { 
                return item.price * item.count + sum
            }, 0)
        },
        deleteItem(state, action){
            state.items.filter((item)=>item!==action.payload);
        },
        clearCart(state){
            state.items = [];
        }
    }
})

export const {addItem, deleteItem, clearCart,minusItem} = cartSlice.actions;

export default cartSlice.reducer;
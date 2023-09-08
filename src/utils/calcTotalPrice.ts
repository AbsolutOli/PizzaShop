import { CartSliceItem } from "../redux/slices/cartSlice"

export const calcTotalPrice = (items: CartSliceItem[]) => {
    const totalPrice = items.reduce((sum, item)=> { 
    return item.price * item.count + sum
}, 0);
return totalPrice;
}
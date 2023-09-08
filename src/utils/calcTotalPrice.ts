import { CartSliceItem } from "../redux/cart/types"

export const calcTotalPrice = (items: CartSliceItem[]) => {
    const totalPrice = items.reduce((sum, item)=> { 
    return item.price * item.count + sum
}, 0);
return totalPrice;
}
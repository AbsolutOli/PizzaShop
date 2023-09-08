export type CartSliceItem = {
    id: number, title: string, imageUrl: string, type: string, size: number, count: number, price: number
}

export interface CartSliceType {
    totalPrice: number;
    items: CartSliceItem[];
}
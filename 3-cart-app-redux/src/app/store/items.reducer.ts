import { createReducer, on, State } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { add, remove, total } from "./items.actions";

export interface ItemsState {
    items: CartItem[];
    total: number
}

export const initialState: ItemsState = {
    items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
    total: 0,
}


export const itemReducer = createReducer(
    initialState,

    // Add a product to the cart
    on(add, (state, { product }) => {
        const hasItem = state.items.find((item: CartItem) => item.product.id === product.id);
        if (hasItem) {
            return {
                items: state.items.map((item: CartItem) => {
                    if (item.product.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item;
                }),
                total: state.total
            }
        } else {
            return {
                items: [...state.items, { product: { ...product }, quantity: 1 }],
                total: state.total
            };
        }
    }),

    // Remove a product from the cart
    on(remove, (state, { id }) => {
        return {
            items: state.items.filter(item => item.product.id !== id),
            total: state.total
        }

    }),

    // Calculate the total price of the cart
    on(total, state =>{
        return {
            items: state.items,
            total: state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
        }
    })

);
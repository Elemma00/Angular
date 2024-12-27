import { createReducer, on } from "@ngrx/store"
import { load } from "./products.actions"
import { Product } from "../models/product";

export interface ProductsState {
    products: Product[];
}

const products: Product[] = [];


const initialState: ProductsState = {
    products: products
}

export const productsReducer = createReducer(
    initialState,
    on(load, (state, { products }) => ({ products: [...products] }))
)
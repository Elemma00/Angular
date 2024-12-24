import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset } from "./items.action";

export const initialState = 0;

/**
 * Reducer que se encarga de actualizar el estado de la aplicación
 * @param state Estado actual de la aplicación
 */

export const counterReducer = createReducer(
    initialState,
    on(increment, (state, { add }) =>  state + add),
    on(decrement, (state) => state - 1),
    on(reset, (state) => 0)
)
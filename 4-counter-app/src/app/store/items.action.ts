import { createAction, props } from "@ngrx/store";

/**
 * Las acciones llaman a los reducers para que se actualice el estado de la aplicación
 * Las acciones son objetos simples que tienen una propiedad type que identifica la acción que se va a realizar
 * Las acciones pueden tener una propiedad payload que contiene los datos necesarios para realizar la acción, por ejemplo
 * la propiedad add en la acción increment que representa la cantidad que se va a sumar al contador
 * 
 */

export const increment = createAction('[Counter Component] Increment', props<{ add: number }>());
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

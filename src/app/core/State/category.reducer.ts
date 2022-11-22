import { createReducer, on } from "@ngrx/store";
import { CategoryCmd } from "../Commands";
import { Category } from "../Domain/Entities";


const initialState: Category[] = [];

export const categoryReducer = createReducer(
    initialState,
    on(CategoryCmd.establecer, (state, { categories })=> categories)
);

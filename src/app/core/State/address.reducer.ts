import { createReducer, on } from "@ngrx/store";
import { AddressCmd } from "../Commands";
import { Address } from "../Domain/Entities/Address";


const initialState: Address[] = [];

export const addressReducer = createReducer(
    initialState,
    on(AddressCmd.establecer, (state, { addresses })=> addresses)
);

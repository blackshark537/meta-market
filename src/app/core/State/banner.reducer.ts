import { createReducer, on } from "@ngrx/store";
import { BannerCmd } from "../Commands";
import { Banner } from "../Domain/Entities";


const initialState: Banner[] = [];

export const bannerReducer = createReducer(
    initialState,
    on(BannerCmd.establecer, (state, { banners })=> banners)
);

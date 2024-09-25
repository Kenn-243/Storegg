import { configureStore } from "@reduxjs/toolkit";
import MyProductsReducer from "../home/redux/MyProductSlice";
import CoinReducer from "../home/redux/CoinSlicer";

export const store = configureStore({
    reducer: {
        product: MyProductsReducer,
        coin: CoinReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
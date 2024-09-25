import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import MyProduct from "../MyProduct";

export type MyProductState = {
    product: number[];
};

const initialState: MyProductState ={
    product: []
}

export const MyProductSlice = createSlice({
    initialState,
    name: 'product',
    reducers:{
        add: (state, action: PayloadAction<number>) =>{
            state.product.push(action.payload)
        },
        remove: (state, action: PayloadAction<number>) => {
            state.product.filter(f => f !== action.payload)
        }
    }   
});

export const {add, remove} = MyProductSlice.actions;

const MyProductsReducer = MyProductSlice.reducer

export default MyProductsReducer
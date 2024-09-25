import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState ={
    coin: 500
}

export const CoinSlice = createSlice({
    initialState,
    name: 'coin',
    reducers:{
        plus: (state, action: PayloadAction<number>) =>{
            state.coin += action.payload
        },
        minus: (state, action: PayloadAction<number>) => {
            state.coin -= action.payload
        }
    }   
});

export const {plus, minus} = CoinSlice.actions;

const CoinReducer = CoinSlice.reducer

export default CoinReducer
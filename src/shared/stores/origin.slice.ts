import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Origin } from '../../models';

interface originState {
    origins: Origin[];
}

const initialState: originState = { origins: [] };

export const originSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        pushOrigins: (state, action: PayloadAction<Origin>) => {
            state.origins.push(action.payload);
        },
        setOrigins: (state, action: PayloadAction<Origin[]>) => {
            state.origins = action.payload;
        },
        combineOrigins: (state, action: PayloadAction<Origin[]>) => {
            state.origins = [...state.origins, ...action.payload];
        },
        clearOrigins: (state) => {
            state.origins = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { pushOrigins, setOrigins, combineOrigins, clearOrigins } =
    originSlice.actions;

export const originReducer = originSlice.reducer;

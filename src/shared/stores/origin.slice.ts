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
        pushOrigin: (state, action: PayloadAction<Origin>) => {
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
        setOriginById: (state, action: PayloadAction<Origin>) => {
            state.origins.find((ori, index) => {
                if (ori.id === action.payload.id) {
                    state.origins[index] = action.payload;
                    return true;
                }
            });
        },
        removeOriginById: (state, action: PayloadAction<number>) => {
            state.origins = state.origins.filter(
                (ori) => ori.id !== action.payload,
            );
        },
    },
});

export const {
    pushOrigin,
    setOrigins,
    combineOrigins,
    clearOrigins,
    setOriginById,
    removeOriginById,
} = originSlice.actions;

export const originReducer = originSlice.reducer;

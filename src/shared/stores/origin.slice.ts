import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Origin } from '../../models';

interface OriginState {
    origins: Origin[];
    loading: boolean;
}

const initialState: OriginState = { origins: [], loading: false };

export const originSlice = createSlice({
    name: 'origin',
    initialState,
    reducers: {
        setOriginLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
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
            const index = state.origins.findIndex(
                (ori) => ori.id === action.payload.id,
            );
            state.origins[index] = action.payload;
        },
        removeOriginById: (state, action: PayloadAction<number>) => {
            state.origins = state.origins.filter(
                (ori) => ori.id !== action.payload,
            );
        },
    },
});

export const {
    setOriginLoading,
    pushOrigin,
    setOrigins,
    combineOrigins,
    clearOrigins,
    setOriginById,
    removeOriginById,
} = originSlice.actions;

export const originReducer = originSlice.reducer;

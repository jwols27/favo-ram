import { configureStore } from '@reduxjs/toolkit';
import { characterReducer } from './character.slice';
import { originReducer } from './origin.slice';

export const store = configureStore({
    reducer: {
        characters: characterReducer,
        origins: originReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import { characterReducer } from './character.slice';
import { originReducer } from './origin.slice';
import { tagReducer } from './tag.slice';

export const store = configureStore({
    reducer: {
        characters: characterReducer,
        origins: originReducer,
        tags: tagReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

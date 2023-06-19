import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../models';

interface characterState {
    characters: Character[];
}

const initialState: characterState = { characters: [] };

export const characterSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        pushCharacters: (state, action: PayloadAction<Character>) => {
            state.characters.push(action.payload);
        },
        setCharacters: (state, action: PayloadAction<Character[]>) => {
            state.characters = action.payload;
        },
        combineCharacters: (state, action: PayloadAction<Character[]>) => {
            state.characters = [...state.characters, ...action.payload];
        },
        clearCharacters: (state) => {
            state.characters = [];
        },
    },
});

export const {
    pushCharacters,
    setCharacters,
    combineCharacters,
    clearCharacters,
} = characterSlice.actions;

export const characterReducer = characterSlice.reducer;

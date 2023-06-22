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
        pushCharacter: (state, action: PayloadAction<Character>) => {
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
        setCharacterById: (state, action: PayloadAction<Character>) => {
            state.characters.find((char, index) => {
                if (char.id === action.payload.id) {
                    state.characters[index] = action.payload;
                    return true;
                }
            });
        },
        removeCharacterById: (state, action: PayloadAction<number>) => {
            state.characters = state.characters.filter(
                (char) => char.id !== action.payload,
            );
        },
    },
});

export const {
    pushCharacter,
    setCharacters,
    combineCharacters,
    clearCharacters,
    setCharacterById,
    removeCharacterById,
} = characterSlice.actions;

export const characterReducer = characterSlice.reducer;

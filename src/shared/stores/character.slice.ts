import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../models';

interface CharacterState {
    characters: Character[];
    loading: boolean;
}

const initialState: CharacterState = { characters: [], loading: false };

export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        setCharacterLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
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
            const index = state.characters.findIndex(
                (char) => char.id === action.payload.id,
            );
            state.characters[index] = action.payload;
        },
        removeCharacterById: (state, action: PayloadAction<number>) => {
            state.characters = state.characters.filter(
                (char) => char.id !== action.payload,
            );
        },
    },
});

export const {
    setCharacterLoading,
    pushCharacter,
    setCharacters,
    combineCharacters,
    clearCharacters,
    setCharacterById,
    removeCharacterById,
} = characterSlice.actions;

export const characterReducer = characterSlice.reducer;

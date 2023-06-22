import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '../../models';

interface tagState {
    tags: Tag[];
}

const initialState: tagState = { tags: [] };

export const tagSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        pushTag: (state, action: PayloadAction<Tag>) => {
            state.tags.push(action.payload);
        },
        setTags: (state, action: PayloadAction<Tag[]>) => {
            state.tags = action.payload;
        },
        combineTags: (state, action: PayloadAction<Tag[]>) => {
            state.tags = [...state.tags, ...action.payload];
        },
        clearTags: (state) => {
            state.tags = [];
        },
        setTagById: (state, action: PayloadAction<Tag>) => {
            state.tags.find((tag, index) => {
                if (tag.id === action.payload.id) {
                    state.tags[index] = action.payload;
                    return true;
                }
            });
        },
        removeTagById: (state, action: PayloadAction<number>) => {
            state.tags = state.tags.filter((tag) => tag.id !== action.payload);
        },
    },
});

export const {
    pushTag,
    setTags,
    combineTags,
    clearTags,
    setTagById,
    removeTagById,
} = tagSlice.actions;

export const tagReducer = tagSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '../../models';

interface TagState {
    tags: Tag[];
    loading: boolean;
}

const initialState: TagState = { tags: [], loading: false };

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        setTagLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
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
            const index = state.tags.findIndex(
                (tag) => tag.id === action.payload.id,
            );
            state.tags[index] = action.payload;
        },
        removeTagById: (state, action: PayloadAction<number>) => {
            state.tags = state.tags.filter((tag) => tag.id !== action.payload);
        },
    },
});

export const {
    setTagLoading,
    pushTag,
    setTags,
    combineTags,
    clearTags,
    setTagById,
    removeTagById,
} = tagSlice.actions;

export const tagReducer = tagSlice.reducer;

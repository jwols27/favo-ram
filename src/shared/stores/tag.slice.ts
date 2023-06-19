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
        pushTags: (state, action: PayloadAction<Tag>) => {
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
    },
});

export const { pushTags, setTags, combineTags, clearTags } = tagSlice.actions;

export const tagReducer = tagSlice.reducer;

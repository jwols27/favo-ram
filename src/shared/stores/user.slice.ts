import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: number;
    name: string;
    loggedIn: boolean;
}

const initialState: UserState = { id: 0, name: '', loggedIn: false };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        },
        toggleLoggedIn: (state) => {
            state.loggedIn = !state.loggedIn;
        },
    },
});

export const { setUserId, setUserName, setLoggedIn, toggleLoggedIn } =
    userSlice.actions;

export const userReducer = userSlice.reducer;

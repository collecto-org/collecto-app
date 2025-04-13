import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi'; 

interface AuthState {
    isLogged: boolean;
    user: { username: string; email: string; id: string } | null;
    token: string | null;
}

const initialState: AuthState = {
    isLogged: false,
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isLogged = false;
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action: PayloadAction<any>) => {
                    state.isLogged = true;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                }
            )
            
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

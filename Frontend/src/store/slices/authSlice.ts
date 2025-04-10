import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState{
    isLogged:boolean;
    user:{username:string} | null
}

const initialState: AuthState = {
    isLogged:false,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login(state, action: PayloadAction<{userId:string,username:string}>){
            state.isLogged = true, //TODO ampliar datos
            state.user = {username: action.payload.username}
        },
        logout(state){
            state.isLogged = false,
            state.user = null
        }
    }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer
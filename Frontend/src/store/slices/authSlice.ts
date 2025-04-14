import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../services/authApi";
import { User } from "../../services/schemas/UserSchemas";

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
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {      
        state.isLogged =  false,
        state.token =  null,
        state.user =   null
    },
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      
        state.isLogged= true,
        state.token= action.payload.token,
        state.user={
          username: action.payload.user.username,
          email: action.payload.user.email,
          id: ""
        
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLogged = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
  },
});

export const { logout,login } = authSlice.actions;
export default authSlice.reducer;

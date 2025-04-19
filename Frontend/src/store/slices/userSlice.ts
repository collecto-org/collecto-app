import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "../../services/usersApi";
import { User } from "../../services/schemas/UserSchemas";
import { authApi } from "@/services/authApi";

const initialState: User = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: undefined,
  location: undefined,
  avatarUrl: undefined,
  bio: undefined,
  isLogged: false,
};

  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state = { ...state, ...action.payload }; 
        },
        updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
            state = { ...state, ...action.payload }; 
        },
        removeUserProfile: (state) => {
            state = { ...initialState }; 
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                userApi.endpoints.getMe.matchFulfilled, 
                (state, action) => {
                    state.username = action.payload.username;
                    state.email = action.payload.email;
                    state.firstName = action.payload.firstName;
                    state.lastName = action.payload.lastName;
                    state.phone = action.payload.phone;
                    state.location = action.payload.location;
                    state.avatarUrl = action.payload.avatarUrl;
                    state.bio = action.payload.bio;
                    state.isLogged = true
                }
            )
            .addMatcher(
                authApi.endpoints.logout.matchFulfilled, 
                () => {
                    return initialState
                }
            )
            .addMatcher(
                userApi.endpoints.editMe.matchFulfilled, 
                (state, action) => {                    
                    state.firstName = action.payload.firstName;
                    state.lastName = action.payload.lastName;
                    state.phone = action.payload.phone;
                    state.location = action.payload.location;
                    state.avatarUrl = action.payload.avatarUrl;
                    state.bio = action.payload.bio;
                }
            )
            .addMatcher(
                userApi.endpoints.deleteMe.matchFulfilled, 
                () => {
                    return initialState
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchFulfilled, 
                (state) => {                    
                    state.isLogged = true
                }
            )
            
    },
});

export const { setUser, updateUserProfile, removeUserProfile } = userSlice.actions;

export default userSlice.reducer;
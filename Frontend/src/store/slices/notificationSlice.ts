import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { notificationApi } from "@/services/notificationsApi";
import { NotificationSchema } from "@/services/schemas/NotificationSchema";

interface NotificationState {
  notifications:NotificationSchema[] | null;
  loading: boolean;
}

const initialState: NotificationState = {
  notifications:null,
  loading:false
};

const isPendingAction = (action: any) => action.type.endsWith('/pending');
const isFulfilledAction = (action: any) => action.type.endsWith('/fulfilled');
const isRejectedAction = (action: any) => action.type.endsWith('/rejected');

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<{ notification: NotificationSchema[]; }>
    ) => {
      state.notifications = action.payload.notification;
    }
  },
  extraReducers: (builder) => {
    builder
    .addMatcher(isPendingAction, (state) => {
      state.loading = true;
    })
    .addMatcher(isFulfilledAction, (state) => {
      state.loading = false;
    })
    .addMatcher(isRejectedAction, (state) => {
      state.loading = false;
    })
      .addMatcher(
        notificationApi.endpoints.getNotifications.matchFulfilled,
        (state, action) => {
          state.notifications= action.payload;
        }
      )
     
     
  },
});

export const {
  setNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;

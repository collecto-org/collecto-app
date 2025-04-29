import { RootState } from "../store";

export const selectNotifications = (state: RootState) => 
    state.notifications.notifications?.filter((notification) => !notification.isRead) || [];
  
  export const selectLastNotifications = (state: RootState) => 
    (state.notifications.notifications?.filter((notification) => !notification.isRead) || []).slice(0, 3);
  
  export const selectAllNotifications = (state: RootState) => 
    state.notifications.notifications || [];
  
  export const selectTotalPendingNotifications = (state: RootState) => { 
    const notificationsPending = state.notifications.notifications?.filter((notification) => !notification.isRead) || [];
    return notificationsPending.length;
  };
  

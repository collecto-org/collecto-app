import { RootState } from "../store";

export const selectNotifications = (state:RootState) => state.notifications.notifications?.filter((notification) => notification.isRead == false)
export const selectLastNotifications = (state:RootState) => state.notifications.notifications?.filter((notification) => notification.isRead == false).slice(0, 3)
export const selectAllNotifications = (state:RootState) => state.notifications.notifications

export const selectTotalPendingNotifications = (state:RootState) =>{ 
    const notificationsPending = state.notifications.notifications?.filter((notification) => notification.isRead == false)
    return notificationsPending?.length

}

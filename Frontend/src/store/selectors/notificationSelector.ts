import { createSelector } from "reselect";
import { RootState } from "../store";

export const selectNotifications = (state: RootState) => state.notifications.notifications;

export const selectTotalPendingNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(n => !n.isRead).length
);

export const selectLastUnreadNotifications = createSelector(
  [selectNotifications],
  (notifications) =>
    notifications.filter((n) => !n.isRead).slice(0, 5)
);

export const selectUnreadNotifications = createSelector(
  [selectNotifications],
  (notifications) =>
    notifications.filter((n) => !n.isRead)
);
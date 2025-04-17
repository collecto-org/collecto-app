import { useGetNotificationsQuery, useReadNotificationsMutation } from "@/services/notificationsApi";
import {  selectNotifications} from "@/store/selectors/notificationSelector";
import { useSelector } from "react-redux";

export function NotificationView() {
  const notifications = useSelector(selectNotifications);
  const [readNotification] = useReadNotificationsMutation()
  const { refetch } = useGetNotificationsQuery({})


const handleOnClick = async (id: string) => {
  try {
    await readNotification(id);
     await refetch()
    
  } catch (error) {
    console.error("Error al leer notificación", error);
  }
};

  if (notifications && notifications.length > 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 px-4 mx-2 sm:px-6 py-4">
        {notifications.map((notification) => (
          <div key={notification._id} className="p-4 bg-white text-darkblue shadow rounded">
            <p className="font-semibold text-darkblue">Notificación</p>
            <p>{notification.message}</p>
            <button onClick={() => handleOnClick(notification._id)}>Leido</button>
          </div>
        ))}
      </div>
    );
  }

  return <p className="px-4 py-2 text-gray-500">No hay notificaciones.</p>;
}

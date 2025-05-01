import {
  useGetNotificationsQuery,
  useReadNotificationsMutation,
} from "@/services/notificationsApi";
import { selectUnreadNotifications } from "@/store/selectors/notificationSelector";
import { slugify } from "@/utils/slugify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function NotificationView() {
  const notifications = useSelector(selectUnreadNotifications);
  const [readNotification] = useReadNotificationsMutation();
  const { refetch } = useGetNotificationsQuery({});

  const handleOnClick = async (id: string) => {
    try {
      await readNotification(id);
      await refetch();
    } catch (error) {
      console.error("Error al leer notificación", error);
    }
  };

  if (notifications && notifications.length > 0) {
    return (
      <div className="grid grid-cols-1 pt-20 md:grid-cols-2  lg:grid-cols-4 gap-6 p-4">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className="bg-cream text-darkblue rounded-2xl shadow-md p-5 flex flex-col justify-between h-full"
          >
            <p className="font-bold text-lg mb-2">Notificación</p>
            <Link className="text-gray-800" to={`/adverts/${slugify(notification.advertId.slug)}`}>
            <p className="text-sm mb-4">{notification.message}</p>
            </Link>
            <button
              onClick={() => handleOnClick(notification._id)}
              className="self-start bg-coral text-white text-xs px-4 py-1 rounded-full transition hover:bg-opacity-80"
            >
              Marcar como leída
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <p className="px-4 py-6 text-center text-sage text-sm font-medium">
      No hay notificaciones.
    </p>
  );
}

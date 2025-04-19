import { Link } from "react-router-dom";
import Icon from "../../elements/Icon";
import NotificationBadge from "../../elements/NotificationBadge";
import { User } from "@/services/schemas/UserSchemas";
import { useSelector } from "react-redux";
import { selectTotalPendingNotifications } from "@/store/selectors/notificationSelector";
import { RootState } from "@/store/store";

export default function NavIcons(user: { user: User }) {

    const totalPendingNotifications = useSelector((state:RootState) => selectTotalPendingNotifications(state))

  if (!user.user.username) {
    return null;
  }
  return (
    <div className="flex items-center gap-2 text-darkblue text-sm px-5">
      <div className="relative">
        <Icon
          name="mail"
          size={20}
          className="hover:text-coral transition-colors"
          onClick={() => alert("revisar correo")}
        />
        <NotificationBadge count={105} position="top-left" variant="success" />
      </div>

      <div className="relative">
      <Link
          to="/adverts/favorites"
          className="text-darkblue hover:text-coral"
        >
        <Icon
          name="bell"
          size={20}
          className="hover:text-coral transition-colors"
        />
        <NotificationBadge count={totalPendingNotifications} position="top-right" variant="warning" />
        </Link>
      </div>

      <div className="relative ">
        <Link
          to="/adverts/favorites"
          className="text-darkblue hover:text-coral"
        >
          <Icon
            name="heart"
            size={20}
            className="hover:text-coral transition-colors"
          />
          <NotificationBadge
            count={43}
            position="bottom-left"
            variant="default"
          />
        </Link>
      </div>

      <div className="relative">
        <Icon
          name="chat"
          size={20}
          className="hover:text-coral transition-colors text-darkblue"
          onClick={() => alert("Iniciando chat")}
        />
        <NotificationBadge
          count={10}
          position="bottom-right"
          variant="danger"
        />
      </div>
    </div>
  );
}

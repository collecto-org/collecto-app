import { Link } from "react-router-dom";
import Icon from "../../elements/Icon";
import NotificationBadge from "../../elements/NotificationBadge";
import { User } from "@/services/schemas/UserSchemas";
import { useSelector } from "react-redux";
import {  selectLastUnreadNotifications, selectTotalPendingNotifications } from "@/store/selectors/notificationSelector";
import { RootState } from "@/store/store";
import { selectTotalPendingChats } from "@/store/selectors/userSelectors";
import { useState } from "react";

export default function NavIcons(user: { user: User }) {
  const totalPendingNotifications = useSelector((state: RootState) =>
    selectTotalPendingNotifications(state)
  );

  const TotalPendingChats = useSelector((state:RootState) => selectTotalPendingChats(state))
    const [showNotifications, setShowNotifications] = useState(false);
      const notifications = useSelector((state:RootState)=>selectLastUnreadNotifications(state));
    
  

  if (!user.user.username) {
    return null;
  }
  return (
    <div className="flex items-center gap-2 text-darkblue text-sm px-3">

          <div className="relative">
            <Icon
              name="bell"
              className="text-darkblue hover:text-coral cursor-pointer"
              onClick={() => {
                setShowNotifications(!showNotifications);
              }}
            />
            {showNotifications && notifications && notifications.length > 0 &&(
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg p-4 z-50 text-sm">
                <p className="font-semibold text-darkblue mb-2">Notificaciones</p>
                <ul className="space-y-2">
                  {notifications.map((notification) => (
                    <Link key={notification._id} onClick={()=>{setShowNotifications(!showNotifications)}} to="/notifications" className="text-darkblue hover:text-coral">
              <li key={notification._id}>{notification.message}</li></Link>
          ))}
                </ul>
              </div>
              
            )}
            <NotificationBadge
            count={totalPendingNotifications}
            position="top-right"
            variant="warning"
          />
          </div>
      

      <div className="relative ">
        <Link
          to="/adverts/favorites"
          className="text-darkblue hover:text-coral"
        >
          <Icon
            name="heart"
            size={22}
            className="hover:text-coral transition-colors"
          />

        </Link>
      </div>

      <div className="relative">
      <Link
          to="/my-chats"
          className="text-darkblue hover:text-coral"
        >
        <Icon
          name="chat"
          size={22}
          className="hover:text-coral transition-colors text-darkblue"
        />
        <NotificationBadge
          count={TotalPendingChats}
          position="bottom-right"
          variant="danger"
        />
        </Link>
      </div>
    </div>
  );
}

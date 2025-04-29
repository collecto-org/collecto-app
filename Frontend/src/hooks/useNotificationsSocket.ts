import { useEffect } from 'react';
import socket from '@/utils/connectSocket';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '@/store/slices/notificationSlice'; 
import { selectUser } from '@/store/selectors/userSelectors'; 
import { NotificationSchema } from '@/services/schemas/NotificationSchema';

export const useNotificationsSocket = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) return;

    // usuario se conecta
    socket.emit('register', user.username); 
    console.log("emitiendo");

    // Escucha nuevas notificaciones
    const handleNewNotification = (notification:NotificationSchema) => {
            dispatch(addNotification(notification)); 
    };

    socket.on('new-notification', handleNewNotification);

    return () => {
      socket.off('new-notification', handleNewNotification);
    };
  }, [user, dispatch]); 

};

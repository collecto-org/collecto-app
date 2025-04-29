import { useEffect } from "react";
import socket from "@/utils/connectSocket";
import { useDispatch } from "react-redux";
import { setChatRoom, markMessageAsRead } from "@/store/slices/userSlice";

export const useChatSocket = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Escucha de nuevos mensajes
    socket.on("chat message", (messageData) => {
      dispatch(setChatRoom(messageData));
    });

    // Escucha para cuando se marcan mensajes como leídos
    socket.on("message read", (data) => {
      dispatch(
        markMessageAsRead({
          roomId: data.roomId,
          messageIds: data.messageIds,
        })
      );
    });

    return () => {
      socket.off("chat message");
      socket.off("message read");
    };
  }, [dispatch]);
};

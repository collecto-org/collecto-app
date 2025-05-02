import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectUser } from "@/store/selectors/userSelectors";
import { useGetAdvertDetailByIdQuery } from "@/services/advertsApi";
import { io, Socket } from "socket.io-client";

interface ChatPanelProps {
  roomId: string | null;
  onBack: () => void;
}

export default function ChatPanel({ roomId, onBack }: ChatPanelProps) {
  const { username } = useSelector((state: RootState) => selectUser(state));
  if (!roomId) return null;
    const advertId = roomId.split("_")[0];

  const { data: advert } = useGetAdvertDetailByIdQuery({ id: advertId }, { skip: !advertId });

  const user = username;
  const otherUser =
    user === advert?.user?.username
      ? roomId.split("_")[1]
      : advert?.user?.username;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ message: string; username: string }[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL);

    socketRef.current.on("chat message", (data) => {
      setMessages((prev) => [...prev, { message: data.message, username: data.username }]);
    });

    return () => {
      socketRef.current?.emit("inactive in chat", { roomId, user });
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!roomId || !user) return;

    socketRef.current?.emit("joinRoom", { roomId, user });
    socketRef.current?.emit("active in chat", { roomId, user });

    socketRef.current?.on("previousMessages", (previous) => {
      setMessages(previous);
    });

    return () => {
      socketRef.current?.off("previousMessages");
    };
  }, [roomId, user]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socketRef.current?.emit("chat message", { roomId, message, username });
      setMessage("");
    }
  };

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return roomId ? (
    <>
      <button
        onClick={onBack}
        className="text-sm text-coral underline mb-2"
      >
        ← Volver a chats
      </button>
      <ChatPage roomId={roomId} />
    </>
  ) : (
    <ChatsList onSelectChat={(roomId: string) => onBack(roomId)} />
  );
  
}

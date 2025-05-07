import { Link, useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectUser } from "@/store/selectors/userSelectors";
import { useGetAdvertDetailByIdQuery } from "@/services/advertsApi";

export default function ChatPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { username } = useSelector((state: RootState) => selectUser(state));
  const id = roomId?.split("_")[0];

  const { data: advert } = useGetAdvertDetailByIdQuery(
    { id: id || "" },
    { skip: !id }
  );

  const otherUser =
    username === advert?.user?.username
      ? roomId?.split("_")[1]
      : advert?.user?.username;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { message: string; username: string }[]
  >([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
      withCredentials: true,
    });

    socketRef.current.on("chat message", (data) => {
      if ("roomId" in data && "message" in data && "username" in data) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: data.message, username: data.username },
        ]);
      }
    });

    socketRef.current.on("error", () => {
      navigate("/my-chats",{ replace: true }); 

    });

    socketRef.current.on("previousMessages", (previous) => {
      setMessages(previous);
    });

    return () => {
      socketRef.current?.emit("inactive in chat", { roomId });
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!roomId) return;

    socketRef.current?.emit("joinRoom", { roomId });
    socketRef.current?.emit("active in chat", { roomId });

    return () => {
      socketRef.current?.off("previousMessages");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socketRef.current?.emit("chat message", { roomId, message });
      setMessage("");
    }
  };

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto p-6 py-24 text-darkblue text-center">
      <h1 className="text-2xl font-bold mb-4">Chat con el usuario</h1>
      <p>
        Hablando con{" "}
        <strong>
          <Link className="text-coral" to={`/users/${otherUser}`}>
            {otherUser}
          </Link>
        </strong>{" "}
        en el anuncio:{" "}
        <Link className="text-coral" to={`/adverts/${advert?.slug}`}>
          <strong>{advert?.title}</strong>
        </Link>
      </p>

      <div className="bg-gray-100 p-4 my-4 h-96 overflow-y-scroll rounded-lg shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              msg.username === username ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-xl shadow-sm max-w-xs ${
                msg.username === username
                  ? "bg-coral text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <strong>{msg.username}:</strong> {msg.message}
            </div>
            <div ref={bottomRef} />
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 rounded-lg border-2 bg-lightgrey focus:outline-none focus:ring-2 focus:bg-pinklight"
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={sendMessage}
          className="ml-4 px-4 py-2 bg-coral text-white rounded-lg hover:bg-pinklight"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

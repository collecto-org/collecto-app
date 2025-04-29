import { Link, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectUser } from "@/store/selectors/userSelectors";
import { useGetAdvertDetailByIdQuery} from "@/services/advertsApi";

export default function ChatPage() {
  const { roomId } = useParams();
  const { username } = useSelector((state: RootState) => selectUser(state));
  const id = roomId?.split("_")[0]
  console.log(id)

  const {data:advert} = useGetAdvertDetailByIdQuery({id:id? id : ""},{skip:!id})

  const user = username

  const otherUser = user ===advert?.user.username  ?  roomId?.split("_")[1] :advert?.user.username
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ message: string; username: string }[]>([]);
  const socketRef = useRef<Socket | null>(null);


 useEffect(() => {
  // Conectar con socket.io
  socketRef.current = io(import.meta.env.VITE_SOCKET_URL);

  // Escuchar los mensajes
  socketRef.current.on("chat message", (data) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: data.message, username: data.username },
    ]);
  });

  // Limpiar cuando el componente se desmonte
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
    socketRef.current?.emit("chat message", { roomId ,message, username });
    setMessage("");
  }
};

return (
  <div className="max-w-4xl mx-auto p-6 text-darkblue text-center">
    <h1 className="text-2xl font-bold mb-4">Chat con el usuario</h1>
    <p>
      Chateando con <strong><Link to={`/users/${otherUser}`}>{otherUser}</Link></strong> en el
      anuncio: <strong>{advert?.title}</strong>
    </p>

    <div className="bg-gray-100 p-4 my-4 h-96 overflow-y-scroll rounded-lg shadow-inner">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-2 flex ${msg.username === user ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`p-2 rounded-xl shadow-sm max-w-xs ${
              msg.username === user ? "bg-blue-500 text-white" : "bg-white text-gray-800"
            }`}
          >
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        </div>
      ))}
    </div>

    <div className="flex items-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Escribe un mensaje..."
      />
      <button
        onClick={sendMessage}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Enviar
      </button>
    </div>
  </div>
);
}
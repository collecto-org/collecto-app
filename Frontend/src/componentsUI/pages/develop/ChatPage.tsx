import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectUser } from "@/store/selectors/userSelectors";

const socket = io("http://localhost:4000");

export default function ChatPage() {
  const { slug } = useParams();
  const { username } = useSelector((state: RootState) => selectUser(state));
  const user = username || "Pepe";  // Si no hay username, por defecto se usa "Pepe"

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ message: string; username: string }[]>([]);

  useEffect(() => {
    if (slug) {
      socket.emit("join_chat", { username, slug }); // Envías solo el username y slug
    }

    // Recibir nuevos mensajes y actualizar el estado
    socket.on("message", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: data.message, username: data.username },
      ]);
    });

    return () => {
      socket.off("message"); // Limpiar el listener cuando se desmonte el componente
    };
  }, [slug, username]);  // Dependiendo de `slug` y `username`

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", { message, username, slug }); // Asegúrate de enviar el username
      setMessage(""); // Limpiar el input después de enviar el mensaje
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-darkblue text-center">
      <h1 className="text-2xl font-bold mb-4">Chat con el usuario</h1>
      <p>
        Esta es la zona de conversación de <strong>{user}</strong> en el
        anuncio: <strong>{slug}</strong>
      </p>

      {/* Contenedor de mensajes */}
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

      {/* Input y botón para enviar mensaje */}
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

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/userSelectors";

export default function ChatsList() {
  const user = useSelector(selectUser);
  const data = user.chats;

  const currentUsername = user.username;

  // Si no hay chats disponibles
  if (!Array.isArray(data) || data.length === 0) return <div>No tienes chats disponibles.</div>;

  const chatsWithDetails = data.map(chat => {
    // Encontrar al otro usuario en el chat
    const otherUser = chat.users.find((u) => u.username !== currentUsername);

    // Obtener el último mensaje del chat
    const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
    const lastMessageContent = lastMessage ? lastMessage.content : "No hay mensajes aún";

    return {
      ...chat,
      withUser: otherUser ? otherUser.username : "Desconocido",
      lastMessage: lastMessageContent,  // Último mensaje
    };
  });

  return (
    <div className="max-w-4xl mx-auto p-6 text-darkblue text-center">
      <h1 className="text-2xl font-bold mb-4">Mis Chats</h1>
      <div className="space-y-4">
        {chatsWithDetails.map((chat) => (
          <div key={chat.roomId} className="p-4 border-b-2 text-darkblue text-center">
            <Link to={`/chat/${chat.roomId}`}>
              <h2 className="font-semibold text-lg">{chat.advertId.title}</h2>
              <p>Con: {chat.withUser}</p>
              <p className="text-gray-500">Último mensaje: "{chat.lastMessage}"</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

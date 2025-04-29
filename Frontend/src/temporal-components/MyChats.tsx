import { useGetChatsQuery } from "@/services/usersApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/userSelectors";

export default function ChatsList() {
  const { data, error, isLoading } = useGetChatsQuery();
  const user = useSelector(selectUser);

  const currentUsername = user.username

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading chats</div>;
  if (!Array.isArray(data) || data.length === 0) return <div>No tienes chats disponibles.</div>;

  const chatsWithDetails = data.map(chat => {
    const otherUser = chat.participants.find((u) => u !== currentUsername);
 

    return {
      ...chat,
      withUser: otherUser || "Desconocido",
      
    };
  });

  return (
    <div className="max-w-4xl mx-auto p-6 text-darkblue text-center">
      <h1 className="text-2xl font-bold mb-4">Mis Chats</h1>
      <div className="space-y-4">
        {chatsWithDetails.map((chat) => (
          <div key={chat.roomId} className="p-4 border-b-2 text-darkblue text-center">
            <Link to={`/chat/${chat.roomId}`}>
              <h2 className="font-semibold text-lg">{chat.advertTitle}</h2>
              <p>Con: {chat.withUser}</p>
              <p className="text-gray-500">Último mensaje: "{chat.lastMessage}"</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useGetChatsQuery } from "@/services/usersApi";
import { Link } from "react-router-dom";

export default function ChatsList() {
  const { data = [], error, isLoading } = useGetChatsQuery();

  console.log("data:", data);
  console.log("isArray?", Array.isArray(data));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading chats</div>;
  if (!Array.isArray(data) || data.length === 0) return <div>No tienes chats disponibles.</div>;

  const uniqueChats = Array.from(new Map(data.map(chat => [chat.roomId, chat])).values());

  return (
    <div className="max-w-4xl mx-auto p-6 text-darkblue text-center">
      <h1 className="text-2xl font-bold mb-4">Mis Chats</h1>
      <div className="space-y-4">
        {uniqueChats.map((chat) => (
          <div key={chat.roomId} className="p-4 border-b-2 text-darkblue text-center">
            <Link to={`/chat/${chat.roomId}`}>
              <h2 className="font-semibold text-lg">{chat.slug}</h2>
              <p>Con: {chat.withUser}</p>
              {chat.messages?.length > 0 && (
                <p className="text-gray-500">
                  Último mensaje: "{chat.messages[chat.messages.length - 1].message}"
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

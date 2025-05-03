import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/userSelectors";
import { totalPendingChats } from "@/utils/totalPendingChat";

export default function ChatsList() {
  const user = useSelector(selectUser);
  const data = user.chats;
  const currentUsername = user.username;

  if (!Array.isArray(data) || data.length === 0)
    return (
      <div className="text-darkblue text-center mt-10 font-quicksand">
        No tienes chats disponibles.
      </div>
    );

  const chatsWithDetails = data.map((chat) => {
    const otherUser = chat.users.find((u) => u.username !== currentUsername);
    const lastMessage =
      chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
    const lastMessageContent = lastMessage
      ? lastMessage.content
      : "No hay mensajes aún";

    return {
      ...chat,
      withUser: otherUser
        ? otherUser
        : { username: "Desconocido", avatarUrl: "" },
      lastMessage: lastMessageContent,
    };
  });

  return (
    <div className="max-w-4xl relative pt-10 mx-auto px-10 font-quicksand">
      <h1 className="text-2xl mt-10  font-bold text-darkblue mb-6 text-center">
        Mis Chats
      </h1>
      <div className="space-y-4">
        {chatsWithDetails.map((chat) => {
          const pendingCount = totalPendingChats(chat.messages, user);
          return (
            <Link
              key={chat.roomId}
              to={`/chat/${chat.roomId}`}
              className="flex items-center gap-4 p-4 rounded-xl shadow-md  bg-cream hover:bg-lightgrey transition-colors"
            >
              <img
                src={chat.withUser.avatarUrl || "/default-avatar.png"}
                alt={`Avatar de ${chat.withUser.username}`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-darkblue truncate">
                    {chat.advertId.title}
                  </h2>
                  {pendingCount > 0 && (
                    <span className="bg-coral text-white text-xxs px-2 py-1 flex-shrink-0  rounded-full">
                      {pendingCount} mensaje{pendingCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <p className="text-sm text-sage">
                  Con:{" "}
                  <span className="font-medium">{chat.withUser.username}</span>
                </p>
                <p className="text-xs text-greengrey truncate">
                  Último mensaje: "{chat.lastMessage}"
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

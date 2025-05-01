import { ChatMessage, User } from "@/services/schemas/UserSchemas";

export function totalPendingChats(messages:ChatMessage[] ,user:User){ 
    const total = messages.filter((message)=> message.isRead === false && message.receiver.username===user.username)
    return total.length
}
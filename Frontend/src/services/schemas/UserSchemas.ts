export type User = {
    username: string;
      email: string;
      firstName: string;
      lastName: string;
      phone?: string;
      location?: string;
      avatarUrl?: string;
      dateOfBirth?: Date;
      gender?:string;
      bio?: string;
      isLogged: boolean;
}

export type Message = {
  username: string;
  message: string;
  timestamp: string; 
}

export type Chat = {
  roomId: string;
  slug: string;
  withUser: string;
  messages: Message[];
}

export type GetChatsResponse = {
  chats: Chat[];
}
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
      chats:Chat[];
      isAdmin?:boolean
}

export interface ChatUser {
  username: string;
  avatarUrl: string; 
}

export interface ChatMessage {
  sender: ChatUser;
  receiver: ChatUser;
  content: string;
  isRead: boolean;
  createdAt: string;
  _id: string;
}

export interface Chat {
  _id: string;

  roomId: string;
  advertId: {
    title:string;
    _id:string;
  }
  users: ChatUser[]; 
  messages: ChatMessage[];
  createdAt: string;
}
export type GetChatsResponse = {
  chats: Chat[];
}

export type UserSchema = {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  gender?: string;
  bio?: string;
  role: "user" | "admin";
  emailVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

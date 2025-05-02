import { RootState } from "../store";


export const selectUser = (state:RootState) => state.user; //obtener datos del usuario logueado

export const selecChats = (state:RootState) => state.user.chats; 

export const selectTotalPendingChats = (state: RootState) => {
    // Asegúrate de que state.user.chats sea un array y que no esté vacío
    if (!Array.isArray(state.user.chats)) return 0;
  
    return state.user.chats.reduce((total, chat) => {
      // Asegúrate de que chat.messages es un array y está definido
      const messages = Array.isArray(chat.messages) ? chat.messages : [];
      
      // Filtra los mensajes no leídos destinados al usuario actual
      const totalPendingChats = messages.filter(
        (message) => 
          !message.isRead && 
          message.receiver?.username === state.user.username
      ).length;
  
      return total + totalPendingChats;
    }, 0);
  };
  
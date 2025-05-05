import { io } from 'socket.io-client';

const socket = io("/chat", {
  withCredentials: true,
});

export default socket;
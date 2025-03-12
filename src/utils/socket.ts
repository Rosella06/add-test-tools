import { io } from "socket.io-client";

// ดึงค่าจาก .env
const URL = import.meta.env.VITE_SOCKET_HOST;

// เชื่อมต่อกับ Socket.IO Server
const socket = io(URL, { transports: ["websocket"] });

export { socket };

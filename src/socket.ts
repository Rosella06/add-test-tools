import { io } from "socket.io-client";

// กำหนด URL สำหรับเชื่อมต่อกับ WebSocket
const socket = io("http://localhost:3000");  // ปรับ URL ให้ตรงกับที่คุณใช้

export { socket };

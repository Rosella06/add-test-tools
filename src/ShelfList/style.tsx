// import net from 'net'

// let running = 1
// const body = {
//     floor: 1,
//     position: 12,
//     qty: 3
// }

// function getStatusT(status: string): string {
//     console.log(status)
//     switch (status) {
//         case '01':
//             console.log("ได้รับคำสั่งแล้ว")
//             return 'T01'; // รอจัดยา
//         case 'preparing':
//             return 'T02'; // กำลังจัดยา
//         case 'done':
//             return 'T03'; // จัดยาเสร็จ
//         default:
//             return 'T00'; // ค่าเริ่มต้น
//     }
// }
// const server = net.createServer((socket) => {
//     console.log('🔗 Client connected:', socket.remoteAddress, socket.remotePort);

//     setInterval(() => {
//         const pad = (num: number, length: number) => num.toString().padStart(length, '0');

//         const newFloor = pad(body.floor, 2);
//         const newPosition = pad(body.position, 2);
//         const newQty = pad(body.qty, 4);

//         running = running > 9 ? 1 : running;

//         const sumValue = 1 + 1 + 1 + 4500 + body.floor + body.position + body.qty + running;
//         const sum = pad(sumValue, 2).slice(-2);

//         const message = `B01R${newFloor}C${newPosition}Q${newQty}L01M01T00N${running}D4500S${sum}`;

//         console.log('📤 Sending...', message);
//         socket.write(message);

//         running++;
//     }, 2000);

//     // รับข้อมูลจาก PLC
//     socket.on('data', (data) => {
//         getStatusT(data.toString().split("T",2)[1].substring(0,2))
//         console.log('📥 Received from PLC:', data.toString());

//         // // ส่งข้อความกลับไปที่ PLC (Echo Message)
//         // socket.write(data);
//         // console.log('📤 Sent back:', data.toString());
//     });

//     // จัดการกรณีขาดการเชื่อมต่อ
//     socket.on('end', () => {
//         console.log('❌ Client disconnected');
//     });

//     socket.on('error', (err) => {
//         console.error('⚠️ Error:', err.message);
//     });
// });

// server.listen(2001, () => {
//     console.log('🚀 TCP Server กำลังทำงานที่ 2001');
// });

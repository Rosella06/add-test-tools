// import React, { useState } from "react";

// const ROWS = 7;
// const COLUMNS = 12;

// const QueueList: React.FC = () => {
//   const [cabinet, setCabinet] = useState<number[][]>(
//     Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0))
//   );

//   const updateValue = (row: number, col: number, delta: number) => {
//     setCabinet((prev) =>
//       prev.map((r, rowIndex) =>
//         rowIndex === row
//           ? r.map((val, colIndex) =>
//               colIndex === col ? Math.max(val + delta, 0) : val
//             )
//           : r
//       )
//     );
//   };

//   const resetValue = (row: number, col: number) => {
//     setCabinet((prev) =>
//       prev.map((r, rowIndex) =>
//         rowIndex === row
//           ? r.map((val, colIndex) => (colIndex === col ? 0 : val))
//           : r
//       )
//     );
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 ">
//       <div className="grid grid-cols-12 gap-3 ">
//         {cabinet
//           .slice()
//           .reverse() 
//           .map((row, rowIndex) => {
//             const actualRowIndex = ROWS - 1 - rowIndex; 
//             return row.map((value, colIndex) => (
//               <div
//                 key={`${actualRowIndex}-${colIndex}`}
//                 className="border p-2 text-center flex flex-col items-center bg-gray-200"
//               >
//                 <div className="text-xs text-gray-600">
//                   ชั้น {actualRowIndex + 1} ช่อง {colIndex + 1}
//                 </div>
//                 <div className="text-lg font-bold">{value}</div>
//                 <div className="flex space-x-1">
//                   <button
//                     onClick={() => updateValue(actualRowIndex, colIndex, -1)}
//                     className="bg-red-500 text-white px-1 rounded"
//                     disabled={value === 0}
//                   >
//                     ➖
//                   </button>
//                   <button
//                     onClick={() => updateValue(actualRowIndex, colIndex, 1)}
//                     className="bg-green-500 text-white px-1 rounded"
//                     disabled={value === 10}
//                   >
//                     ➕
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => resetValue(actualRowIndex, colIndex)}
//                   className="bg-blue-500 text-white px-2 rounded mt-1"
//                 >
//                   จัด
//                 </button>
//               </div>
//             ));
//           })}
//       </div>
//     </div>
//   );
// };

// export default QueueList;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";


// interface Orders {
//   OrderId: string;
//   PrescriptionNo: string;
//   OrderitemCode: string;
//   OrderitemName: string;
//   OrderQty: number;
//   OrderunitCode: string;
//   Machine: string;
//   Command: string;
//   BinLocation: string;
//   OrderStatus: string;
//   RowID: string;
//   Slot: string;
//   CreatedAt: Date;
//   UpdatedAt: Date;
// }

// interface Queue<T> {
//   PrescriptionNo: string;
//   PrescriptionDate: string;
//   Hn: string;
//   An: string;
//   PatientName: string;
//   WardCode: string;
//   WardDesc: string;
//   PriorityCode: string;
//   PriorityDesc: string;
//   PresStatus: string;
//   CreatedAt: Date;
//   UpdatedAt: Date;
//   Order: T[];
// }

// interface StatusData {
//   status: number;
//   data: Queue<Orders>;
// }

// const ROWS = 7;
// const COLUMNS = 12;
// const API_URL = import.meta.env.VITE_API_URL;

// const QueueList: React.FC = () => {
//   const [cabinet, setCabinet] = useState<number[][]>(
//     Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0))
//   );
//   const [list, setList] = useState<Orders[]>([]);
//   const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
//   const [message, setMessage] = useState("");

//   // โหลดข้อมูลจาก API
//   const fetchData = () => {
//     axios
//       .get<StatusData>(`${API_URL}/order`)
//       .then((response) => {
//         setList(response.data.data ? response.data.data.Order : []);
//       })
//       .catch((err) => console.log(err));
//   };

//   // จัดการการเพิ่ม / ลดค่า
//   const updateValue = (row: number, col: number, delta: number) => {
//     setCabinet((prev) =>
//       prev.map((r, rowIndex) =>
//         rowIndex === row
//           ? r.map((val, colIndex) =>
//               colIndex === col ? Math.max(val + delta, 0) : val
//             )
//           : r
//       )
//     );
//   };

//   // รีเซ็ตค่า
//   const resetValue = (row: number, col: number) => {
//     setCabinet((prev) =>
//       prev.map((r, rowIndex) =>
//         rowIndex === row ? r.map((val, colIndex) => (colIndex === col ? 0 : val)) : r
//       )
//     );
//   };

//   // จัดยา
//   const handleOrder = (row: number, col: number) => {
//     if (cabinet[row][col] === 0) return;
//     const key = `${row}-${col}`;
//     setLoading((prev) => ({ ...prev, [key]: true }));

//     setTimeout(() => {
//       console.log(`จัดยา ชั้น ${row + 1} ช่อง ${col + 1}`);
//       resetValue(row, col);
//       setLoading((prev) => ({ ...prev, [key]: false }));
//     }, 3000);
//   };

//   // ยกเลิกรายการ
//   const cancelOrder = () => {
//     axios.delete(`${import.meta.env.VITE_API_URL}/order/0`)
//       .then(() => {
//         fetchData();
//         Swal.fire({
//           icon: "error",
//           title: "ยกเลิกรายการเรียบร้อย",
//           toast: true,
//           position: "top-end",
//           showConfirmButton: false,
//           timer: 2000,
//           timerProgressBar: true,
//         });
//       })
//       .catch((err) => console.log(err));
//   };

//   // WebSocket เชื่อมต่อ
//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:2001");

//     socket.onopen = () => console.log("✅ WebSocket connected!");
//     socket.onmessage = (event) => {
//       console.log("📥 Received:", event.data);
//       setMessage(event.data);
//     };
//     socket.onclose = () => console.log("❌ WebSocket disconnected!");
//     socket.onerror = (error) => console.error("⚠️ WebSocket error:", error);

//     return () => socket.close();
//   }, []);

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <div className="grid grid-cols-12 gap-3">
//         {cabinet
//           .slice()
//           .reverse()
//           .map((row, rowIndex) => {
//             const actualRowIndex = ROWS - 1 - rowIndex;
//             return row.map((value, colIndex) => {
//               const key = `${actualRowIndex}-${colIndex}`;
//               const item = list.find(
//                 (order) =>
//                   order.BinLocation === `${actualRowIndex + 1}${(colIndex + 1)
//                     .toString()
//                     .padStart(2, "0")}`
//               );

//               return (
//                 <div
//                   key={key}
//                   className="border p-3 text-center flex flex-col items-center bg-gray-200"
//                 >
//                   <div className="text-xs text-gray-600">
//                     ชั้น {actualRowIndex + 1} ช่อง {colIndex + 1}
//                   </div>
//                   <div className="text-lg font-bold">{value}</div>
//                   <div className="flex space-x-1">
//                     <button
//                       onClick={() => updateValue(actualRowIndex, colIndex, -1)}
//                       className="bg-red-500 text-white px-1 rounded"
//                       disabled={value === 0}
//                     >
//                       ➖
//                     </button>
//                     <button
//                       onClick={() => updateValue(actualRowIndex, colIndex, 1)}
//                       className="bg-green-500 text-white px-1 rounded"
//                       disabled={value === 10}
//                     >
//                       ➕
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => handleOrder(actualRowIndex, colIndex)}
//                     className="bg-blue-500 text-white px-2 rounded mt-1"
//                     disabled={value === 0 || loading[key]}
//                   >
//                     {loading[key] ? "กำลังจัด..." : "จัด"}
//                   </button>
//                   {item ? (
//                     <span>
//                       {item.OrderStatus === "0"
//                         ? "รอคิวจัดยา"
//                         : item.OrderStatus === "1"
//                         ? "กำลังจัดยา"
//                         : item.OrderStatus === "2"
//                         ? "จัดยาเรียบร้อย"
//                         : "จัดยาไม่สำเร็จ"}
//                     </span>
//                   ) : (
//                     <span>ไม่มีข้อมูล</span>
//                   )}
//                 </div>
//               );
//             });
//           })}
//       </div>
//     </div>
//   );
// };

// export default QueueList;




// import React, { useState, useEffect } from 'react';

// const QueueList: React.FC = () => {
//   const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
//   const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
//   const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
//   const [message, setMessage] = useState('');
//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [statusMessage, setStatusMessage] = useState<string | null>(null);

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:8080');

//     ws.onopen = () => {
//       console.log('✅ WebSocket Connected!');
//       setIsConnected(true);
//     };

//     ws.onmessage = (event) => {
//       console.log('📥 Response:', event.data);
//       const response = JSON.parse(event.data);

//       if (response.status === 'T01') {
//         setStatusMessage('✅ จัดยาเรียบร้อย');
//       } else {
//         setStatusMessage(null);
//       }

//       setMessage(event.data);
//     };

//     ws.onclose = () => {
//       console.log('❌ WebSocket Disconnected!');
//       setIsConnected(false);
//     };

//     ws.onerror = (error) => console.error('⚠️ WebSocket Error:', error);

//     setSocket(ws);

//     return () => {
//       if (ws) {
//         ws.close();
//       }
//     };
//   }, []);

//   const sendCommand = (floor: number, position: number) => {
//     if (!socket || !isConnected) {
//       console.error('⚠️ WebSocket not connected!');
//       return;
//     }

//     const key = `${floor}-${position}`;
//     const qty = quantities[key] || 1;

//     const command = { floor, position, qty };
//     console.log('📤 Sending Command:', command);
//     socket.send(JSON.stringify(command));
//   };

//   const handleQuantityChange = (floor: number, position: number, delta: number) => {
//     const key = `${floor}-${position}`;
//     setQuantities((prev) => {
//       const currentQty = prev[key] !== undefined ? prev[key] : 0;
//       return {
//         ...prev,
//         [key]: Math.max(currentQty + delta, 0),
//       };
//     });
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       {[...Array(7)].map((_, i) => {
//         const floorIndex = 7 - i;
//         return (
//           <div key={floorIndex} className="space-y-2">
//             <h2 className="text-xl font-semibold">ชั้นที่ {floorIndex}</h2>
//             <div className="grid grid-cols-12 gap-2">
//               {[...Array(12)].map((_, positionIndex) => {
//                 const key = `${floorIndex}-${positionIndex + 1}`;
//                 return (
//                   <div
//                     key={positionIndex}
//                     className={`p-3 border border-gray-300 rounded-lg shadow-md flex flex-col items-center space-y-2 cursor-pointer ${
//                       selectedFloor === floorIndex && selectedPosition === positionIndex + 1
//                         ? 'bg-blue-100 '
//                         : 'bg-white'
//                     }`}
//                     onClick={() => {
//                       setSelectedFloor(floorIndex);
//                       setSelectedPosition(positionIndex + 1);
//                     }}
//                   >
//                     <p>ช่องที่ {positionIndex + 1}</p>
//                     <div className="flex items-center space-x-1">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleQuantityChange(floorIndex, positionIndex + 1, -1);
//                         }}
//                         className="bg-red-500 text-white px-2  rounded"
//                         disabled={(quantities[key] || 0) <= 0}
//                       >
//                         -
//                       </button>
//                       <span>{quantities[key] || 0}</span>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleQuantityChange(floorIndex, positionIndex + 1, 1);
//                         }}
//                         className="bg-green-500 text-white px-2  rounded"
//                       >
//                         +
//                       </button>
//                     </div>

//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         sendCommand(floorIndex, positionIndex + 1);
//                       }}
//                       className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
//                       disabled={!isConnected}
//                     >
//                       จัด
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );
//       })}
//       {statusMessage && <p className="text-lg font-semibold">{statusMessage}</p>}
//     </div>
//   );
// };

// export default QueueList;


import React, { useState, useEffect } from 'react';

const QueueList: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('✅ WebSocket Connected!');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log('📥 Response:', event.data);
      const response = JSON.parse(event.data);

      if (response.status === 'success') {
        setStatusMessage('✅ จัดยาเรียบร้อย');
      } else {
        setStatusMessage(null);
      }

      setMessage(event.data);
    };

    ws.onclose = () => {
      console.log('❌ WebSocket Disconnected!');
      setIsConnected(false);
    };

    ws.onerror = (error) => console.error('⚠️ WebSocket Error:', error);

    setSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const sendCommand = (floor: number, position: number) => {
    if (!socket || !isConnected) {
      console.error('⚠️ WebSocket not connected!');
      return;
    }

    const key = `${floor}-${position}`;
    const qty = quantities[key] || 1;

    const command = { floor, position, qty, status: 'preparing' }; // กำหนดสถานะเป็น 'preparing'
    console.log('📤 Sending Command:', command);
    
    // ส่งคำสั่งไปยัง WebSocket server
    socket.send(JSON.stringify(command));
  };

  const handleQuantityChange = (floor: number, position: number, delta: number) => {
    const key = `${floor}-${position}`;
    setQuantities((prev) => {
      const currentQty = prev[key] !== undefined ? prev[key] : 0;
      return {
        ...prev,
        [key]: Math.max(currentQty + delta, 0),
      };
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {[...Array(7)].map((_, i) => {
        const floorIndex = 7 - i;
        return (
          <div key={floorIndex} className="space-y-2">
            <h2 className="text-xl font-semibold">ชั้นที่ {floorIndex}</h2>
            <div className="grid grid-cols-12 gap-2">
              {[...Array(12)].map((_, positionIndex) => {
                const key = `${floorIndex}-${positionIndex + 1}`;
                return (
                  <div
                    key={positionIndex}
                    className={`p-3 border rounded-lg shadow-md flex flex-col items-center space-y-2 cursor-pointer ${selectedFloor === floorIndex && selectedPosition === positionIndex + 1 ? 'bg-blue-100 ' : 'bg-white'}`}
                    onClick={() => {
                      setSelectedFloor(floorIndex);
                      setSelectedPosition(positionIndex + 1);
                    }}
                  >
                    <p>ช่องที่ {positionIndex + 1}</p>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(floorIndex, positionIndex + 1, -1);
                        }}
                        className="bg-red-500 text-white px-2 rounded"
                        disabled={(quantities[key] || 0) <= 0}
                      >
                        -
                      </button>
                      <span>{quantities[key] || 0}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(floorIndex, positionIndex + 1, 1);
                        }}
                        className="bg-green-500 text-white px-2 rounded"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sendCommand(floorIndex, positionIndex + 1);  // ส่งคำสั่งไปที่ WebSocket เมื่อกด "จัด"
                      }}
                      className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
                      disabled={!isConnected}
                    >
                      จัด
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {statusMessage && <p className="text-lg font-semibold">{statusMessage}</p>}
    </div>
  );
};

export default QueueList;

// import React, { useState, useEffect } from 'react';

// const QueueList: React.FC = () => {
//   const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
//   const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
//   const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
//   const [message, setMessage] = useState('');
//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [statusMessage, setStatusMessage] = useState<string | null>(null);

//   // ฟังก์ชันเชื่อมต่อ WebSocket
//   const connectWebSocket = () => {
//     const ws = new WebSocket('ws://localhost:8080');

//     ws.onopen = () => {
//       console.log('✅ WebSocket Connected!');
//       setIsConnected(true);
//     };

//     ws.onmessage = (event) => {
//       const data = event.data;

//       // ตรวจสอบว่าเป็น Buffer
//       if (data instanceof Buffer) {
//         const jsonString = data.toString('utf-8');
//         console.log('📥 Received WebSocket message:', jsonString);

//         try {
//           // แปลงข้อความเป็น JSON
//           const json = JSON.parse(jsonString);
//           console.log('📥 Parsed JSON:', json);

//           // ตรวจสอบว่า JSON ที่ได้รับมีข้อมูลที่ต้องการหรือไม่
//           if (json && json.status && json.floor && json.position) {
//             console.log('✅ Valid PLC response:', json);

//             // ตรวจสอบสถานะของ PLC
//             if (json.status === 'preparing') {
//               console.log('PLC Status: กำลังจัดยา');
//             } else if (json.status === 'done') {
//               console.log('PLC Status: จัดยาเสร็จ');
//             } else {
//               console.log('PLC Status: อื่นๆ');
//             }
//           } else {
//             console.error('⚠️ Invalid PLC response format:', json);
//           }
//         } catch (error) {
//           console.error('⚠️ Error parsing JSON:', error);
//         }
//       } else {
//         console.error('⚠️ Received data is not a valid Buffer:', data);
//       }
//     };

//     ws.onclose = () => {
//       console.log('❌ WebSocket Disconnected! Reconnecting...');
//       setIsConnected(false);
//       setTimeout(() => connectWebSocket(), 5000); // เชื่อมต่อใหม่ทุก 5 วินาที
//     };

//     ws.onerror = (error) => console.error('⚠️ WebSocket Error:', error);

//     setSocket(ws);
//   };

//   useEffect(() => {
//     connectWebSocket();
//     return () => {
//       if (socket) socket.close();
//     };
//   }, []);

//   // ฟังก์ชันส่งคำสั่งไป WebSocket
//   const sendCommand = (floor: number, position: number) => {
//     if (!socket || socket.readyState !== WebSocket.OPEN) {
//       console.error('⚠️ WebSocket not connected!');
//       return;
//     }

//     const key = `${floor}-${position}`;
//     const qty = quantities[key] || 1;

//     const command = { floor, position, qty, status: 'preparing' };
//     console.log('📤 Sending Command:', command);
//     socket.send(JSON.stringify(command)); // ส่งคำสั่งไปยัง WebSocket Server
//     setStatusMessage('✅ คำสั่งส่งไปยัง PLC สำเร็จ');
//   };

//   const handleQuantityChange = (floor: number, position: number, delta: number) => {
//     const key = `${floor}-${position}`;
//     setQuantities((prev) => ({
//       ...prev,
//       [key]: Math.max((prev[key] || 0) + delta, 0),
//     }));
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <button
//         onClick={connectWebSocket}
//         disabled={isConnected}
//         className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50"
//       >
//         🔄 Reconnect
//       </button>

//       {[...Array(7)].map((_, i) => {
//         const floorIndex = 7 - i;
//         return (
//           <div key={floorIndex} className="space-y-2">
//             <h2 className="text-xl font-semibold">ชั้นที่ {floorIndex}</h2>
//             <div className="grid grid-cols-12 gap-2">
//               {[...Array(12)].map((_, positionIndex) => {
//                 const key = `${floorIndex}-${positionIndex + 1}`;
//                 return (
//                   <div
//                     key={positionIndex}
//                     className={`p-3 border rounded-lg shadow-md flex flex-col items-center space-y-2 cursor-pointer ${
//                       selectedFloor === floorIndex && selectedPosition === positionIndex + 1
//                         ? 'bg-blue-100 '
//                         : 'bg-white'
//                     }`}
//                     onClick={() => {
//                       setSelectedFloor(floorIndex);
//                       setSelectedPosition(positionIndex + 1);
//                     }}
//                   >
//                     <p>ช่องที่ {positionIndex + 1}</p>
//                     <div className="flex items-center space-x-1">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleQuantityChange(floorIndex, positionIndex + 1, -1);
//                         }}
//                         className="bg-red-500 text-white px-2 rounded"
//                         disabled={(quantities[key] || 0) <= 0}
//                       >
//                         -
//                       </button>
//                       <span>{quantities[key] || 0}</span>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleQuantityChange(floorIndex, positionIndex + 1, 1);
//                         }}
//                         className="bg-green-500 text-white px-2 rounded"
//                       >
//                         +
//                       </button>
//                     </div>

//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         sendCommand(floorIndex, positionIndex + 1);
//                       }}
//                       className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
//                       disabled={!isConnected}
//                     >
//                       จัด
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );
//       })}
//       {statusMessage && <p className="text-lg font-semibold">{statusMessage}</p>}
//     </div>
//   );
// };

// export default QueueList;











// import React, { useEffect, useState } from 'react';

// const QueueList: React.FC = () => {
//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   const [message, setMessage] = useState('');
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:8080');

//     ws.onopen = () => {
//       console.log('✅ WebSocket Connected!');
//       setIsConnected(true);
//     };
//     ws.onmessage = (event) => {
//       console.log('📥 Response:', event.data);
//       setMessage(event.data);
//     };
//     ws.onclose = () => {
//       console.log('❌ WebSocket Disconnected!');
//       setIsConnected(false);
//     };
//     ws.onerror = (error) => console.error('⚠️ WebSocket Error:', error);

//     setSocket(ws);

//     // Cleanup function to close the socket when the component is unmounted
//     return () => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.close();
//       }
//     };
//   }, []);

//   const sendCommand = () => {
//     if (!socket || !isConnected) {
//       console.error('⚠️ WebSocket not connected!');
//       return;
//     }

//     const command = {
//       floor: 1,
//       position: 10,
//       qty: 2
//     };

//     console.log('📤 Sending Command:', command);
//     socket.send(JSON.stringify(command));
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <button
//         onClick={sendCommand}
//         className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         disabled={!isConnected} // Disable button if WebSocket is not connected
//       >
//         ส่งคำสั่งไปยัง PLC
//       </button>

//       {message && <p className="text-green-600">📩 ตอบกลับจาก Server: {message}</p>}
      
//       {!isConnected && <p className="text-red-600">❌ WebSocket not connected</p>}
//     </div>
//   );
// };

// export default QueueList;


// "use client";
// //good work

// import { useEffect, useState, useRef } from "react";

// const Chat = ({ roomId, userType }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (!roomId) return;

//     const storedMessages = JSON.parse(localStorage.getItem(roomId)) || [];
//     setMessages(storedMessages);
//   }, [roomId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (!newMessage.trim()) return;

//     const messageData = {
//       text: newMessage.trim(),
//       sender: userType,
//       timestamp: new Date().toISOString(),
//     };

//     const updatedMessages = [...messages, messageData];
//     setMessages(updatedMessages);
//     localStorage.setItem(roomId, JSON.stringify(updatedMessages));
//     setNewMessage("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="flex flex-col h-[450px] w-full border rounded-md shadow-md overflow-hidden bg-gray-50">
//       {/* Messages */}
//       <div className="flex-1 p-4 overflow-y-auto">
//         {messages.length === 0 ? (
//           <p className="text-center text-gray-400 mt-20">
//             No messages yet. Start the conversation!
//           </p>
//         ) : (
//           messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex ${
//                 msg.sender === userType ? "justify-end" : "justify-start"
//               } mb-2`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-lg max-w-xs break-words ${
//                   msg.sender === userType
//                     ? "bg-teal-500 text-white"
//                     : "bg-gray-300 text-gray-800"
//                 }`}
//               >
//                 {msg.text}
//                 <div className="text-[10px] text-right mt-1 opacity-70">
//                   {new Date(msg.timestamp).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="border-t flex items-center p-2 bg-white">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           className="flex-1 p-2 border rounded-md mr-2 focus:outline-teal-500"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={handleKeyPress}
//         />
//         <button
//           onClick={handleSendMessage}
//           disabled={!newMessage.trim()}
//           className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 disabled:opacity-50 transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// "use client";

// import { socket } from "@/lib/socket";
// import { useEffect, useState, useRef } from "react";

// const Chat = ({ roomId, userType }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (!roomId) return;

//     console.log("Joining Room:", roomId);
//     socket.emit("joinRoom", roomId);

//     socket.on("receiveMessage", (data) => {
//       console.log("Received Message:", data);
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       console.log("Leaving Room:", roomId);
//       socket.emit("leaveRoom", roomId);
//       socket.off("receiveMessage");
//     };
//   }, [roomId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (message.trim() === "") return;
//     const messageData = {
//       roomId,
//       content: message,
//     };
//     console.log("Sending Message:", messageData);
//     socket.emit("sendMessage", messageData);
//     setMessages((prev) => [...prev, { content: message, self: true }]);
//     setMessage("");
//   };
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="flex flex-col h-[450px] w-full border rounded-md shadow-md overflow-hidden bg-gray-50">
//       {/* Messages */}
//       <div className="flex-1 p-4 overflow-y-auto">
//         {messages.length === 0 ? (
//           <p className="text-center text-gray-400 mt-20">
//             No messages yet. Start the conversation!
//           </p>
//         ) : (
//           messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex ${
//                 msg.sender === userType ? "justify-end" : "justify-start"
//               } mb-2`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-lg max-w-xs break-words ${
//                   msg.sender === userType
//                     ? "bg-teal-500 text-white"
//                     : "bg-gray-300 text-gray-800"
//                 }`}
//               >
//                 {msg.text}
//                 <div className="text-[10px] text-right mt-1 opacity-70">
//                   {new Date(msg.timestamp).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="border-t flex items-center p-2 bg-white">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           className="flex-1 p-2 border rounded-md mr-2 focus:outline-teal-500"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={handleKeyPress}
//         />
//         <button
//           onClick={handleSendMessage}
//           disabled={!newMessage.trim()}
//           className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 disabled:opacity-50 transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

//for testing after added state
// "use client";

// import { socket } from "@/lib/socket";
// import { useEffect, useState, useRef } from "react";

// const Chat = ({ roomId, userType }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState(""); // newMessage for the current message
//   const messagesEndRef = useRef(null);

//   // Join room and listen for messages
//   useEffect(() => {
//     if (!roomId) return;

//     console.log("Joining Room:", roomId);
//     socket.emit("joinRoom", roomId);

//     socket.on("receiveMessage", (data) => {
//       console.log("Received Message:", data);
//       setMessages((prev) => [...prev, data]); // Append new message to the state
//     });

//     return () => {
//       console.log("Leaving Room:", roomId);
//       socket.emit("leaveRoom", roomId);
//       socket.off("receiveMessage");
//     };
//   }, [roomId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Send message
//   const handleSendMessage = () => {
//     if (newMessage.trim() === "") return;
//     const messageData = {
//       roomId,
//       content: newMessage, // Use the correct field name
//       timestamp: new Date().toISOString(), // Add timestamp to the message
//       sender: userType, // Indicate who sent the message
//     };
//     console.log("Sending Message:", messageData);
//     socket.emit("sendMessage", messageData);
//     setMessages((prev) => [
//       ...prev,
//       {
//         content: newMessage,
//         self: true,
//         timestamp: messageData.timestamp,
//         sender: userType,
//       },
//     ]); // Append the sent message to the state
//     setNewMessage(""); // Clear the input after sending
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="flex flex-col h-[450px] w-full border rounded-md shadow-md overflow-hidden bg-gray-50">
//       {/* Messages */}
//       <div className="flex-1 p-4 overflow-y-auto">
//         {messages.length === 0 ? (
//           <p className="text-center text-gray-400 mt-20">
//             No messages yet. Start the conversation!
//           </p>
//         ) : (
//           messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex ${
//                 msg.sender === userType ? "justify-end" : "justify-start"
//               } mb-2`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-lg max-w-xs break-words ${
//                   msg.sender === userType
//                     ? "bg-teal-500 text-white"
//                     : "bg-gray-300 text-gray-800"
//                 }`}
//               >
//                 {msg.content} {/* Corrected the message property */}
//                 <div className="text-[10px] text-right mt-1 opacity-70">
//                   {new Date(msg.timestamp).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="border-t flex items-center p-2 bg-white">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           className="flex-1 p-2 border rounded-md mr-2 focus:outline-teal-500"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={handleKeyPress}
//         />
//         <button
//           onClick={handleSendMessage}
//           disabled={!newMessage.trim()}
//           className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 disabled:opacity-50 transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

"use client";

import { socket } from "@/lib/socket";
import { useEffect, useState, useRef } from "react";

const Chat = ({ roomId, userType }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Join room and listen for messages
  useEffect(() => {
    if (!roomId) return;

    console.log("Joining Room:", roomId);
    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (data) => {
      console.log("Received Message:", data);
      setMessages((prev) => [...prev, data]); // Update state with the received message
    });

    return () => {
      console.log("Leaving Room:", roomId);
      socket.emit("leaveRoom", roomId);
      socket.off("receiveMessage");
    };
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const messageData = {
      roomId,
      content: newMessage, // Use content here
      timestamp: new Date().toISOString(),
      sender: userType, // Add sender field
    };
    console.log("Sending Message:", messageData);
    socket.emit("sendMessage", messageData);
    setMessages((prev) => [
      ...prev,
      {
        content: newMessage,
        self: true,
        timestamp: messageData.timestamp,
        sender: userType,
      },
    ]);
    setNewMessage(""); // Clear input
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-[450px] w-full border rounded-md shadow-md overflow-hidden bg-gray-50">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === userType ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                  msg.sender === userType
                    ? "bg-teal-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {msg.content} {/* Changed from msg.text to msg.content */}
                <div className="text-[10px] text-right mt-1 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t flex items-center p-2 bg-white">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-md mr-2 focus:outline-teal-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 disabled:opacity-50 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

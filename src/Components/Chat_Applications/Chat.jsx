import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { createSocketConnection } from "../../WebSocket/SocketClient";
import axios from "axios";
import { BASE_URL } from "../../utils/Constants";
import { toast } from "react-toastify";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const { targetUserId } = useParams();
  const { state } = useLocation();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [lastSeenTimes, setLastSeenTimes] = useState({});
  const socketRef = useRef(null);

  const sender = state?.sender;
  const receiver = state?.receiver;

  const senderId = sender?._id;

  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      if (data.messages) {
        setMessages(
          data.messages.map((msg) => ({
            firstName: msg.senderId.firstName,
            text: msg.text,
            sender: msg.senderId._id === senderId ? "me" : "them",
            avatar:
              msg.senderId._id === senderId
                ? sender.photoUrl
                : receiver.photoUrl,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }))
        );
      }
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  // Scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Socket connection
  useEffect(() => {
    if (!senderId) return;
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: sender.firstName,
      senderId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((prev) => [
        ...prev,
        {
          firstName,
          text,
          sender: firstName === sender.firstName ? "me" : "them",
          avatar:
            firstName === sender.firstName
              ? sender.photoUrl
              : receiver.photoUrl,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    socket.on("updateOnlineUsers", ({ online, lastSeen }) => {
      setOnlineUsers(online);
      setLastSeenTimes(lastSeen || {});
    });

    return () => socket.disconnect();
  }, [senderId, targetUserId]);

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: sender.firstName,
      senderId,
      targetUserId,
      text: newMessage,
    });

    // Listen for error message from backend
    socketRef.current.once("errorMessage", ({ message }) => {
      toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });

    setNewMessage("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl shadow-lg mt-4 sm:mt-6 h-[80vh] md:h-[75vh] lg:h-[70vh] flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-700 flex items-center gap-3">
        <div className="avatar">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
            <img src={receiver?.photoUrl} alt={receiver?.firstName} />
          </div>
        </div>
        <h1 className="text-md sm:text-xl font-bold flex items-center gap-2">
          Chat with {receiver?.firstName}
          <span
            className={`w-3 h-3 rounded-full ${
              onlineUsers.includes(receiver._id)
                ? "bg-green-500"
                : "bg-gray-500"
            }`}
          ></span>
          {!onlineUsers.includes(receiver._id) &&
            lastSeenTimes[receiver._id] && (
              <span className="text-xs text-gray-400 ml-2">
                Last seen:{" "}
                {new Date(lastSeenTimes[receiver._id]).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {messages.map((msg, index) => (
          <div
            key={index}
            ref={messagesEndRef}
            className={`chat ${
              msg.sender === "me" ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                <img src={msg.avatar} alt={msg.firstName} />
              </div>
            </div>
            <div className="chat-header text-sm sm:text-base">
              {msg.firstName}
              <time className="text-xs opacity-50 ml-2">{msg.time}</time>
            </div>
            <div
              className={`chat-bubble text-sm sm:text-base ${
                msg.sender === "me"
                  ? "chat-bubble-primary"
                  : "chat-bubble-secondary"
              }`}
            >
              {msg.text}
            </div>
            <div className="chat-footer opacity-50 text-xs">
              {msg.sender === "me" ? "Sent" : "Seen"}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-2 sm:p-4 border-t border-gray-700 flex items-center gap-2 bg-gray-800">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 input input-bordered input-sm sm:input-md bg-gray-900 text-white border-gray-600"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="btn btn-primary px-4 sm:px-6 py-1 sm:py-2 text-sm sm:text-base"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

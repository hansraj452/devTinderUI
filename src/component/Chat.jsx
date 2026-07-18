import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { CONSTANT } from "../utils/constant";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import useOnlineStatus from "../utils/useOnlineStatus";

const Chat = () => {
  const { targetUserId } = useParams();
  
  // FIX: Added parentheses to call the custom hook
  const isOnline = useOnlineStatus(); 

  const loggedInUser = useSelector((store) => store.user);
  const userId = loggedInUser?._id;

  const [user, setUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const socketRef = useRef(null);
  
  // 1. Create a ref for the bottom of the chat
  const chatEndRef = useRef(null);

  // 2. Scroll to bottom whenever messages list updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        CONSTANT.BASE_URL + "/user/" + targetUserId
      );
      setUser(res.data);
    };

    fetchUser();

    if (!userId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      userId,
      targetUserId,
    });

    socketRef.current.on("msgReceived", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.off("msgReceived");
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await axios.get(
          CONSTANT.BASE_URL + "/chat/" + targetUserId,
          {
            withCredentials: true,
          }
        );

        const chatMessages = res.data.messages.map((msg) => ({
          _id: msg._id,
          userId: msg.senderId._id,
          firstName: msg.senderId.firstName,
          lastName: msg.senderId.lastName,
          text: msg.text,
          createdAt: msg.createdAt,
        }));

        setMessages(chatMessages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChat();
  }, [targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: loggedInUser.firstName,
      userId,
      targetUserId,
      text: newMessage,
      userOnline: isOnline
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[650px] max-w-lg mx-auto border bg-base-100">

      <div className="flex items-center gap-4 p-4 border-b">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={user?.photoURL} alt="" />
          </div>
        </div>
        <div>
          {isOnline ? "🟢 Online" : "🔴 Offline"}
        </div>

        <h2 className="font-bold">
          {user?.firstName} {user?.lastName}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto bg-base-200 p-5 space-y-2">
        {messages.map((msg) => {
          const isMine = msg.userId === userId;

          return (
            <div
              key={msg._id}
              className={`flex ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl shadow ${
                  isMine
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-white text-black rounded-bl-sm"
                }`}
              >
                {!isMine && (
                  <p className="text-xs px-3 font-semibold mb-1 text-gray-500">
                    {msg.firstName} {msg.lastName}
                  </p>
                )}

                <p className="break-words">{msg.text}</p>

                {msg.createdAt && (
                  <p
                    className={`text-[11px] mt-2 text-right ${
                      isMine ? "text-gray-200" : "text-gray-500"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        
        {/* 3. Empty div anchor that stays at the bottom of the messages list */}
        <div ref={chatEndRef} />
      </div>

      <form
        className="p-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          className="input input-bordered flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button className="btn btn-primary">
          Send
        </button>
      </form>

    </div>
  );
};

export default Chat;
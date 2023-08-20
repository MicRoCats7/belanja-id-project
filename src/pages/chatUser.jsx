import React from "react";
import "../style/chatUser.css";
import SidebarChatUser from "../component/sidebar/sidebarChatUser";
import Navbar from "../component/navbar/navbar";
import { BiSend } from "react-icons/bi";
import imgChat from "../assets/image/shopping-bag-chat.svg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import apiurl from "../utils/apiurl";
import token from "../utils/token";
import { useParams } from "react-router-dom";

function ChatUser() {
  const { to_id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user_id = localStorage.getItem("user_id");
  const [senderId, setSenderId] = useState(user_id);
  const [receiverId, setReceiverId] = useState(to_id);
  const [lastTimestamp, setLastTimestamp] = useState(null);

  useEffect(() => {
    setReceiverId(to_id);
    getMessages();
  }, [to_id]);

  function getMessages() {
    axios
      .get(
        apiurl() +
          `chatify/messages?from_id=${senderId}&to_id=${receiverId}&timestamp=${
            lastTimestamp || ""
          }`,
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setMessages(response.data.data);
          const newMessages = response.data.data.filter(
            (message) => !lastTimestamp || message.created_at > lastTimestamp
          );
          if (newMessages.length > 0) {
            setLastTimestamp(newMessages[newMessages.length - 1].created_at);
          }
          setMessages([...messages, ...newMessages]);
        } else {
          console.log("Error getting messages:", response);
        }
        console.log("Data pesan dari server:", response.data.data);
      })
      .catch((error) => console.error(error));
  }

  console.log("Data pesan", messages);

  const handleSendMessage = () => {
    const messageData = {
      sender_id: senderId,
      receiver_id: receiverId,
      message: newMessage,
      is_seen: 0,
    };

    axios
      .post(apiurl() + "chatify/messages", messageData, {
        headers: {
          Authorization: `Bearer ${token()}`,
          "Content-Type": "application/json", // Set tipe konten
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setMessages([...messages, response.data.data]);
          setNewMessage("");
        } else {
          console.log("Error sending message:", response);
        }
      })
      .catch((error) => console.error(error));
  };

  const renderChat = (message) => {
    const isFromMe = message.from_id.toString() === senderId;

    return (
      <div
        className={`message-container ${
          isFromMe ? "message-container-right" : "message-container-left"
        }`}
        key={message.id}
      >
        <div className="message-content">{message.body}</div>
        <div className="message-info">{isFromMe ? "Anda" : "Penjual"}</div>
      </div>
    );
  };

  const renderHeader = () => {
    const toUserInfo = messages.length > 0 ? messages[0].to_user.store : {};
    const storeInfo = messages.length > 0 ? messages[0].to_user.store : {};

    return (
      <div className="header-name-chat-user">
        <div className="img-chat-user">
          <img src={toUserInfo.logo} alt="Toko Profile" />
        </div>
        <div className="name-chat-user">
          <h3>{storeInfo.name}</h3>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container-chat-user">
        <SidebarChatUser />
        <div className="chat">
          {renderHeader()}
          <div className="content-chat-user-toko">
            {messages.map(renderChat)}
          </div>
          <div className="input-reply-chat-user">
            <input
              type="text"
              placeholder="Tulis pesan..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <BiSend style={{ cursor: "pointer" }} onClick={handleSendMessage} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatUser;

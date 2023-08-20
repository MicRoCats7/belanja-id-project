import React, { useState } from "react";
import "../style/chtToko.css";
import SidebarChat from "../component/sidebar/sidebarChat";
import imgChat from "../assets/image/shopping-bag-chat.svg";
import { BiSend } from "react-icons/bi";
import token from "../utils/token";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { useEffect } from "react";

function ChatToko() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user_id = localStorage.getItem("user_id");
  const [senderId, setSenderId] = useState(1);
  const [receiverId, setReceiverId] = useState(user_id);
  const [lastTimestamp, setLastTimestamp] = useState(null);

  useEffect(() => {
    getMessages();
  }, []);

  console.log("Data pesan user", messages);

  function getMessages() {
    axios
      .get(
        apiurl() +
          `chatify/messages?from_id=${receiverId}&to_id=${senderId}&timestamp=${
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
    const isFromMe = message.from_id.toString() === receiverId;
    const isToMe = message.to_user.id.toString() === senderId;

    return (
      <div
        className={`message-container ${
          isFromMe ? "message-container-right" : "message-container-left"
        }`}
        key={message.id}
      >
        <div className="message-content">{message.body}</div>
        <div className="message-info">
          {isFromMe ? "Anda" : isToMe ? "Penjual" : message.to_user.name}
        </div>
      </div>
    );
  };

  return (
    <div className="container-chat">
      <SidebarChat />
      <div className="chat">
        <div className="header-name-chat-user">
          <div className="img-chat-user">
            <img src={imgChat} alt="" />
          </div>
          <div className="name-chat-user">
            <h3>Amri Iqra</h3>
          </div>
        </div>
        <div className="content-chat-user-toko">{messages.map(renderChat)}</div>
        <div className="input-reply-chat-user">
          <input type="text" placeholder="Tulis pesan..." />
          <BiSend style={{ cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
}

export default ChatToko;

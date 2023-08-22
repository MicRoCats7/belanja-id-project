import React, { useEffect } from "react";
import "../../style/sidebarChatUser.css";
import { CiSearch } from "react-icons/ci";
import imgChat from "../../assets/image/shopping-bag-chat.svg";
import { useState } from "react";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import token from "../../utils/token";
import Pusher from "pusher-js";

function SidebarChatToko({ onChatClick, pusherClient }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const user_id = localStorage.getItem("user_id");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const channel = pusherClient.subscribe(`chat-channel-${user_id}`);
    channel.bind("new-message", (data) => {
      const updatedChats = chats.map((c) =>
        c.id === data.chat_id ? { ...c, latest_message: data.message } : c
      );
      setChats(updatedChats);
    });

    return () => {
      channel.unbind("new-message");
      pusherClient.unsubscribe(`chat-channel-${user_id}`);
    };
  }, [chats, pusherClient, user_id]);

  useEffect(() => {
    getChats();
  }, []);

  const handleChatClick = (chatIndex, userId) => {
    setSelectedChat(chatIndex);
    onChatClick(userId);
  };

  const getChats = () => {
    axios
      .get(apiurl() + `chatify/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        setChats(response.data.data);
        console.log("Data chat dari server:", response.data.data);
      })
      .catch((error) => {
        console.error("Error getting chats:", error);
      });
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  console.log(chats);

  return (
    <div className="container-sidebarChat">
      <div className="sidebarChat">
        <div className="top-sectionChat">
          <h3>Chat</h3>
          <div className="searchChat">
            <input type="text" placeholder="Cari Chat" />
            <CiSearch />
          </div>
        </div>
        <div className="list-chat">
          {chats.map((chat, index) => (
            <div
              className={`chat-column ${
                selectedChat === index ? "active" : ""
              }`}
              key={index}
              onClick={() => handleChatClick(index, chat.id)}
            >
              <div className="img-chat">
                <img src={chat.profile_photo_path} alt="" />
              </div>
              <div className="content-chat">
                <div className="chat-top">
                  <div className="namechat">
                    <h4>{chat.name}</h4>
                    <p>{formatTime(chat.created_at)}</p>
                  </div>
                </div>
                <div className="chat-bottom">
                  <p>{chat.latest_message.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SidebarChatToko;

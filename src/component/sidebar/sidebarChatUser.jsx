import React, { useEffect } from "react";
import "../../style/sidebarChatUser.css";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import token from "../../utils/token";
import { useParams } from "react-router-dom";

function SidebarChatUser() {
  const [selectedChat, setSelectedChat] = useState(null);
  const user_id = localStorage.getItem("user_id");
  const [chats, setChats] = useState([]);
  const to_id = useParams().to_id;

  useEffect(() => {
    getChats(); // Panggil fungsi getChats saat komponen dimount
  }, []);

  const handleChatClick = (chatIndex) => {
    setSelectedChat(chatIndex); // Update selected chat when a chat is clicked
  };

  console.log("Data chat", chats);

  const getChats = () => {
    axios
      .get(
        apiurl() +
          `chatify/messages?from_id=${user_id}&to_id=${to_id}&last=true`,
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      )
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
              onClick={() => handleChatClick(index)}
            >
              <div className="img-chat">
                <img src={chat.to_user.store.logo} alt="" />
              </div>
              <div className="content-chat">
                <div className="chat-top">
                  <div className="namechat">
                    <h4>{chat.to_user.store.name}</h4>
                    <p>{formatTime(chat.created_at)}</p>
                  </div>
                </div>
                <div className="chat-bottom">
                  <p>{chat.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SidebarChatUser;

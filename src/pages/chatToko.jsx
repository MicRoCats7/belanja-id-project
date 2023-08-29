import React, { useState } from "react";
import "../style/chtToko.css";
import imgChat from "../assets/image/shopping-bag-chat.svg";
import { BiSend } from "react-icons/bi";
import token from "../utils/token";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { useEffect } from "react";
import Pusher from "pusher-js";
import LoadingSpinner from "../component/loader/LoadingSpinner";

function ChatToko({ selectedChatId, pusherClient }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user_id = localStorage.getItem("user_id");
  const [senderId, setSenderId] = useState(user_id);
  const [receiverId, setReceiverId] = useState(selectedChatId);
  const [storeInfo, setStoreInfo] = useState({
    name: "",
    logo: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const isChatSelected = selectedChatId !== null;

  useEffect(() => {
    if (isChatSelected) {
      setIsLoading(true);
      setReceiverId(selectedChatId);
      getMessages(selectedChatId);
    }
  }, [selectedChatId, isChatSelected]);

  useEffect(() => {
    if (isChatSelected) {
      const channel = pusherClient.subscribe(`chat-channel-${receiverId}`);
      channel.bind("new-message", (data) => {
        const updatedMessages = [...messages, data];
        setMessages(updatedMessages);
      });

      return () => {
        channel.unbind("new-message");
        pusherClient.unsubscribe(`chat-channel-${receiverId}`);
      };
    }
  }, [receiverId, messages, pusherClient, isChatSelected]);

  console.log("Data pesan user", messages);

  function getMessages(chatId) {
    axios
      .get(apiurl() + `chatify/users/${chatId}/messages`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        setMessages(response.data.data.messages);
        setStoreInfo({
          name: response.data.data.other_user.user_data.name,
          logo: response.data.data.other_user.user_data.profile_photo_path,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error getting messages:", error);
      });
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
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const newMessageData = response.data.data;
          getMessages(receiverId);
          setMessages((prevMessages) => [...prevMessages, newMessageData]);
          setNewMessage("");
        } else {
          console.log("Error sending message:", response);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error getting messages:", error);
      });
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-spinner-chats">
          <LoadingSpinner />
        </div>
      ) : isChatSelected ? (
        <div className="chat">
          <div className="header-name-chat-user">
            <div className="img-chat-user">
              <img src={storeInfo.logo} alt="Toko Profile" />
            </div>
            <div className="name-chat-user">
              <h3>{storeInfo.name}</h3>
            </div>
          </div>
          <div className="content-chat-user-toko">
            {Array.isArray(messages) &&
              messages.map((message, index) => (
                <div
                  className={`message-container ${
                    message.user_id && message.user_id.toString() === senderId
                      ? "message-container-right"
                      : "message-container-left"
                  }`}
                  key={message.id}
                >
                  <div className="message-content">{message.message}</div>
                  <div className="message-info">{message.user}</div>
                </div>
              ))}
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
      ) : (
        <div className="imgchat-not-selected">
          <img src={imgChat} alt="" />
          <h1>Mari memulai obrolan!</h1>
          <p>Pilih pesan di samping untuk mulai chat dengan Pembeli.</p>
        </div>
      )}
    </>
  );
}

export default ChatToko;

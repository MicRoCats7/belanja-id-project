import React, { useState } from "react";
import SidebarChatUser from "../component/sidebar/sidebarChatUser";
import ChatUser from "../pages/chatUser";
import Pusher from "pusher-js";

function MainChat() {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const pusherClient = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  });

  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="container-chat-user">
      <SidebarChatUser
        onChatClick={handleChatClick}
        pusherClient={pusherClient}
      />
      <ChatUser selectedChatId={selectedChatId} pusherClient={pusherClient} />
    </div>
  );
}

export default MainChat;

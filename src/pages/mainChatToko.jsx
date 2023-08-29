import React, { useState } from "react";
import SidebarChatToko from "../component/sidebar/sidebarChat";
import ChatToko from "./chatToko";
import "../style/chtToko.css";
import Pusher from "pusher-js";

function MainChatToko() {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const pusherClient = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  });

  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="container-chat">
      <SidebarChatToko
        onChatClick={handleChatClick}
        pusherClient={pusherClient}
      />
      <ChatToko selectedChatId={selectedChatId} pusherClient={pusherClient} />
    </div>
  );
}

export default MainChatToko;

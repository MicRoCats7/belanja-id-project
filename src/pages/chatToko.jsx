import React from "react";
import SidebarChat from "../component/sidebar/sidebarChat";
import imgChat from "../assets/image/shopping-bag-chat.svg";
import "../style/chtToko.css";

function ChatToko() {
  return (
    <div className="container-chat">
      <SidebarChat />
      <div className="chat">
        <div className="imgchat">
          <img src={imgChat} alt="" />
          <h3>Mari Memulai Obrolan</h3>
          <p>Pilih pesan di samping untuk mulai chat dengan Pembeli.</p>
        </div>
      </div>
    </div>
  );
}

export default ChatToko;

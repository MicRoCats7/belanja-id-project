import React from "react";
import imgChat from "../../assets/image/shopping-bag-chat.svg";
import "../../style/sidebarChat.css";
import { CiSearch } from "react-icons/ci";

function SidebarChat() {
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
          <div className="chat-column">
            <div className="img-chat">
              <img src={imgChat} alt="" />
            </div>
            <div className="content-chat">
              <div className="chat-top">
                <div className="namechat">
                  <h4>Chat 1</h4>
                  <p>20 Mar</p>
                </div>
              </div>
              <div className="chat-bottom">
                <p>Barang Sudah Dikirim!</p>
              </div>
            </div>
          </div>
          <div className="chat-column">
            <div className="img-chat">
              <img src={imgChat} alt="" />
            </div>
            <div className="content-chat">
              <div className="chat-top">
                <div className="namechat">
                  <h4>Chat 2</h4>
                  <p>20 Mar</p>
                </div>
              </div>
              <div className="chat-bottom">
                <p>Barang Sudah Dikirim!</p>
              </div>
            </div>
          </div>
          <div className="chat-column">
            <div className="img-chat">
              <img src={imgChat} alt="" />
            </div>
            <div className="content-chat">
              <div className="chat-top">
                <div className="namechat">
                  <h4>Chat 3</h4>
                  <p>20 Mar</p>
                </div>
              </div>
              <div className="chat-bottom">
                <p>Barang Sudah Dikirim!</p>
              </div>
            </div>
          </div>
          <div className="chat-column">
            <div className="img-chat">
              <img src={imgChat} alt="" />
            </div>
            <div className="content-chat">
              <div className="chat-top">
                <div className="namechat">
                  <h4>Chat 4</h4>
                  <p>20 Mar</p>
                </div>
              </div>
              <div className="chat-bottom">
                <p>Barang Sudah Dikirim!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarChat;

import React from "react";
import "../../style/sidebarChatUser.css";
import Skeleton from "react-loading-skeleton";

function SidebarChatUserSkeleton() {
  return (
    <div className="sidebarChat">
      <div className="top-sectionChat">
        <Skeleton width={100} height={40} />
        <Skeleton width={250} height={40} style={{ marginTop: "10px" }} />
      </div>
      <div className="list-chat">
        {[1, 2, 3].map((index) => (
          <div className="chat-column skeleton" key={index}>
            <div className="img-chat">
              <Skeleton circle={true} height={50} width={50} />
            </div>
            <div className="content-chat">
              <div className="chat-top">
                <div className="namechat">
                  <h4>
                    <Skeleton width={100} />
                  </h4>
                  <p>
                    <Skeleton width={50} />
                  </p>
                </div>
              </div>
              <div className="chat-bottom">
                <p>
                  <Skeleton width={200} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarChatUserSkeleton;

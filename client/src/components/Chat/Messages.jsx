import React from "react";
import "../../index.css";
import "../../index.scss";
import Message from "./Message";

const Messages = ({ messages, name }) => {
  return (
    <div className="messages" style={{ height: "80%" }}>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </div>
  );
};

export default Messages;

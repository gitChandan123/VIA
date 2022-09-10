import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  const ENDPOINT = "ws://localhost:5000";
  const [searchParams] = useSearchParams();
  let socket = useRef(null);
  const name = searchParams.get("name");
  const room = searchParams.get("room");
  //eslint-disable-next-line
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.current = io(ENDPOINT);
    if (room !== "" && name !== "") {
      socket.current.emit("join", { name, room }, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
    return () => {
      socket.current?.disconnect();
    }
    //eslint-disable-next-line
  },[])

  useEffect(() => {
    if (socket.current) {
      socket.current.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });

      socket.current.on("roomData", ({ users }) => {
        setUsers(users);
      });
    }
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.current.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <Box>
      <Messages messages={messages} name={name} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </Box>
  );
};

export default Chat;

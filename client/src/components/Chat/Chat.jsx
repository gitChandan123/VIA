import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import io from "socket.io-client";
import Input from "./Input";
import Messages from "./Messages";
import { usePostMessageMutation } from "../../redux/api";

const Chat = ({ userId, name, room, prevMessages }) => {
  const ENDPOINT = "ws://localhost:5000";
  let socket = useRef(null);
  const [postMessage] = usePostMessageMutation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(prevMessages);
  },[prevMessages])

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("join", { name, room }, (error) => {
      if (error) {
        console.log(error);
      }
    });
    return () => {
      socket.current?.disconnect();
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });
    }
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message) {
      socket.current.emit("sendMessage", message, () => setMessage(""));
      await postMessage({ userId, roomId: room, message });
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

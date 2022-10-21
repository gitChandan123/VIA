import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import io from "socket.io-client";
import Input from "./Input";
import Messages from "./Messages";
import { usePostMessageMutation } from "../../redux/api";

const Chat = ({ userId, name, room, prevMessages }) => {
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;
  let socket = useRef(null);
  const [postMessage] = usePostMessageMutation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    setMessages(prevMessages);
  }, [prevMessages]);

  useEffect(
    () =>
      scrollRef.current?.scrollIntoView({ block: "end", behaviour: "smooth" }),
    [messages]
  );

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("join", { name, room: room._id }, (error) => {
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
      await postMessage({ userId, roomId: room._id, message });
    }
  };

  return (
    <Box>
      <div style={{ minHeight: "70vh" }} ref={scrollRef}>
        <Messages messages={messages} name={name} />
      </div>
      <Input
        room={room}
        userId={userId}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </Box>
  );
};

export default Chat;

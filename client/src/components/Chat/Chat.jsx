import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import io from "socket.io-client";
import useSound from "use-sound";
import Lottie from "lottie-react";
import Input from "./Input";
import Messages from "./Messages";
import { usePostMessageMutation } from "../../redux/api";
import messageReceived from "../../static/received.mp3";
import messageSent from "../../static/sent.mp3";
import typingAnimation from "../../static/typing.json";

const Chat = ({ userId, name, room, prevMessages }) => {
  const [playReceived] = useSound(messageReceived);
  const [playSent] = useSound(messageSent);
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;
  let socket = useRef(null);
  const [postMessage] = usePostMessageMutation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    setMessages(prevMessages);
  }, [prevMessages]);

  useEffect(
    () =>
      scrollRef.current?.scrollIntoView({ block: "end", behaviour: "smooth" }),
    [messages, istyping]
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
        playReceived();
        setMessages((messages) => [...messages, message]);
      });
      socket.current.on("typing", () => setIsTyping(true));
      socket.current.on("stop-typing", () => setIsTyping(false));
    }
    //eslint-disable-next-line
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message) {
      socket.current.emit("sendMessage", message, () => setMessage(""));
      socket.current.emit("stop-typing");
      playSent();
      await postMessage({ userId, roomId: room._id, message });
    }
  };

  const typingHandler = (e) => {
    setMessage(e.target.value);

    if (!socket.current) return;

    if (!typing) {
      setTyping(true);
      socket.current.emit("typing");
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.current.emit("stop-typing");
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <Box ref={scrollRef}>
      <div style={{ minHeight: "70vh" }}>
        <Messages messages={messages} name={name} />
        {istyping && (
          <Lottie
            animationData={typingAnimation}
            loop={true}
            style={{ height: 120, width: 150 }}
          />
        )}
      </div>
      <Input
        room={room}
        userId={userId}
        message={message}
        setMessage={setMessage}
        typingHandler={typingHandler}
        sendMessage={sendMessage}
      />
    </Box>
  );
};

export default Chat;

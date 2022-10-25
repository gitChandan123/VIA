import React, { useEffect, useState, useRef } from "react";
import { Box, Fab } from "@mui/material";
import io from "socket.io-client";
import useSound from "use-sound";
import Lottie from "lottie-react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Input from "./Input";
import Messages from "./Messages";
import { usePostMessageMutation } from "../../redux/api";
import messageReceived from "../../static/received.mp3";
import messageSent from "../../static/sent.mp3";
import call from "../../static/call.mp3";
import typingAnimation from "../../static/typing.json";
import { useSelector } from "react-redux";
import { callActive } from "../../redux/callreducer";

const Chat = ({ userId, name, room, prevMessages }) => {
  const [playReceived] = useSound(messageReceived);
  const [playSent] = useSound(messageSent);
  const [playCall] = useSound(call);

  const ENDPOINT = process.env.REACT_APP_ENDPOINT;
  let socket = useRef(null);
  const [postMessage] = usePostMessageMutation();
  const inCall = useSelector(callActive);
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

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ block: "end", behaviour: "smooth" });
  };

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("join", { name, userId, room: room._id }, (error) => {
      if (error) {
        console.error(error);
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
      socket.current.on("call", () => {
        if (!inCall) {
          playCall();
        }
      });
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
      <div style={inCall ? { minHeight: "85vh" } : { minHeight: "70vh" }}>
        <Messages messages={messages} name={name} userId={userId} />
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
      <Fab
        size="small"
        color="primary"
        aria-label="scroll-to-bottom"
        onClick={scrollToBottom}
        sx={{ position: "fixed", right: "10px", bottom: "70px" }}
      >
        <KeyboardArrowDownIcon fontSize="small" />
      </Fab>
    </Box>
  );
};

export default Chat;

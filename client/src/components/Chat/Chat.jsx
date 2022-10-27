import React, { useEffect, useState, useRef } from "react";
import { Box, Fab, IconButton } from "@mui/material";
import io from "socket.io-client";
import useSound from "use-sound";
import Lottie from "lottie-react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import Input from "./Input";
import Messages from "./Messages";
import { usePostMessageMutation } from "../../redux/api";
import messageReceived from "../../static/received.mp3";
import messageSent from "../../static/sent.mp3";
import call from "../../static/call.mp3";
import typingAnimation from "../../static/typing.json";
import callingAnimation from "../../static/call.json";
import { useSelector } from "react-redux";
import { callActive } from "../../redux/callreducer";
import { styled } from "@mui/system";
import { green, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Chat = ({ userId, name, room, prevMessages }) => {
  const [playReceived] = useSound(messageReceived);
  const [playSent] = useSound(messageSent);
  const [playCall, { stop }] = useSound(call);

  const ENDPOINT = process.env.REACT_APP_ENDPOINT;
  let socket = useRef(null);
  const navigate = useNavigate();
  const [postMessage] = usePostMessageMutation();
  const inCall = useSelector(callActive);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [showCall, setShowCall] = useState(false);
  let timeout = useRef(null);
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
          setShowCall(true);
          timeout.current = setTimeout(() => {
            setShowCall(false);
          }, 35000);
        }
      });
    }
    //eslint-disable-next-line
  }, []);

  const callPick = () => {
    clearTimeout(timeout.current);
    setShowCall(false);
    stop();
    navigate(`/video-call/${room._id}`);
  };

  const callCut = () => {
    clearTimeout(timeout.current);
    stop();
    setShowCall(false);
  };

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

  const GreenButton = styled(IconButton)(() => ({
    color: "#fff",
    borderRadius: "25px",
    margin: "2px",
    backgroundColor: green[900],
    "&:hover": {
      backgroundColor: green[800],
    },
  }));

  const RedButton = styled(IconButton)(() => ({
    color: "#fff",
    borderRadius: "25px",
    margin: "2px",
    backgroundColor: red[900],
    "&:hover": {
      backgroundColor: red[800],
    },
  }));

  return (
    <Box ref={scrollRef}>
      <div style={inCall ? { minHeight: "85vh" } : { minHeight: "70vh" }}>
        <Messages messages={messages} name={name} userId={userId} />

        {showCall && (
          <Box
            sx={{
              position: "fixed",
              bottom: "80px",
              right: "10px",
              zIndex: 1501,
              width: "300px",
              height: "200px",
              border: "solid black 1px",
              borderRadius: "20px",
              background:
                "linear-gradient(124deg, rgba(165,103,215,1) 0%, rgba(79,79,252,0.9416141456582633) 100%)",
            }}
          >
            <Lottie
              animationData={callingAnimation}
              loop={true}
              style={{ height: 120, width: 300 }}
            />
            <span className="d-flex justify-content-evenly">
              <GreenButton color="success" onClick={callPick}>
                <CallIcon fontSize="large" />
              </GreenButton>
              <RedButton color="error" onClick={callCut}>
                <CallEndIcon fontSize="large" />
              </RedButton>
            </span>
          </Box>
        )}

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

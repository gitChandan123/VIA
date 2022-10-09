import React from "react";
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import Rooms from "../../components/Rooms/Rooms";
import Navbar from "../../components/Navbar/Navbar";
import "./chatPage.css";

const ChatPage = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="home__container">
        <div className="home__leftbar">
          <Rooms />
        </div>
        <div className="home__root">
          <Container className="root__container">
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

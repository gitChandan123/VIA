import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import "../../index.scss";

const ChatPage = () => {
  const drawerWidth = 320;

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: "60px",
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,
        [theme.breakpoints.down(500)]: {
          display: "none",
        },
      }),
    })
  );

  const [open, setOpen] = useState(true);
  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <Main open={open}>
        <Outlet />
      </Main>
    </div>
  );
};

export default ChatPage;

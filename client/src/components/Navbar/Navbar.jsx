import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseIcon from "@mui/icons-material/Close";
import "./navbar.css";
import Rooms from "../Rooms/Rooms";
import "../../index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={6}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar className="appbar__toolbar">
          <IconButton
            disableRipple
            className="toolbar__iconbutton"
            onClick={() => setOpen(!open)}
          >
            {!open ? (
              <MenuRoundedIcon className="icon__menu" />
            ) : (
              <CloseIcon className="icon__menu" />
            )}
          </IconButton>
          <strong>VIA (Video Interaction Application)</strong>
          <Typography sx={{ flexGrow: 1 }}></Typography>
          <div className="toolbar__div">
            <button className="bn6" onClick={logout}>
              Logout
            </button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
        {open && <Rooms />}
      </Drawer>
    </>
  );
};

export default Navbar;

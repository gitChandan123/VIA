import { useNavigate } from "react-router-dom";
import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseIcon from "@mui/icons-material/Close";
import Rooms from "../Rooms/Rooms";
import "../../index.css";

const Navbar = ({ open, setOpen }) => {
  const navigate = useNavigate();

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
        <Toolbar>
          <IconButton disableRipple onClick={() => setOpen(!open)}>
            {!open ? (
              <MenuRoundedIcon fontSize="large" />
            ) : (
              <CloseIcon fontSize="large" />
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
      <Drawer
        sx={{ flexShrink: 0 }}
        variant="persistent"
        transitionDuration={2}
        anchor={"left"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Rooms />
      </Drawer>
    </>
  );
};

export default Navbar;

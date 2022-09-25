import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Join from "./components/Join";
import Video from "./components/Video";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import PrivateRoute from "./utils/PrivateRoute";
import CreateRoomForm from "./components/CreateRoomForm";
import Rooms from "./components/Rooms";
import Room from "./components/Room";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />}>
              <Route path="video-call" element={<Video />} />
              <Route path="chat" element={<Chat />} />
              <Route path="join" element={<Join />} />
              <Route path="create-room" element={<CreateRoomForm />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="room/:roomId" element={<Room />} />
            </Route>
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
      <ToastContainer
        autoClose={3000}
        newestOnTop
        closeOnClick
        draggable
        position="top-center"
      />
    </>
  );
};

export default App;

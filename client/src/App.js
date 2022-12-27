import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import VideoCall from "./Pages/VideoCallPage/VideoCall";
import Auth from "./Pages/AuthPage/Auth";
import ChatPage from "./Pages/ChatPage/ChatPage";
import Room from "./components/Room/Room";
import NoChatSelected from "./components/Room/NoChatSelected";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to="/rooms" />} />
            <Route path="video-call/:roomId" element={<VideoCall />} />
            <Route path="rooms" element={<ChatPage />}>
              <Route path=":roomId" element={<Room />} />
              <Route path="" element={<NoChatSelected />} />
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

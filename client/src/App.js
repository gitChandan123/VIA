import React, { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Backdropp from "./utils/Backdropp";
import Auth from "./Pages/AuthPage/Auth";

const ChatPage = React.lazy(() => import("./Pages/ChatPage/ChatPage"));
const VideoCall = React.lazy(() => import("./Pages/VideoCallPage/VideoCall"));
const Room = React.lazy(() => import("./components/Room/Room"));
const NoChatSelected = React.lazy(() =>
  import("./components/Room/NoChatSelected")
);

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to="/rooms" />} />
            <Route
              path="video-call/:roomId"
              element={
                <Suspense fallback={<Backdropp />}>
                  <VideoCall />
                </Suspense>
              }
            />
            <Route
              path="rooms"
              element={
                <Suspense fallback={<Backdropp />}>
                  <ChatPage />
                </Suspense>
              }
            >
              <Route
                path=":roomId"
                element={
                  <Suspense fallback={<Backdropp />}>
                    <Room />
                  </Suspense>
                }
              />
              <Route
                path=""
                element={
                  <Suspense fallback={<Backdropp />}>
                    <NoChatSelected />
                  </Suspense>
                }
              />
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

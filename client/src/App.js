import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Join from "./components/Join";
import Video from "./components/Video";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/video-call" element={<Video />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/join" element={<Join />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;

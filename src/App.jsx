// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatBot from "./components/ChatBot";
import Chats from "./components/chats/Chats";
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      {/* <Routes>
        <Route path="/" element={<ChatWidget />} />

        <Route path="/bot" element={<ChatBot />} />

        <Route path="/chat" element={<Chats />} />
      </Routes> */}
      <ChatWidget />
    </div>
  );
}

export default App;

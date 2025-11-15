import React, { useState } from "react";
import ChatBot from "./ChatBot";
import {
  Bot,
  MessageCircle,
  MessageCircleCodeIcon,
  MessageCircleQuestion,
  MessageCircleReply,
  X,
} from "lucide-react";
import bot from "../assets/bot.png";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Icon (always visible) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 z-[60]"
      >
        {isOpen ? (
          <X size={22} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            viewBox="0 0 76 75"
            fill="none"
          >
            <circle cx="30" cy="33" r="4" fill="white" />
            <circle cx="46" cy="33" r="4" fill="white" />
            <path
              d="M30 44L30.6269 45.4889C33.3753 52.0163 42.6247 52.0163 45.3731 45.4889L46 44"
              stroke="white"
              stroke-width="6"
              stroke-linecap="round"
            />
            <path
              d="M24.5 62H21C13.8203 62 8 56.1797 8 49V28C8 20.8203 13.8203 15 21 15H55C62.1797 15 68 20.8203 68 28V49C68 56.1797 62.1797 62 55 62H42.5"
              stroke="white"
              stroke-width="6"
            />
            <path
              d="M27 59V68.5342C27 71 29.8096 72.4129 31.789 70.9425L44.5 61.5"
              stroke="white"
              stroke-width="6"
            />
            <ellipse cx="71" cy="39" rx="5" ry="10" fill="white" />
            <ellipse cx="5" cy="39" rx="5" ry="10" fill="white" />
            <rect x="36" width="5" height="12" fill="white" />
            <rect
              x="47"
              width="5"
              height="18"
              rx="2.5"
              transform="rotate(90 47 0)"
              fill="white"
            />
          </svg>
        )}
      </button>

      {/* ChatBot Modal */}
      {isOpen && (
        <div className="fixed bottom-16 right-14 z-50 animate-fadeIn">
          <div className="relative  h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            <ChatBot />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

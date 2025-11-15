import React, { useEffect, useRef } from "react";
import Message from "./Message";
import QuickReplies from "./QuickReplies";
import TypingIndicator from "./TypingIndicator";

const MessageList = ({ messages, isTyping, onQuickReply }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  // Predefined reply sets
  const quickReplySets = {
    service: [
      "Documentation",
      "IT Products & Hardware",
      "Logistics",
      "Reselling",
      "BGV (Background Verification)",
      "Other",
    ],
    bestTime: ["Morning 🌅", "Afternoon 🌤️", "Evening 🌇", "Anytime ☎️"],
  };
  const uniqueMessages = messages.filter(
    (msg, index, self) => index === self.findIndex((m) => m.text === msg.text)
  );
  return (
    <div className="p-1 space-y-3 overflow-hidden">
      {messages.map((msg, index) => (
        <div key={msg.id}>
          <Message message={msg} />

          {/* ✅ Service Quick Replies */}
          {msg.sender === "bot" &&
            msg.text.includes("What service do you need help with?") && (
              <div className="ml-10 mt-1">
                <QuickReplies
                  options={quickReplySets.service}
                  onSelect={onQuickReply}
                />
              </div>
            )}

          {/* ✅ Best Time Quick Replies */}
          {msg.sender === "bot" &&
            msg.text.includes("When’s the best time to reach you?") && (
              <div className="ml-10 mt-1">
                <QuickReplies
                  options={quickReplySets.bestTime}
                  onSelect={onQuickReply}
                />
              </div>
            )}

          {msg.sender === "bot" && msg.quick_replies?.length > 0 && (
            <div className="ml-10 mt-1">
              <QuickReplies
                options={msg.quick_replies}
                onSelect={onQuickReply}
              />
            </div>
          )}
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className=" rounded-2xl  py-2 text-sm animate-pulse">
            <TypingIndicator />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;

import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start space-x-2 items-center">
      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-semibold">M</span>
      </div>

      <div className="">
        {/* <div className="flex space-x-1">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div> */}

        <p className="text-xs font-semibold text-slate-500 ">Mia is typing…</p>
      </div>
    </div>
  );
};

export default TypingIndicator;

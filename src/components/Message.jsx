import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Message = ({ message }) => {
  const isBot = message.sender === "bot";

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex ${
        isBot ? "justify-start" : "justify-end"
      } space-x-2 my-2`}
    >
      {isBot && (
        <div className="w-6 h-6 bg-gradient-to-r mt-1 from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
          {/* <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg> */}
          <span className="text-white text-xs font-semibold">M</span>
        </div>
      )}

      <div
        className={`max-w-[70%] whitespace-pre-wrap ${
          isBot
            ? "bg-white text-slate-800 rounded-t-2xl rounded-r-2xl"
            : "bg-blue-600 text-white rounded-s-2xl rounded-t-2xl"
        }  px-3 py-2 shadow-sm border ${
          isBot ? "border-slate-200" : "border-blue-400"
        }`}
      >
        {/* ✅ Wrap markdown inside a div instead of using className directly */}
        <div className="">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              ul: ({ children }) => (
                <ul className="list-disc ml-5  ">{children}</ul>
              ),
              li: ({ children }) => <li className="">{children}</li>,
              p: ({ children }) => <p className="">{children}</p>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  {children}
                </a>
              ),
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>

        <div
          className={`text-[8px]  ${
            isBot ? "text-slate-500" : "text-blue-200"
          }`}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>

      {/* {!isBot && (
        <div className="w-6 h-6 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      )} */}
    </div>
  );
};

export default Message;

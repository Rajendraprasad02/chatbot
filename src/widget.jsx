// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App"; // your chatbot component

// function init() {
//   const div = document.createElement("div");
//   div.id = "react-chat-widget";
//   document.body.appendChild(div);

//   const root = ReactDOM.createRoot(div);
//   root.render(<App />);
// }

// // Auto start
// init();
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Tailwind + custom theme
import "./index.css";
import "./App.css";
import "./shadcn-theme.css";

// ⭐ Correct phone input CSS (react-phone-input-2)
import "react-phone-input-2/lib/style.css";

(function () {
  const container = document.createElement("div");
  container.id = "mia-chatbot-widget";
  document.body.appendChild(container);

  const shadow = container.attachShadow({ mode: "open" });

  const mountPoint = document.createElement("div");
  shadow.appendChild(mountPoint);

  const styleTag = document.createElement("style");

  Promise.all([
    import("./index.css?inline"),
    import("./shadcn-theme.css?inline"),
    import("react-phone-input-2/lib/style.css?inline"),
  ]).then(([tw, theme, phone]) => {
    styleTag.textContent = `
      ${tw.default}
      ${theme.default}
      ${phone.default}
    `;
    shadow.appendChild(styleTag);

    const root = ReactDOM.createRoot(mountPoint);
    root.render(<App />);
  });
})();

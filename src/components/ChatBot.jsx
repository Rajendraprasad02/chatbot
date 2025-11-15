// import React, { useState, useEffect } from "react";
// import MessageList from "./MessageList";
// import MessageInput from "./MessageInput";
// import ChatHeader from "./ChatHeader";
// import QuickReplies from "./QuickReplies";
// const url = import.meta.env.VITE_URL;

// const ChatBot = () => {
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [sessionId, setSessionId] = useState(
//     localStorage.getItem("chat_session_id")
//   );
//   const [showForm, setShowForm] = useState(true);
//   const [formCompleted, setFormCompleted] = useState(false);

//   const [userInfo, setUserInfo] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     whatsapp: "",
//     service: "",
//     bestTime: "",
//   });

//   const [formErrors, setFormErrors] = useState({});

//   const validateForm = () => {
//     const errors = {};

//     if (!userInfo.firstName.trim()) errors.firstName = "First name is required";
//     if (!userInfo.lastName.trim()) errors.lastName = "Last name is required";
//     if (!userInfo.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
//       errors.email = "Email is invalid";
//     }
//     if (!userInfo.whatsapp.trim())
//       errors.whatsapp = "WhatsApp number is required";
//     if (!userInfo.service.trim()) errors.service = "Please select a service";
//     if (!userInfo.bestTime.trim())
//       errors.bestTime = "Please select a preferred time";

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleInputChange = (field, value) => {
//     setUserInfo((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     // Clear error when user starts typing
//     if (formErrors[field]) {
//       setFormErrors((prev) => ({
//         ...prev,
//         [field]: "",
//       }));
//     }
//   };

//   const startSession = async () => {
//     const res = await fetch(`${url}/knowledge/start-session`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         firstName: userInfo.firstName,
//         lastName: userInfo.lastName,
//         email: userInfo.email,
//         whatsapp: userInfo.whatsapp,
//         service: userInfo.service,
//         bestTime: userInfo.bestTime,
//       }),
//     });

//     const data = await res.json();
//     setSessionId(data.session_id);
//     localStorage.setItem("chat_session_id", data.session_id);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsTyping(true);
//     await startSession();
//     setShowForm(false);

//     // Add welcome message after form submission
//     setTimeout(() => {
//       addMessage(
//         `Welcome to Shrara, ${userInfo.firstName}! 🎉 I'm Mia, your support assistant. How can I help you today?`,
//         "bot"
//       );
//       setFormCompleted(true);
//       setIsTyping(false);
//     }, 1000);
//   };

//   const addMessage = (text, sender, quick_replies = []) => {
//     const newMessage = {
//       id: messages.length + 1,
//       text,
//       sender,
//       timestamp: new Date(),
//       quick_replies,
//     };
//     setMessages((prev) => [...prev, newMessage]);
//   };

//   const handleServiceSelect = (option) => {
//     handleSendMessage(option);
//   };

//   const handleSendMessage = async (message) => {
//     if (message.trim() === "") return;

//     if (!formCompleted) {
//       return; // Don't allow messages until form is completed
//     }

//     addMessage(message, "user");
//     setIsTyping(true);

//     // Call the knowledge API for conversation
//     const data = await callKnowledgeAPI(message);

//     // Add bot message + attach quick replies if available
//     addMessage(data.response, "bot", data.quick_replies || []);
//     setIsTyping(false);
//   };

//   const callKnowledgeAPI = async (prompt) => {
//     try {
//       const res = await fetch(`${url}/knowledge/conversation`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query: prompt,
//           session_id: sessionId || null,
//           ...userInfo,
//         }),
//       });

//       const data = await res.json();
//       if (!sessionId && data.session_id) {
//         localStorage.setItem("chat_session_id", data.session_id);
//         setSessionId(data.session_id);
//       }

//       return {
//         response:
//           data.response ||
//           "I'm sorry, I don't have that information right now.",
//         quick_replies: data.quick_replies || [],
//       };
//     } catch {
//       return {
//         response: "⚠️ I'm having trouble connecting to the server right now.",
//         quick_replies: [],
//       };
//     }
//   };

//   useEffect(() => {
//     if (sessionId) {
//       loadPreviousSession();
//       setShowForm(false);
//       setFormCompleted(true);
//     }
//   }, []);

//   const loadPreviousSession = async () => {
//     const res = await fetch(`${url}/session/${sessionId}`);
//     const data = await res.json();
//     if (data.conversation?.length) {
//       const loaded = data.conversation.flatMap((e, i) => [
//         {
//           id: i * 2 + 1,
//           text: e.user,
//           sender: "user",
//           timestamp: new Date(e.userTimestamp),
//         },
//         {
//           id: i * 2 + 2,
//           text: e.bot,
//           sender: "bot",
//           timestamp: new Date(e.botTimestamp),
//           quick_replies: e.quick_replies || [],
//         },
//       ]);
//       setMessages(loaded);
//     }
//   };

//   const services = [
//     "Website Development",
//     "Mobile App Development",
//     "Digital Marketing",
//     "SEO Services",
//     "UI/UX Design",
//     "E-commerce Solutions",
//     "Other",
//   ];

//   const timeSlots = [
//     "Morning (9 AM - 12 PM)",
//     "Afternoon (12 PM - 5 PM)",
//     "Evening (5 PM - 8 PM)",
//     "Any time works",
//   ];

//   return (
//     <div className="">
//       <div className="flex flex-col h-[600px] w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-300/30 backdrop-blur-sm">
//         {/* Enhanced Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 shadow-lg">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="relative">
//                 <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
//                   <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
//                     <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
//                   </div>
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
//               </div>
//               <div>
//                 <h1 className="text-white font-bold text-lg">Mia</h1>
//                 <p className="text-blue-100 text-xs">
//                   {formCompleted ? "Online" : "Online • Getting to know you"}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => {
//                 localStorage.removeItem("chat_session_id");
//                 window.location.reload();
//               }}
//               className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/30 text-sm font-medium"
//             >
//               New Chat
//             </button>
//           </div>
//         </div>

//         {/* Messages Area */}
//         <div className="flex-1 overflow-hidden flex flex-col">
//           <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-blue-50/30">
//             {formCompleted ? (
//               <div className="h-full flex flex-col">
//                 <div className="flex-1 overflow-y-auto px-4 py-4">
//                   <MessageList
//                     messages={messages}
//                     isTyping={isTyping}
//                     onQuickReply={handleServiceSelect}
//                   />
//                 </div>
//               </div>
//             ) : (
//               /* Welcome Form Section - Optimized for height */
//               <div className="h-full flex flex-col">
//                 {/* Welcome Header - Compact */}
//                 <div className="text-center py-4 px-4 border-b border-slate-200/50 bg-white/50">
//                   <h2 className="text-lg font-bold text-slate-800 mb-1">
//                     Welcome to Shrara!
//                   </h2>
//                   <p className="text-slate-600 text-xs">
//                     Share your details to get personalized assistance
//                   </p>
//                 </div>

//                 {/* User Information Form - Optimized for available space */}
//                 <div className="flex-1 overflow-y-auto">
//                   <div className="p-4">
//                     <form onSubmit={handleFormSubmit} className="space-y-3">
//                       {/* Name Row - Two columns for first/last name */}
//                       <div className="grid grid-cols-2 gap-3">
//                         {/* First Name */}
//                         <div>
//                           <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                             First Name *
//                           </label>
//                           <input
//                             type="text"
//                             value={userInfo.firstName}
//                             onChange={(e) =>
//                               handleInputChange("firstName", e.target.value)
//                             }
//                             className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
//                               formErrors.firstName
//                                 ? "border-red-300 bg-red-50/50"
//                                 : "border-slate-300 focus:border-blue-500"
//                             }`}
//                             placeholder="First name"
//                           />
//                           {formErrors.firstName && (
//                             <p className="text-xs text-red-500 mt-1 flex items-center">
//                               <span className="mr-1">⚠️</span>
//                               {formErrors.firstName}
//                             </p>
//                           )}
//                         </div>

//                         {/* Last Name */}
//                         <div>
//                           <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                             Last Name *
//                           </label>
//                           <input
//                             type="text"
//                             value={userInfo.lastName}
//                             onChange={(e) =>
//                               handleInputChange("lastName", e.target.value)
//                             }
//                             className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
//                               formErrors.lastName
//                                 ? "border-red-300 bg-red-50/50"
//                                 : "border-slate-300 focus:border-blue-500"
//                             }`}
//                             placeholder="Last name"
//                           />
//                           {formErrors.lastName && (
//                             <p className="text-xs text-red-500 mt-1 flex items-center">
//                               <span className="mr-1">⚠️</span>
//                               {formErrors.lastName}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       {/* Email */}
//                       <div>
//                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                           Email Address *
//                         </label>
//                         <input
//                           type="email"
//                           value={userInfo.email}
//                           onChange={(e) =>
//                             handleInputChange("email", e.target.value)
//                           }
//                           className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
//                             formErrors.email
//                               ? "border-red-300 bg-red-50/50"
//                               : "border-slate-300 focus:border-blue-500"
//                           }`}
//                           placeholder="your.email@example.com"
//                         />
//                         {formErrors.email && (
//                           <p className="text-xs text-red-500 mt-1 flex items-center">
//                             <span className="mr-1">⚠️</span>
//                             {formErrors.email}
//                           </p>
//                         )}
//                       </div>

//                       {/* WhatsApp */}
//                       <div>
//                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                           WhatsApp Number *
//                         </label>
//                         <input
//                           type="tel"
//                           value={userInfo.whatsapp}
//                           onChange={(e) =>
//                             handleInputChange("whatsapp", e.target.value)
//                           }
//                           className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
//                             formErrors.whatsapp
//                               ? "border-red-300 bg-red-50/50"
//                               : "border-slate-300 focus:border-blue-500"
//                           }`}
//                           placeholder="+1 234 567 8900"
//                         />
//                         {formErrors.whatsapp && (
//                           <p className="text-xs text-red-500 mt-1 flex items-center">
//                             <span className="mr-1">⚠️</span>
//                             {formErrors.whatsapp}
//                           </p>
//                         )}
//                       </div>

//                       {/* Service */}
//                       <div>
//                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                           Service Interested In *
//                         </label>
//                         <select
//                           value={userInfo.service}
//                           onChange={(e) =>
//                             handleInputChange("service", e.target.value)
//                           }
//                           className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
//                             formErrors.service
//                               ? "border-red-300 bg-red-50/50"
//                               : "border-slate-300 focus:border-blue-500"
//                           }`}
//                         >
//                           <option value="">Select a service</option>
//                           {services.map((service) => (
//                             <option key={service} value={service}>
//                               {service}
//                             </option>
//                           ))}
//                         </select>
//                         {formErrors.service && (
//                           <p className="text-xs text-red-500 mt-1 flex items-center">
//                             <span className="mr-1">⚠️</span>
//                             {formErrors.service}
//                           </p>
//                         )}
//                       </div>

//                       {/* Best Time */}
//                       <div>
//                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                           Preferred Contact Time *
//                         </label>
//                         <select
//                           value={userInfo.bestTime}
//                           onChange={(e) =>
//                             handleInputChange("bestTime", e.target.value)
//                           }
//                           className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
//                             formErrors.bestTime
//                               ? "border-red-300 bg-red-50/50"
//                               : "border-slate-300 focus:border-blue-500"
//                           }`}
//                         >
//                           <option value="">Select preferred time</option>
//                           {timeSlots.map((time) => (
//                             <option key={time} value={time}>
//                               {time}
//                             </option>
//                           ))}
//                         </select>
//                         {formErrors.bestTime && (
//                           <p className="text-xs text-red-500 mt-1 flex items-center">
//                             <span className="mr-1">⚠️</span>
//                             {formErrors.bestTime}
//                           </p>
//                         )}
//                       </div>

//                       {/* Submit Button */}
//                       <div className="pt-2">
//                         <button
//                           type="submit"
//                           className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
//                         >
//                           Start Chatting with Mia
//                         </button>
//                       </div>

//                       <p className="text-xs text-slate-500 text-center mt-2">
//                         Your information is secure and will only be used to
//                         provide better assistance
//                       </p>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Input Area - Only show after form completion */}
//           {formCompleted && (
//             <div className="border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
//               <MessageInput onSendMessage={handleSendMessage} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;
import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import QuickReplies from "./QuickReplies";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// shadcn/ui components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ChatPhoneInput from "./ui/ChatPhoneInput";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Maximize2, Minimize2 } from "lucide-react";

const url = "http://57.159.8.173:9900";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(
    localStorage.getItem("chat_session_id")
  );
  const [showForm, setShowForm] = useState(true);
  const [formCompleted, setFormCompleted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: "",
    service: "",
    bestTime: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!userInfo.firstName.trim()) errors.firstName = "First name is required";
    if (!userInfo.lastName.trim()) errors.lastName = "Last name is required";
    if (!userInfo.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      errors.email = "Email is invalid";
    }
    if (!userInfo.whatsapp) {
      errors.whatsapp = "WhatsApp number is required";
    } else {
      const parsed = parsePhoneNumberFromString(userInfo.whatsapp);
      if (!parsed?.isValid()) {
        errors.whatsapp = "Invalid phone number";
      }
    }
    if (!userInfo.service.trim()) errors.service = "Please select a service";
    if (!userInfo.bestTime.trim())
      errors.bestTime = "Please select a preferred time";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const startSession = async () => {
    const res = await fetch(`${url}/knowledge/start-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        whatsapp: userInfo.whatsapp,
        service: userInfo.service,
        bestTime: userInfo.bestTime,
      }),
    });

    const data = await res.json();
    setSessionId(data.session_id);
    localStorage.setItem("chat_session_id", data.session_id);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsTyping(true);
    await startSession();
    setShowForm(false);

    // Add welcome message after form submission
    setTimeout(() => {
      addMessage(
        `Welcome to Shrara, ${userInfo.firstName}! 🎉 I'm Mia, your support assistant. How can I help you today?`,
        "bot"
      );
      setFormCompleted(true);
      setIsTyping(false);
    }, 1000);
  };

  const addMessage = (text, sender, quick_replies = []) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender,
      timestamp: new Date(),
      quick_replies,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleServiceSelect = (option) => {
    handleSendMessage(option);
  };

  const handleSendMessage = async (message) => {
    if (message.trim() === "") return;

    if (!formCompleted) {
      return; // Don't allow messages until form is completed
    }

    addMessage(message, "user");
    setIsTyping(true);

    // Call the knowledge API for conversation
    const data = await callKnowledgeAPI(message);

    // Add bot message + attach quick replies if available
    addMessage(data.response, "bot", data.quick_replies || []);
    setIsTyping(false);
  };

  const callKnowledgeAPI = async (prompt) => {
    try {
      const res = await fetch(`${url}/knowledge/conversation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: prompt,
          session_id: sessionId || null,
          ...userInfo,
        }),
      });

      const data = await res.json();
      if (!sessionId && data.session_id) {
        localStorage.setItem("chat_session_id", data.session_id);
        setSessionId(data.session_id);
      }

      return {
        response:
          data.response ||
          "I'm sorry, I don't have that information right now.",
        quick_replies: data.quick_replies || [],
      };
    } catch {
      return {
        response: "⚠️ I'm having trouble connecting to the server right now.",
        quick_replies: [],
      };
    }
  };

  useEffect(() => {
    if (sessionId) {
      loadPreviousSession();
      setShowForm(false);
      setFormCompleted(true);
    }
  }, []);

  const loadPreviousSession = async () => {
    const res = await fetch(`${url}/session/${sessionId}`);
    const data = await res.json();
    if (data.conversation?.length) {
      const loaded = data.conversation.flatMap((e, i) => [
        {
          id: i * 2 + 1,
          text: e.user,
          sender: "user",
          timestamp: new Date(e.userTimestamp),
        },
        {
          id: i * 2 + 2,
          text: e.bot,
          sender: "bot",
          timestamp: new Date(e.botTimestamp),
          quick_replies: e.quick_replies || [],
        },
      ]);
      setMessages(loaded);
    }
  };

  const services = [
    "Website Development",
    "Mobile App Development",
    "Digital Marketing",
    "SEO Services",
    "UI/UX Design",
    "E-commerce Solutions",
    "Other",
  ];

  const timeSlots = [
    "Morning (9 AM - 12 PM)",
    "Afternoon (12 PM - 5 PM)",
    "Evening (5 PM - 8 PM)",
    "Any time works",
  ];

  return (
    <div className="">
      <div
        className={`flex flex-col h-[600px] bg-white rounded-3xl shadow-2xl 
    overflow-hidden border border-slate-300/30 backdrop-blur-sm transition-all duration-300 
    ${isExpanded ? "w-full max-w-2xl" : "w-full max-w-md"}`}
      >
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Mia</h1>
                <p className="text-blue-100 text-xs">
                  {formCompleted ? "Online" : "Online • Getting to know you"}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white"
              >
                {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("chat_session_id");
                  window.location.reload();
                }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/30 text-sm font-medium"
              >
                New Chat
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-blue-50/30">
            {formCompleted ? (
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <MessageList
                    messages={messages}
                    isTyping={isTyping}
                    onQuickReply={handleServiceSelect}
                  />
                </div>
              </div>
            ) : (
              /* Welcome Form Section - Optimized for height */
              <div className="h-full flex flex-col">
                {/* Welcome Header - Compact */}
                <div className="text-center py-4 px-4 border-b border-slate-200/50 bg-white/50">
                  <h2 className="text-lg font-bold text-slate-800 mb-1">
                    Welcome to Shrara!
                  </h2>
                  <p className="text-slate-600 text-xs">
                    Share your details to get personalized assistance
                  </p>
                </div>

                {/* User Information Form - Optimized for available space */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {/* Name Row - Two columns for first/last name */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* First Name */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="firstName"
                            className="text-xs font-semibold"
                          >
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            value={userInfo.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            className={`${
                              formErrors.firstName
                                ? "border-red-300 bg-red-50/50 focus-visible:ring-red-300"
                                : ""
                            }`}
                            placeholder="First name"
                          />
                          {formErrors.firstName && (
                            <p className="text-xs text-red-500 flex items-center">
                              <span className="mr-1">⚠️</span>
                              {formErrors.firstName}
                            </p>
                          )}
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="lastName"
                            className="text-xs font-semibold"
                          >
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            value={userInfo.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            className={`${
                              formErrors.lastName
                                ? "border-red-300 bg-red-50/50 focus-visible:ring-red-300"
                                : ""
                            }`}
                            placeholder="Last name"
                          />
                          {formErrors.lastName && (
                            <p className="text-xs text-red-500 flex items-center">
                              <span className="mr-1">⚠️</span>
                              {formErrors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-xs font-semibold"
                        >
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={userInfo.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={`${
                            formErrors.email
                              ? "border-red-300 bg-red-50/50 focus-visible:ring-red-300"
                              : ""
                          }`}
                          placeholder="your.email@example.com"
                        />
                        {formErrors.email && (
                          <p className="text-xs text-red-500 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      {/* WhatsApp */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="whatsapp"
                          className="text-xs font-semibold"
                        >
                          WhatsApp Number *
                        </Label>
                        <div
                          className={`PhoneInput ${
                            formErrors.whatsapp ? "error" : ""
                          }`}
                        >
                          <ChatPhoneInput
                            value={userInfo.whatsapp}
                            onChange={(value) =>
                              handleInputChange("whatsapp", value)
                            }
                            error={formErrors.whatsapp}
                          />
                        </div>
                        {formErrors.whatsapp && (
                          <p className="text-xs text-red-500 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {formErrors.whatsapp}
                          </p>
                        )}
                      </div>

                      {/* Service */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="service"
                          className="text-xs font-semibold"
                        >
                          Service Interested In *
                        </Label>
                        <Select
                          value={userInfo.service}
                          onValueChange={(value) =>
                            handleInputChange("service", value)
                          }
                        >
                          <SelectTrigger
                            className={`w-full ${
                              formErrors.service
                                ? "border-red-300 bg-red-50/50 focus:ring-red-300"
                                : ""
                            }`}
                          >
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.service && (
                          <p className="text-xs text-red-500 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {formErrors.service}
                          </p>
                        )}
                      </div>

                      {/* Best Time */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="bestTime"
                          className="text-xs font-semibold"
                        >
                          Preferred Contact Time *
                        </Label>
                        <Select
                          value={userInfo.bestTime}
                          onValueChange={(value) =>
                            handleInputChange("bestTime", value)
                          }
                        >
                          <SelectTrigger
                            className={`w-full ${
                              formErrors.bestTime
                                ? "border-red-300 bg-red-50/50 focus:ring-red-300"
                                : ""
                            }`}
                          >
                            <SelectValue placeholder="Select preferred time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.bestTime && (
                          <p className="text-xs text-red-500 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {formErrors.bestTime}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] h-auto"
                        >
                          Start Chatting with Mia
                        </Button>
                      </div>

                      <p className="text-xs text-slate-500 text-center mt-2">
                        Your information is secure and will only be used to
                        provide better assistance
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area - Only show after form completion */}
          {formCompleted && (
            <div className="border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
              <MessageInput onSendMessage={handleSendMessage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

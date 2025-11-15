import React, { useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const ChatPhoneInput = ({ value, onChange, error }) => {
  const inputRef = useRef(null);

  const handleChange = (val, country) => {
    if (!val) {
      onChange("");
      return;
    }

    const digits = val.replace(/\D/g, ""); // 919876543210
    const dial = country?.dialCode ?? "";

    // India limit
    if (dial === "91") {
      if (digits.length > 12) return; // 91 + 10 digits
    }

    onChange("+" + digits);
  };

  return (
    <div className="w-full">
      <PhoneInput
        country={"in"}
        value={value?.replace("+", "")} // component wants digits only
        onChange={handleChange}
        placeholder="Enter WhatsApp number"
        // ⭐ DO NOT override container/button classes
        containerClass="w-full"
        // ⭐ Only style input — keeps UI intact
        inputClass={`
          !w-full 
          !h-10 
          !text-sm 
          !rounded-md 
          !border 
          ${error ? "!border-red-400 !bg-red-50" : "!border-slate-300"}
        `}
        // Keep button default (VERY IMPORTANT)
        buttonClass=""
      />

      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
};

export default ChatPhoneInput;

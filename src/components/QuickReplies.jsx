import React from "react";

const QuickReplies = ({ options, onSelect }) => (
  <div className="flex flex-wrap gap-2 mt-3 animate-fadeIn">
    {options.map((opt, i) => (
      <button
        key={i}
        onClick={() => onSelect(opt)}
        className="px-3 py-2 text-xs bg-slate-200 text-slate-700 border border-slate-300/60 rounded-xl hover:bg-slate-50 hover:border-slate-400 hover:shadow-md transition-all duration-200 font-medium backdrop-blur-sm"
      >
        {opt}
      </button>
    ))}
  </div>
);

export default QuickReplies;

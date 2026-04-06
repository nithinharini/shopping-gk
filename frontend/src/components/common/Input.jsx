import React from "react";

export default function Input({ label, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      ) : null}
      <input
        className={`w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-slate-500 ${className}`}
        {...props}
      />
    </div>
  );
}
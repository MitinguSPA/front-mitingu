import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`mb-4 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        className={`
          px-3 py-2 bg-white border rounded-md
          border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400
          focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? "border-red-500" : ""}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

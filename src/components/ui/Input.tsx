import React, { InputHTMLAttributes } from "react";

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => (
  <input
    className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${className}`}
    {...props}
  />
);

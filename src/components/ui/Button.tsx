// components/ui/Button.tsx

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "subtle";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "default",
  ...props
}) => {
  const variantClasses = {
    default: "bg-blue-500 hover:bg-blue-700 text-white",
    destructive: "bg-red-500 hover:bg-red-700 text-white",
    outline:
      "bg-transparent hover:bg-gray-100 text-blue-700 border border-blue-500",
    subtle: "bg-gray-100 hover:bg-gray-200 text-gray-800",
  };

  return (
    <button
      className={`font-bold py-2 px-4 rounded ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

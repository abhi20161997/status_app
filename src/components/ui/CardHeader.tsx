import React, { ReactNode } from "react";

export const CardHeader: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="px-4 py-5 border-b border-gray-200 sm:px-6">{children}</div>
);

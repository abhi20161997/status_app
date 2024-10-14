import React, { ReactNode } from "react";

export const Card: React.FC<{ className?: string; children: ReactNode }> = ({
  className,
  children,
}) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
);

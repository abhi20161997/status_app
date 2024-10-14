import React, { ReactNode } from "react";

export const CardContent: React.FC<{ children: ReactNode }> = ({
  children,
}) => <div className="px-4 py-5 sm:p-6">{children}</div>;

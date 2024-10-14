import React from "react";

export const TableHeader: React.FC<
  React.ThHTMLAttributes<HTMLTableHeaderCellElement>
> = ({ className, ...props }) => (
  <th
    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    {...props}
  />
);

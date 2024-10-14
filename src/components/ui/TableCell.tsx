import React from "react";

export const TableCell: React.FC<
  React.TdHTMLAttributes<HTMLTableDataCellElement>
> = ({ className, ...props }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`} {...props} />
);

import React from "react";

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  ...props
}) => <tr className={`${className}`} {...props} />;

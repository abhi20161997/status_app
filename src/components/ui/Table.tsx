import React, { TableHTMLAttributes } from "react";

export const Table: React.FC<TableHTMLAttributes<HTMLTableElement>> = ({
  className,
  ...props
}) => (
  <table
    className={`min-w-full divide-y divide-gray-200 ${className}`}
    {...props}
  />
);

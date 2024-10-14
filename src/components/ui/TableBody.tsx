import React from "react";

export const TableBody: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = (props) => (
  <tbody className="bg-white divide-y divide-gray-200" {...props} />
);

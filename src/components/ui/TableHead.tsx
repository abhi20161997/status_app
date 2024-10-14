import React from "react";

export const TableHead: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = (props) => <thead className="bg-gray-50" {...props} />;

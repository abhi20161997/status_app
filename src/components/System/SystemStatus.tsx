// src/components/StatusOverview.tsx

import React from "react";
import { SystemStatus } from "../../types/index";

interface StatusOverviewProps {
  status: SystemStatus;
}

const StatusOverview: React.FC<StatusOverviewProps> = ({ status }) => {
  return (
    <div
      className={`p-4 rounded-md ${
        status.overall_status === "operational"
          ? "bg-green-100 text-green-800"
          : status.overall_status === "degraded"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      <p className="text-lg font-semibold">
        {status.overall_status === "operational"
          ? "All systems operational"
          : status.overall_status === "degraded"
          ? "Some systems are experiencing issues"
          : "Major system outage"}
      </p>
    </div>
  );
};

export default StatusOverview;

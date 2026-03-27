import React from "react";
import { FaArrowUp } from "react-icons/fa";

const StatCard = ({
  title,
  value,
  icon,
  colorClass = "sc-blue",
  trend = "Live Data",
}) => {
  return (
    <div className={`stat-card ${colorClass}`}>
      <div className="stat-top">
        <p className="stat-label">{title}</p>
        <div className="stat-icon">{icon}</div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-footer">
        <span className="stat-badge up">
          <FaArrowUp /> {trend}
        </span>
      </div>
    </div>
  );
};

export default StatCard;

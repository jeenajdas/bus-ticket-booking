// src/components/admin/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="stat-icon" style={{ color }}>
        {icon}
      </div>
      <div className="stat-info">
        <h5>{title}</h5>
        <h3>{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;

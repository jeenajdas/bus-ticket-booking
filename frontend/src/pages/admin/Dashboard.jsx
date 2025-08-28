// src/pages/admin/Dashboard.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusCount } from "../../features/buses/busSlice";
import { fetchBookings } from "../../features/bookings/bookingSlice";
import { fetchTotalCollection } from "../../features/reports/reportSlice";
import StatCard from "../../components/admin/StatCard";
import "../../styles/admin/dashboard.css";

import { FaBus, FaTicketAlt, FaRupeeSign } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { busCount } = useSelector((state) => state.buses);

  const { bookings } = useSelector((state) => state.bookings);
  const { totalCollection } = useSelector((state) => state.reports);

  const totalRevenue = totalCollection || 0;

  useEffect(() => {
  dispatch(fetchBusCount());
  dispatch(fetchBookings());
  dispatch(fetchTotalCollection());
}, [dispatch]);

  // Fake chart data (replace with API later)
  const data = [
    { name: "Mon", revenue: 5000 },
    { name: "Tue", revenue: 7500 },
    { name: "Wed", revenue: 3000 },
    { name: "Thu", revenue: 9000 },
    { name: "Fri", revenue: 12000 },
    { name: "Sat", revenue: 6000 },
    { name: "Sun", revenue: 10000 },
  ];

  return (
    <div className="dashboard">
      <h2>📊 Admin Dashboard</h2>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Buses"
          value={busCount || 0}
          icon={<FaBus />}
          color="#3b82f6"
        />
        <StatCard
          title="Total Bookings"
          value={bookings.length}
          icon={<FaTicketAlt />}
          color="#10b981"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue}`}
          icon={<FaRupeeSign />}
          color="#f59e0b"
        />
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-grid">
        {/* Revenue Chart */}
        <div className="card chart-card">
          <h4>Revenue Overview</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Bookings */}
        <div className="card recent-card">
          <h4>Recent Bookings</h4>
          <ul>
            {bookings.slice(0, 5).map((b, idx) => (
              <li key={idx}>
                <span>🚌 {b.busName}</span>
                <span>{b.date}</span>
                <span>₹{b.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

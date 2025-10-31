// src/pages/admin/Bookings.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../features/bookings/bookingSlice";
import {
  FaUsers,
  FaBus,
  FaRupeeSign,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/admin/bookings.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, status } = useSelector((state) => state.bookings);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (status === "loading") return <p className="text-center mt-5">Loading bookings...</p>;
  if (status === "failed") return <p className="text-center mt-5 text-danger">Failed to load bookings</p>;

  // Filter bookings
  const filteredBookings = bookings.filter(
    (b) =>
      b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.bus?.busName?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  // Summary Stats
  const totalRevenue = bookings.reduce((acc, b) => acc + (b.totalFare || 0), 0);
  const totalBookings = bookings.length;
  const uniqueUsers = new Set(bookings.map((b) => b.user?.name)).size;
  const activeBuses = new Set(bookings.map((b) => b.bus?.busName)).size;

  // Recent bookings (last 5)
  const recentBookings = [...bookings].slice(-5).reverse();

  // Chart Data
  const revenueData = {
    labels: bookings.map((b) => b.date).slice(-7),
    datasets: [
      {
        label: "Revenue (₹)",
        data: bookings.map((b) => b.totalFare).slice(-7),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
    ],
  };

  const busPieData = {
    labels: [...new Set(bookings.map((b) => b.bus?.busName || "Unknown"))],
    datasets: [
      {
        data: [...new Set(bookings.map((b) => b.bus?.busName))].map(
          (bus) => bookings.filter((b) => b.bus?.busName === bus).length
        ),
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#FFC107"],
      },
    ],
  };

  return (
    <div className="container-fluid py-4">
      <h3 className="mb-4 fw-bold">📊 Bookings Dashboard</h3>

      {/* Stats Section */}
      <div className="row g-4 mb-4">
        <div className="col-md-3 col-sm-6">
          <div className="card shadow stat-card text-white bg-primary gradient-card">
            <div className="card-body d-flex align-items-center">
              <FaRupeeSign size={30} className="me-3" />
              <div>
                <h6>Total Revenue</h6>
                <h4 className="fw-bold">₹{totalRevenue}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card shadow stat-card text-white bg-success gradient-card">
            <div className="card-body d-flex align-items-center">
              <FaCalendarAlt size={30} className="me-3" />
              <div>
                <h6>Total Bookings</h6>
                <h4 className="fw-bold">{totalBookings}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card shadow stat-card text-white bg-info gradient-card">
            <div className="card-body d-flex align-items-center">
              <FaUsers size={30} className="me-3" />
              <div>
                <h6>Users</h6>
                <h4 className="fw-bold">{uniqueUsers}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card shadow stat-card text-white bg-warning gradient-card">
            <div className="card-body d-flex align-items-center">
              <FaBus size={30} className="me-3" />
              <div>
                <h6>Active Buses</h6>
                <h4 className="fw-bold">{activeBuses}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card shadow-sm p-3 mb-4">
        <h5 className="fw-bold mb-3">🆕 Recent Bookings</h5>
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>User</th>
              <th>Bus</th>
              <th>Date</th>
              <th>Fare</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((b) => (
              <tr key={b.id}>
                <td>{b.user?.name || "N/A"}</td>
                <td>{b.bus?.busName || "N/A"}</td>
                <td>{b.date}</td>
                <td className="fw-bold text-success">₹{b.totalFare}</td>
                <td>
                  <span
                    className={`badge ${
                      new Date(b.date) >= new Date() ? "bg-info" : "bg-secondary"
                    }`}
                  >
                    {new Date(b.date) >= new Date() ? "Upcoming" : "Completed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-sm btn-outline-primary mt-2">
          View All Bookings →
        </button>
      </div>

      {/* Charts */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h6 className="fw-bold mb-3">
              <FaChartLine className="me-2" /> Revenue Trend (Last 7)
            </h6>
            <Bar data={revenueData} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h6 className="fw-bold mb-3">🚌 Bookings by Bus</h6>
            <Pie data={busPieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
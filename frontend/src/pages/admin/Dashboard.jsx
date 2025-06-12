import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Admin Navbar Visibility Fix */}
      <div className="admin-navbar-fix"></div>

      <h2 className="text-center mt-4 welcome-text">
        Welcome, <span className="text-primary fw-bold">Admin 👋</span>
      </h2>

      {/* Stat Boxes */}
      <div className="stats-container d-flex justify-content-around flex-wrap mt-4">
        <div className="stat-box bg-primary text-white shadow">
          <h5>Total Buses</h5>
          <h2>45</h2>
        </div>
        <div className="stat-box bg-success text-white shadow">
          <h5>Total Bookings</h5>
          <h2>150</h2>
        </div>
        <div className="stat-box bg-warning text-white shadow">
          <h5>Total Users</h5>
          <h2>75</h2>
        </div>
        <div className="stat-box bg-danger text-white shadow">
          <h5>Revenue</h5>
          <h2>₹1,25,000</h2>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="recent-bookings mt-5">
        <h4 className="mb-3">
          <span role="img" aria-label="pin">📌</span> Recent Bookings
        </h4>
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Bus</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#BK101</td>
              <td>John Doe</td>
              <td>Bus 22</td>
              <td>2024-05-10</td>
              <td>₹500</td>
            </tr>
            <tr>
              <td>#BK102</td>
              <td>Jane Smith</td>
              <td>Bus 18</td>
              <td>2024-05-11</td>
              <td>₹450</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Extra Stat Cards */}
      <div className="row mt-5">
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-info shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Today’s Bookings</h5>
              <p className="fs-4">18</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-secondary shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Pending Payments</h5>
              <p className="fs-4">₹3,250</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-success shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Active Routes</h5>
              <p className="fs-4">12</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-dark shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Cancelled Tickets</h5>
              <p className="fs-4">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
